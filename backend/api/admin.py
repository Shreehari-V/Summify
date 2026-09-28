# backend/api/admin.py

from fastapi import APIRouter, Depends, HTTPException, Query, status
from bson import ObjectId
from datetime import datetime
from typing import List, Optional

from ..config import settings
from ..dependencies import require_admin
from ..utils.password import hash_password
from ..schemas.user import (
    AdminUserCreate,
    AdminUserUpdate,
    AdminUserRead,
    AdminStatsResponse,
    AdminStatsUsers,
    AdminStatsLectures,
)

router = APIRouter(dependencies=[Depends(require_admin)])


@router.get("/stats", response_model=AdminStatsResponse)
async def get_admin_dashboard_stats(admin_user: dict = Depends(require_admin)):
    """Retrieve high-level system analytics for the administrator dashboard."""
    if settings.db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is unavailable",
        )

    users_col = settings.db.users
    lectures_col = settings.db.lectures

    total_users = await users_col.count_documents({})
    active_users = await users_col.count_documents({"is_active": {"$ne": False}})
    deactivated_users = await users_col.count_documents({"is_active": False})
    students_count = await users_col.count_documents({"role": "student"})
    educators_count = await users_col.count_documents({"role": "educator"})
    admins_count = await users_col.count_documents({"role": "admin"})
    total_lectures = await lectures_col.count_documents({})

    trans_count = await settings.db.transcripts.count_documents({}) if settings.db.transcripts is not None else 0
    sum_count = await settings.db.summaries.count_documents({}) if settings.db.summaries is not None else 0
    fc_count = await settings.db.flashcards.count_documents({}) if settings.db.flashcards is not None else 0

    return AdminStatsResponse(
        total_users=total_users,
        active_users=active_users,
        deactivated_users=deactivated_users,
        students_count=students_count,
        educators_count=educators_count,
        admins_count=admins_count,
        total_lectures=total_lectures,
        users=AdminStatsUsers(
            total=total_users,
            active=active_users,
            deactivated=deactivated_users,
            students=students_count,
            educators=educators_count,
            admins=admins_count,
        ),
        lectures=AdminStatsLectures(
            total=total_lectures,
            with_transcripts=trans_count,
            with_summaries=sum_count,
            with_flashcards=fc_count,
        ),
    )


@router.get("/users", response_model=List[AdminUserRead])
async def list_all_users(
    search: Optional[str] = None,
    role: Optional[str] = None,
    is_active: Optional[bool] = None,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=100, ge=1, le=200),
    admin_user: dict = Depends(require_admin),
):
    """List registered users with optional search and filtering. Never returns password hashes."""
    if settings.db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is unavailable",
        )

    query = {}
    if search and search.strip():
        term = search.strip()
        query["$or"] = [
            {"name": {"$regex": term, "$options": "i"}},
            {"email": {"$regex": term, "$options": "i"}},
        ]

    if role and role.strip() and role.strip() != "all":
        query["role"] = role.strip()

    if is_active is not None:
        query["is_active"] = is_active

    cursor = settings.db.users.find(query).sort("created_at", -1).skip(skip).limit(limit)
    users = await cursor.to_list(length=limit)

    results: List[AdminUserRead] = []
    for u in users:
        uid = str(u["_id"])
        # Get lecture count for this user
        lec_count = await settings.db.lectures.count_documents({"user_id": uid})
        results.append(
            AdminUserRead(
                id=uid,
                name=u.get("name", "User"),
                email=u["email"],
                role=u.get("role", "student"),
                is_active=u.get("is_active", True),
                lecture_count=lec_count,
                created_at=u.get("created_at"),
            )
        )

    return results


@router.post("/users", response_model=AdminUserRead, status_code=status.HTTP_201_CREATED)
async def create_user_by_admin(
    payload: AdminUserCreate,
    admin_user: dict = Depends(require_admin),
):
    """Admin creates a new user account (student, educator, or admin)."""
    if settings.db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is unavailable",
        )

    users_col = settings.db.users
    existing = await users_col.find_one({"email": payload.email.lower().strip()})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email address already exists.",
        )

    hashed = hash_password(payload.password)
    user_doc = {
        "name": payload.name.strip(),
        "email": payload.email.lower().strip(),
        "hashed_password": hashed,
        "role": payload.role,
        "is_active": payload.is_active,
        "created_at": datetime.utcnow(),
    }
    result = await users_col.insert_one(user_doc)
    uid = str(result.inserted_id)

    return AdminUserRead(
        id=uid,
        name=user_doc["name"],
        email=user_doc["email"],
        role=user_doc["role"],
        is_active=user_doc["is_active"],
        lecture_count=0,
        created_at=user_doc["created_at"],
    )


@router.patch("/users/{user_id}", response_model=AdminUserRead)
async def update_user_by_admin(
    user_id: str,
    payload: AdminUserUpdate,
    admin_user: dict = Depends(require_admin),
):
    """Update user profile, role, or active status."""
    if settings.db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is unavailable",
        )

    try:
        oid = ObjectId(user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format",
        )

    target_user = await settings.db.users.find_one({"_id": oid})
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    # Protect admin from demoting or deactivating their own self
    if str(oid) == admin_user["user_id"]:
        if payload.is_active is False:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You cannot deactivate your own administrator account.",
            )
        if payload.role and payload.role != "admin":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You cannot remove your own administrator role.",
            )

    updates = {}
    if payload.name is not None and payload.name.strip():
        updates["name"] = payload.name.strip()
    if payload.role is not None:
        updates["role"] = payload.role
    if payload.is_active is not None:
        updates["is_active"] = payload.is_active

    if updates:
        updates["updated_at"] = datetime.utcnow()
        await settings.db.users.update_one({"_id": oid}, {"$set": updates})

    updated_doc = await settings.db.users.find_one({"_id": oid})
    lec_count = await settings.db.lectures.count_documents({"user_id": user_id})

    return AdminUserRead(
        id=str(updated_doc["_id"]),
        name=updated_doc.get("name", "User"),
        email=updated_doc["email"],
        role=updated_doc.get("role", "student"),
        is_active=updated_doc.get("is_active", True),
        lecture_count=lec_count,
        created_at=updated_doc.get("created_at"),
    )


@router.post("/users/{user_id}/toggle-status", response_model=AdminUserRead)
async def toggle_user_active_status(
    user_id: str,
    admin_user: dict = Depends(require_admin),
):
    """Toggle a user's active/deactivated status. Deactivated users cannot log in."""
    if settings.db is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database service is unavailable",
        )

    try:
        oid = ObjectId(user_id)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format",
        )

    if str(oid) == admin_user["user_id"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot toggle the active status of your own account.",
        )

    target_user = await settings.db.users.find_one({"_id": oid})
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    current_status = target_user.get("is_active", True)
    new_status = not current_status

    await settings.db.users.update_one(
        {"_id": oid},
        {"$set": {"is_active": new_status, "updated_at": datetime.utcnow()}},
    )

    updated_doc = await settings.db.users.find_one({"_id": oid})
    lec_count = await settings.db.lectures.count_documents({"user_id": user_id})

    return AdminUserRead(
        id=str(updated_doc["_id"]),
        name=updated_doc.get("name", "User"),
        email=updated_doc["email"],
        role=updated_doc.get("role", "student"),
        is_active=updated_doc.get("is_active", True),
        lecture_count=lec_count,
        created_at=updated_doc.get("created_at"),
    )
