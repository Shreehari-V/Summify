# backend/api/auth.py

from fastapi import APIRouter, HTTPException, status, Depends
from bson import ObjectId
from datetime import datetime, timedelta
from pymongo.errors import DuplicateKeyError
from ..config import settings
from ..dependencies import get_current_user
from ..utils.password import hash_password, verify_password
from ..utils.jwt import create_access_token
from ..schemas.user import UserCreate, UserRead, Token
from ..schemas.auth import LoginIn

router = APIRouter()

@router.post("/register", response_model=Token, status_code=status.HTTP_201_CREATED)
async def register_user(payload: UserCreate):
    """Create a new user and return a JWT token.
    Email must be unique. Password is stored as bcrypt hash.
    """
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")
    user_collection = settings.db.users
    existing = await user_collection.find_one({"email": payload.email.lower()})
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    hashed = hash_password(payload.password)
    user_doc = {
        "name": payload.name,
        "email": payload.email.lower(),
        "hashed_password": hashed,
        "role": payload.role,
        "created_at": datetime.utcnow(),
    }
    result = await user_collection.insert_one(user_doc)
    user_id = str(result.inserted_id)
    access_token = create_access_token({"sub": user_id})
    return Token(access_token=access_token)

@router.post("/login", response_model=Token)
async def login_user(payload: LoginIn):
    """Authenticate a user and return a JWT token."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")
    user_collection = settings.db.users
    user = await user_collection.find_one({"email": payload.email.lower()})
    if not user or not verify_password(payload.password, user["hashed_password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    user_id = str(user["_id"])
    access_token = create_access_token({"sub": user_id})
    return Token(access_token=access_token)

@router.get("/me", response_model=UserRead)
async def get_current_user_profile(user_info: dict = Depends(get_current_user)):
    """Retrieve details of the currently authenticated user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")
    user_id = user_info["user_id"]
    try:
        oid = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid user ID format")
    
    user = await settings.db.users.find_one({"_id": oid})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    return UserRead(
        id=str(user["_id"]),
        name=user.get("name", "User"),
        email=user["email"],
        role=user.get("role", "student"),
        created_at=user.get("created_at"),
    )
