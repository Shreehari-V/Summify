# backend/api/lectures.py

import os
from pathlib import Path
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from fastapi.responses import FileResponse
from bson import ObjectId
from ..dependencies import get_current_user
from ..config import settings
from ..schemas.lecture import LectureCreate, LectureRead
from datetime import datetime

router = APIRouter()

# Ensure upload directory exists
UPLOAD_DIR = Path(__file__).resolve().parents[2] / "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".txt",
    ".md",
    ".docx",
    ".doc",
    ".mp3",
    ".wav",
    ".m4a",
    ".mp4",
    ".webm",
}

ALLOWED_MIME = {
    "application/pdf",
    "text/plain",
    "text/markdown",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "audio/mp4",
    "audio/x-m4a",
    "video/mp4",
    "video/webm",
    "application/octet-stream",
}
MAX_SIZE = 25 * 1024 * 1024  # 25 MB


@router.post("/upload", response_model=LectureRead, status_code=status.HTTP_201_CREATED)
async def upload_lecture(
    title: str = Form(""),
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user),
):
    """Validate and store a lecture file, then persist metadata in MongoDB.
    Returns the created lecture document.
    """
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    file_ext = Path(file.filename).suffix.lower()
    is_valid_type = (file.content_type in ALLOWED_MIME) or (file_ext in ALLOWED_EXTENSIONS)
    if not is_valid_type:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type ({file.content_type or file_ext}). Supported formats: PDF, DOCX, TXT, MD, MP3, WAV, MP4, WEBM.",
        )

    contents = await file.read()
    if len(contents) > MAX_SIZE:
        raise HTTPException(status_code=400, detail="File too large (maximum allowed size is 25 MB)")

    # Build unique safe storage path
    timestamp = int(datetime.utcnow().timestamp())
    clean_name = Path(file.filename).stem.replace(" ", "_")
    safe_filename = f"{timestamp}_{clean_name}{file_ext}"
    storage_path = UPLOAD_DIR / safe_filename

    with open(storage_path, "wb") as f:
        f.write(contents)

    resolved_title = title.strip() if title and title.strip() else Path(file.filename).stem

    lecture_doc = {
        "user_id": user["user_id"],
        "title": resolved_title,
        "original_filename": file.filename,
        "file_type": file.content_type or "application/octet-stream",
        "file_size": len(contents),
        "storage_path": str(storage_path),
        "upload_date": datetime.utcnow(),
        "processing_status": "uploaded",
    }

    result = await settings.db.lectures.insert_one(lecture_doc)
    lecture_doc["id"] = str(result.inserted_id)
    return lecture_doc


@router.get("/my", response_model=list[LectureRead])
async def list_my_lectures(user: dict = Depends(get_current_user)):
    """List all lectures uploaded by the authenticated user in reverse chronological order."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    cursor = settings.db.lectures.find({"user_id": user["user_id"]}).sort("upload_date", -1)
    lectures = []
    async for doc in cursor:
        doc["id"] = str(doc["_id"])
        lectures.append(doc)
    return lectures


@router.get("/{lecture_id}", response_model=LectureRead)
async def get_lecture(lecture_id: str, user: dict = Depends(get_current_user)):
    """Get metadata for a specific lecture belonging to the user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    doc = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    doc["id"] = str(doc["_id"])
    return doc


@router.delete("/{lecture_id}", status_code=status.HTTP_200_OK)
async def delete_lecture(lecture_id: str, user: dict = Depends(get_current_user)):
    """Delete a lecture record and its stored file."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    doc = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    # Remove the physical file if it exists
    file_path = Path(doc.get("storage_path", ""))
    if file_path.is_file():
        try:
            file_path.unlink()
        except Exception:
            pass

    await settings.db.lectures.delete_one({"_id": oid})
    return {"message": "Lecture deleted successfully", "id": lecture_id}


@router.get("/{lecture_id}/file")
async def download_lecture_file(lecture_id: str, user: dict = Depends(get_current_user)):
    """Download the original uploaded file for a lecture."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    doc = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    file_path = Path(doc.get("storage_path", ""))
    if not file_path.is_file():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Uploaded file is missing on server")

    return FileResponse(
        path=str(file_path),
        filename=doc.get("original_filename", "lecture_file"),
        media_type=doc.get("file_type", "application/octet-stream"),
    )
