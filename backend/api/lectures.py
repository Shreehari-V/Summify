# backend/api/lectures.py

import os
import uuid
from pathlib import Path
from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, BackgroundTasks, status, Query
from fastapi.responses import FileResponse
from bson import ObjectId

from ..dependencies import get_current_user
from ..config import settings
from ..schemas.lecture import (
    LectureCreate,
    LectureRead,
    LectureStatusResponse,
    TranscriptRead,
    SummaryRead,
    KeywordsRead,
    FlashcardsRead,
    FlashcardGenerateRequest,
    FlashcardDeckUpdate,
    FlashcardShareResponse,
    SharedFlashcardsRead,
)
from ..processing_service import (
    process_lecture_background,
    generate_flashcards_for_lecture,
)

router = APIRouter()

# Ensure upload directory exists (use /tmp/uploads on Vercel's read-only serverless filesystem)
if os.environ.get("VERCEL"):
    UPLOAD_DIR = Path("/tmp/uploads")
else:
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
    and trigger asynchronous processing (extraction / transcription -> summarization -> keywords -> flashcards).
    """
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    file_ext = Path(file.filename or "").suffix.lower()
    if not file_ext or file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type ({file_ext}). Supported formats: PDF, DOCX, TXT, MD, MP3, WAV, MP4, WEBM.",
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

    # Launch asynchronous background processing pipeline
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

    query = {"_id": oid}
    if user.get("role") != "admin":
        query["user_id"] = user["user_id"]

    doc = await settings.db.lectures.find_one(query)
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    doc["id"] = str(doc["_id"])
    return doc


@router.get("/{lecture_id}/status", response_model=LectureStatusResponse)
async def get_lecture_status(lecture_id: str, user: dict = Depends(get_current_user)):
    """Get live processing status and artifact readiness of a lecture belonging to the authenticated user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    doc = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    # Check existence of processed artifacts
    t_doc = await settings.db.transcripts.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]}, {"_id": 1})
    s_doc = await settings.db.summaries.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]}, {"_id": 1})
    k_doc = await settings.db.keywords.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]}, {"_id": 1})
    f_doc = await settings.db.flashcards.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]}, {"_id": 1})

    return {
        "lecture_id": lecture_id,
        "processing_status": doc.get("processing_status", "uploaded"),
        "status_message": doc.get("status_message"),
        "error_message": doc.get("error_message"),
        "has_transcript": t_doc is not None,
        "has_summary": s_doc is not None,
        "has_keywords": k_doc is not None,
        "has_flashcards": f_doc is not None,
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


@router.get("/{lecture_id}/summary", response_model=SummaryRead)
async def get_lecture_summary(lecture_id: str, user: dict = Depends(get_current_user)):
    """Retrieve the generated summary and key points for a lecture belonging to the user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    lec = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not lec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    summary_doc = await settings.db.summaries.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]})
    if not summary_doc:
        if lec.get("processing_status") == "failed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Processing failed: {lec.get('error_message', 'Summarization failed')}",
            )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Summary not ready yet (Current status: {lec.get('processing_status', 'uploaded')}).",
        )

    summary_doc["id"] = str(summary_doc["_id"])
    return summary_doc


@router.get("/{lecture_id}/keywords", response_model=KeywordsRead)
async def get_lecture_keywords(lecture_id: str, user: dict = Depends(get_current_user)):
    """Retrieve the extracted keywords and concepts for a lecture belonging to the user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    lec = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not lec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    keywords_doc = await settings.db.keywords.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]})
    if not keywords_doc:
        if lec.get("processing_status") == "failed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Processing failed: {lec.get('error_message', 'Keyword extraction failed')}",
            )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Keywords not ready yet (Current status: {lec.get('processing_status', 'uploaded')}).",
        )

    keywords_doc["id"] = str(keywords_doc["_id"])
    return keywords_doc


@router.get("/{lecture_id}/flashcards", response_model=FlashcardsRead)
async def get_lecture_flashcards(lecture_id: str, user: dict = Depends(get_current_user)):
    """Retrieve the generated flashcards for a lecture belonging to the user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    lec = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not lec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    flashcards_doc = await settings.db.flashcards.find_one({"lecture_id": lecture_id, "user_id": user["user_id"]})
    if not flashcards_doc:
        if lec.get("processing_status") == "failed":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Processing failed: {lec.get('error_message', 'Flashcard generation failed')}",
            )
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Flashcards not ready yet (Current status: {lec.get('processing_status', 'uploaded')}).",
        )

    flashcards_doc["id"] = str(flashcards_doc["_id"])
    return flashcards_doc


@router.post("/{lecture_id}/generate-flashcards", response_model=FlashcardsRead)
async def regenerate_flashcards(
    lecture_id: str,
    payload: Optional[FlashcardGenerateRequest] = None,
    count: Optional[int] = Query(default=None, ge=1, le=10),
    user: dict = Depends(get_current_user),
):
    """Regenerate flashcards on demand for a lecture scoped to the user."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    lec = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not lec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    # Support count from either JSON body or query param
    req_count = None
    if payload and payload.count is not None:
        req_count = payload.count
    elif count is not None:
        req_count = count

    card_count = min(req_count if req_count else settings.default_flashcard_count or 10, 10)

    try:
        flashcards_doc = await generate_flashcards_for_lecture(
            lecture_id=lecture_id,
            user_id=user["user_id"],
            count=card_count,
        )
        return flashcards_doc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate flashcards: {str(exc)}",
        )


