# backend/api/lectures.py

import os
from pathlib import Path
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, BackgroundTasks, status
from fastapi.responses import FileResponse
from bson import ObjectId

from ..dependencies import get_current_user
from ..config import settings
from ..schemas.lecture import LectureCreate, LectureRead, LectureStatusResponse, TranscriptRead
from ..processing_service import process_lecture_background

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
    background_tasks: BackgroundTasks,
    title: str = Form(""),
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user),
):
    """Validate and store a lecture file, persist metadata in MongoDB,
    and trigger asynchronous processing (extraction / transcription).
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
        "status_message": "Queued for processing...",
        "error_message": None,
        "updated_at": datetime.utcnow(),
    }

    result = await settings.db.lectures.insert_one(lecture_doc)
    lecture_id = str(result.inserted_id)
    lecture_doc["id"] = lecture_id

    # Launch asynchronous background processing (no Celery/Redis needed)
    background_tasks.add_task(process_lecture_background, lecture_id=lecture_id, user_id=user["user_id"])

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


@router.get("/{lecture_id}/status", response_model=LectureStatusResponse)
async def get_lecture_status(lecture_id: str, user: dict = Depends(get_current_user)):
    """Get live-ish processing status of a lecture belonging to the authenticated user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    doc = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    has_transcript = False
    if doc.get("processing_status") == "completed":
        t_doc = await settings.db.transcripts.find_one(
            {"lecture_id": lecture_id, "user_id": user["user_id"]},
            {"_id": 1}
        )
        has_transcript = t_doc is not None

    return {
        "lecture_id": lecture_id,
        "processing_status": doc.get("processing_status", "uploaded"),
        "status_message": doc.get("status_message"),
        "error_message": doc.get("error_message"),
        "has_transcript": has_transcript,
        "updated_at": doc.get("updated_at") or doc.get("upload_date"),
    }


@router.get("/{lecture_id}/transcript", response_model=TranscriptRead)
async def get_lecture_transcript(lecture_id: str, user: dict = Depends(get_current_user)):
    """Retrieve the extracted text or audio transcript for a lecture belonging to the user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    # Enforce lecture ownership
    lec = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not lec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    transcript = await settings.db.transcripts.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]})
    if not transcript:
        if lec.get("processing_status") == "failed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Processing failed: {lec.get('error_message', 'Unknown extraction error')}",
            )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Transcript not ready yet (Current status: {lec.get('processing_status', 'uploaded')}).",
        )

    transcript["id"] = str(transcript["_id"])
    return transcript


@router.post("/{lecture_id}/retry", response_model=LectureStatusResponse)
async def retry_lecture_processing(
    lecture_id: str,
    background_tasks: BackgroundTasks,
    user: dict = Depends(get_current_user),
):
    """Re-trigger background extraction/transcription for a lecture without re-uploading."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    doc = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    # Reset status and enqueue task
    await settings.db.lectures.update_one(
        {"_id": oid},
        {
            "$set": {
                "processing_status": "uploaded",
                "status_message": "Re-queued for processing...",
                "error_message": None,
                "updated_at": datetime.utcnow(),
            }
        },
    )

    background_tasks.add_task(process_lecture_background, lecture_id=lecture_id, user_id=user["user_id"])

    return {
        "lecture_id": lecture_id,
        "processing_status": "uploaded",
        "status_message": "Re-queued for processing...",
        "error_message": None,
        "has_transcript": False,
        "updated_at": datetime.utcnow(),
    }


@router.delete("/{lecture_id}", status_code=status.HTTP_200_OK)
async def delete_lecture(lecture_id: str, user: dict = Depends(get_current_user)):
    """Delete a lecture record, its stored file, and its transcript."""
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

    # Delete both the lecture and associated transcript
    await settings.db.lectures.delete_one({"_id": oid})
    await settings.db.transcripts.delete_one({"lecture_id": lecture_id, "user_id": user["user_id"]})

    return {"message": "Lecture and transcript deleted successfully", "id": lecture_id}


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