@router.post("/{lecture_id}/retry", response_model=LectureStatusResponse)
async def retry_lecture_processing(
    lecture_id: str,
    background_tasks: BackgroundTasks,
    user: dict = Depends(get_current_user),
):
    """Re-trigger background extraction/transcription and analysis pipeline without re-uploading."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    doc = await settings.db.lectures.find_one({"_id": oid, "user_id": user["user_id"]})
    if not doc:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    # Reset status and enqueue background pipeline
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
        "has_summary": False,
        "has_keywords": False,
        "has_flashcards": False,
        "updated_at": datetime.utcnow(),
    }


@router.delete("/{lecture_id}", status_code=status.HTTP_200_OK)
async def delete_lecture(lecture_id: str, user: dict = Depends(get_current_user)):
    """Delete a lecture record, stored file, and all associated transcripts, summaries, keywords, and flashcards."""
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

    # Delete lecture and all cascading child documents
    await settings.db.lectures.delete_one({"_id": oid})
    await settings.db.transcripts.delete_one({"lecture_id": lecture_id, "user_id": user["user_id"]})
    await settings.db.summaries.delete_one({"lecture_id": lecture_id, "user_id": user["user_id"]})
    await settings.db.keywords.delete_one({"lecture_id": lecture_id, "user_id": user["user_id"]})
    await settings.db.flashcards.delete_one({"lecture_id": lecture_id, "user_id": user["user_id"]})

    return {"message": "Lecture and all associated materials deleted successfully", "id": lecture_id}


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


@router.put("/{lecture_id}/flashcards", response_model=FlashcardsRead)
async def update_flashcard_deck(
    lecture_id: str,
    payload: FlashcardDeckUpdate,
    user: dict = Depends(get_current_user),
):
    """Educator / Owner can edit, add, or delete flashcards in the deck and save changes."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    # Check ownership or admin
    query = {"_id": oid}
    if user.get("role") != "admin":
        query["user_id"] = user["user_id"]

    lec = await settings.db.lectures.find_one(query)
    if not lec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    # Serialize card items
    raw_cards = []
    for c in payload.cards:
        raw_cards.append({
            "id": c.id if c.id else str(uuid.uuid4())[:8],
            "question": c.question.strip(),
            "answer": c.answer.strip(),
            "category": c.category.strip() if c.category else "Key Concept",
        })

    update_fields = {
        "cards": raw_cards,
        "total_cards": len(raw_cards),
        "updated_at": datetime.utcnow(),
    }

    await settings.db.flashcards.update_one(
        {"lecture_id": lecture_id},
        {
            "$set": update_fields,
            "$setOnInsert": {
                "lecture_id": lecture_id,
                "user_id": lec.get("user_id", user["user_id"]),
                "model": "educator-curated",
                "created_at": datetime.utcnow(),
            },
        },
        upsert=True,
    )

    saved_doc = await settings.db.flashcards.find_one({"lecture_id": lecture_id})
    saved_doc["id"] = str(saved_doc["_id"])
    if "user_id" not in saved_doc:
        saved_doc["user_id"] = lec.get("user_id", user["user_id"])
    if "model" not in saved_doc:
        saved_doc["model"] = "educator-curated"
    if "created_at" not in saved_doc:
        saved_doc["created_at"] = saved_doc.get("updated_at", datetime.utcnow())
    return saved_doc


@router.post("/{lecture_id}/share", response_model=FlashcardShareResponse)
async def toggle_flashcard_sharing(
    lecture_id: str,
    user: dict = Depends(get_current_user),
):
    """Toggle public sharing for this lecture's flashcards and return a shareable URL."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid lecture ID format")

    query = {"_id": oid}
    if user.get("role") != "admin":
        query["user_id"] = user["user_id"]

    lec = await settings.db.lectures.find_one(query)
    if not lec:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lecture not found")

    current_shared = lec.get("is_shared", False)
    new_shared = not current_shared
    share_slug = lec.get("share_slug")

    if not share_slug:
        share_slug = str(uuid.uuid4()).replace("-", "")[:12]

    # Update lecture & flashcards document
    await settings.db.lectures.update_one(
        {"_id": oid},
        {"$set": {"is_shared": new_shared, "share_slug": share_slug, "updated_at": datetime.utcnow()}},
    )
    await settings.db.flashcards.update_one(
        {"lecture_id": lecture_id},
        {"$set": {"is_shared": new_shared, "share_slug": share_slug, "updated_at": datetime.utcnow()}},
    )

    return FlashcardShareResponse(
        share_id=share_slug,
        is_shared=new_shared,
        share_url=f"/shared/flashcards/{share_slug}",
    )


@router.get("/shared/{share_id}", response_model=SharedFlashcardsRead)
async def get_shared_flashcards(share_id: str):
    """Public read-only endpoint for shared flashcards. Accessible without authentication."""
    if settings.db is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Database is unavailable")

    # Find by share_slug in lectures
    lec = await settings.db.lectures.find_one({"share_slug": share_id, "is_shared": True})
    if not lec:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Shared study set not found or sharing has been disabled by the educator.",
        )

    lecture_id = str(lec["_id"])
    flashcards_doc = await settings.db.flashcards.find_one({"lecture_id": lecture_id})
    if not flashcards_doc or not flashcards_doc.get("cards"):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No flashcards found for this shared set.",
        )

    # Get educator name
    educator_name = "Educator"
    try:
        user_doc = await settings.db.users.find_one({"_id": ObjectId(lec["user_id"])})
        if user_doc:
            educator_name = user_doc.get("name", "Educator")
    except Exception:
        pass

    return SharedFlashcardsRead(
        lecture_title=lec.get("title", "Lecture Study Set"),
        educator_name=educator_name,
        total_cards=len(flashcards_doc.get("cards", [])),
        cards=flashcards_doc.get("cards", []),
        model=flashcards_doc.get("model"),
        created_at=flashcards_doc.get("created_at"),
    )
