# backend/processing_service.py

import os
import asyncio
import subprocess
import tempfile
from pathlib import Path
from datetime import datetime
from typing import Tuple, Dict, Any, Optional
from bson import ObjectId
import httpx
import pymupdf
import docx
import imageio_ffmpeg

from .config import settings

# Supported extensions
DOCUMENT_EXTENSIONS = {".pdf", ".docx", ".doc", ".txt", ".md"}
AUDIO_EXTENSIONS = {".mp3", ".wav", ".m4a"}
VIDEO_EXTENSIONS = {".mp4", ".webm"}

HF_ROUTER_URL = "https://router.huggingface.co/hf-inference/models"
HF_LEGACY_URL = "https://api-inference.huggingface.co/models"


def extract_text_from_pdf(file_path: Path) -> Tuple[str, Dict[str, Any]]:
    """Extract clean text and page count from a PDF using PyMuPDF."""
    doc = pymupdf.open(str(file_path))
    pages_text = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text().strip()
        if text:
            pages_text.append(text)
    
    full_text = "\n\n".join(pages_text)
    metadata = {
        "extractor": "PyMuPDF",
        "total_pages": len(doc),
        "pages_with_text": len(pages_text),
    }
    doc.close()
    return full_text, metadata


def extract_text_from_docx(file_path: Path) -> Tuple[str, Dict[str, Any]]:
    """Extract text from a DOCX file including paragraphs and tables."""
    doc = docx.Document(str(file_path))
    parts = []
    
    # Paragraphs
    for p in doc.paragraphs:
        t = p.text.strip()
        if t:
            parts.append(t)
            
    # Tables
    for table in doc.tables:
        for row in table.rows:
            row_text = " | ".join(cell.text.strip() for cell in row.cells if cell.text.strip())
            if row_text:
                parts.append(row_text)
                
    full_text = "\n\n".join(parts)
    metadata = {
        "extractor": "python-docx",
        "paragraphs_count": len(doc.paragraphs),
        "tables_count": len(doc.tables),
    }
    return full_text, metadata


def extract_text_from_txt(file_path: Path) -> Tuple[str, Dict[str, Any]]:
    """Directly read a plain text or markdown file with multi-encoding fallback."""
    encodings = ["utf-8", "utf-8-sig", "latin-1", "cp1252"]
    full_text = ""
    used_encoding = "utf-8"
    
    for enc in encodings:
        try:
            with open(file_path, "r", encoding=enc) as f:
                full_text = f.read()
            used_encoding = enc
            break
        except (UnicodeDecodeError, LookupError):
            continue
            
    metadata = {
        "extractor": "direct_read",
        "encoding": used_encoding,
        "line_count": len(full_text.splitlines()),
    }
    return full_text, metadata


def extract_audio_from_video(video_path: Path) -> Path:
    """Extract audio from video file to a temporary MP3 file using bundled imageio-ffmpeg."""
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    temp_dir = Path(tempfile.gettempdir())
    temp_audio_path = temp_dir / f"summify_audio_{video_path.stem}_{int(datetime.utcnow().timestamp())}.mp3"
    
    cmd = [
        ffmpeg_exe,
        "-y",
        "-i", str(video_path),
        "-vn",
        "-acodec", "libmp3lame",
        "-ar", "16000",
        "-ac", "1",
        "-b:a", "64k",
        str(temp_audio_path),
    ]
    
    proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if proc.returncode != 0:
        raise RuntimeError(f"Audio extraction from video failed: {proc.stderr[:300]}")
        
    if not temp_audio_path.exists() or temp_audio_path.stat().st_size == 0:
        raise RuntimeError("Extracted audio file is missing or empty")
        
    return temp_audio_path


async def transcribe_audio_hf(audio_path: Path) -> Tuple[str, Dict[str, Any]]:
    """Send audio file to Hugging Face hosted inference using openai/whisper-large-v3-turbo."""
    if not settings.hf_token or not settings.hf_token.strip():
        raise ValueError(
            "Hugging Face API token (HF_TOKEN) is not configured in .env. "
            "Please add HF_TOKEN to your .env file to enable Whisper audio/video transcription."
        )

    model_name = settings.hf_whisper_model or "openai/whisper-large-v3-turbo"
    endpoints = [
        f"{HF_ROUTER_URL}/{model_name}",
        f"{HF_LEGACY_URL}/{model_name}",
    ]
    
    mime_map = {
        ".mp3": "audio/mpeg",
        ".wav": "audio/wav",
        ".m4a": "audio/x-m4a",
        ".ogg": "audio/ogg",
        ".flac": "audio/flac",
    }
    content_type = mime_map.get(audio_path.suffix.lower(), "audio/mpeg")

    headers = {
        "Authorization": f"Bearer {settings.hf_token.strip()}",
        "Content-Type": content_type,
    }
    
    with open(audio_path, "rb") as f:
        audio_bytes = f.read()

    last_error = None
    async with httpx.AsyncClient(timeout=120.0) as client:
        for endpoint in endpoints:
            # Retry loop in case model is cold-booting (HTTP 503)
            for attempt in range(3):
                try:
                    response = await client.post(endpoint, headers=headers, content=audio_bytes)
                    
                    if response.status_code == 200:
                        data = response.json()
                        text = ""
                        if isinstance(data, dict):
                            text = data.get("text", "")
                        elif isinstance(data, list):
                            text = " ".join(item.get("text", "") for item in data if isinstance(item, dict))
                            
                        text = text.strip()
                        metadata = {
                            "model": model_name,
                            "endpoint_used": endpoint,
                            "audio_size_bytes": len(audio_bytes),
                        }
                        return text, metadata
                    
                    if response.status_code == 503:
                        # Model is loading
                        try:
                            data = response.json()
                            est_time = float(data.get("estimated_time", 15.0))
                        except Exception:
                            est_time = 15.0
                        sleep_seconds = min(est_time, 20.0)
                        await asyncio.sleep(sleep_seconds)
                        continue
                    
                    if response.status_code == 401:
                        raise ValueError("Invalid or unauthorized Hugging Face token (HF_TOKEN). Please check your token permissions.")
                    
                    if response.status_code == 404:
                        # Model not available on this endpoint, try next endpoint
                        last_error = f"Model {model_name} not found at {endpoint}"
                        break

                    error_detail = response.text[:300]
                    last_error = f"Hugging Face API returned HTTP {response.status_code}: {error_detail}"
                    break
                except httpx.RequestError as exc:
                    last_error = f"Hugging Face network error: {str(exc)}"
                    await asyncio.sleep(2.0)
                    
    raise RuntimeError(last_error or "Transcription failed across Hugging Face endpoints.")


async def update_lecture_status(
    lecture_id: str,
    status: str,
    status_message: Optional[str] = None,
    error_message: Optional[str] = None,
) -> None:
    """Helper to update a lecture's processing status in MongoDB."""
    if settings.db is None:
        return

    update_fields: Dict[str, Any] = {
        "processing_status": status,
        "updated_at": datetime.utcnow(),
    }
    if status_message is not None:
        update_fields["status_message"] = status_message
    if error_message is not None:
        update_fields["error_message"] = error_message
    elif status != "failed":
        # Clear prior error if now succeeded or progressing
        update_fields["error_message"] = None

    try:
        oid = ObjectId(lecture_id)
        await settings.db.lectures.update_one({"_id": oid}, {"$set": update_fields})
    except Exception as e:
        print(f"Error updating lecture status for {lecture_id}: {e}")


async def process_lecture_background(lecture_id: str, user_id: str) -> None:
    """Orchestrates lecture processing through statuses:
    uploaded -> extracting -> transcribing -> completed / failed.
    """
    if settings.db is None:
        print(f"Cannot process lecture {lecture_id}: Database handle is None")
        return

    try:
        oid = ObjectId(lecture_id)
    except Exception:
        return

    lecture_doc = await settings.db.lectures.find_one({"_id": oid, "user_id": user_id})
    if not lecture_doc:
        print(f"Lecture {lecture_id} not found for user {user_id}")
        return

    storage_path = Path(lecture_doc.get("storage_path", ""))
    if not storage_path.is_file():
        await update_lecture_status(
            lecture_id,
            status="failed",
            status_message="File missing on disk",
            error_message="Uploaded lecture source file could not be found on server storage.",
        )
        return

    ext = storage_path.suffix.lower()
    temp_audio_to_delete: Optional[Path] = None

    try:
        full_text = ""
        metadata: Dict[str, Any] = {}
        source_type = "document"

        # 1. DOCUMENT PROCESSING (PDF, DOCX, TXT, MD)
        if ext in DOCUMENT_EXTENSIONS:
            await update_lecture_status(
                lecture_id,
                status="extracting",
                status_message=f"Extracting content from {ext.upper().replace('.', '')} document...",
            )

            # Small yield to let event loop tick & reflect status update
            await asyncio.sleep(0.5)

            if ext == ".pdf":
                full_text, metadata = extract_text_from_pdf(storage_path)
            elif ext in {".docx", ".doc"}:
                full_text, metadata = extract_text_from_docx(storage_path)
            elif ext in {".txt", ".md"}:
                full_text, metadata = extract_text_from_txt(storage_path)

            source_type = "document"

            if not full_text.strip():
                full_text = "[No selectable text could be extracted from this document. It may consist of scanned images or empty pages.]"
                metadata["warning"] = "empty_or_scanned_document"

        # 2. AUDIO / VIDEO PROCESSING (MP3, WAV, M4A, MP4, WEBM)
        elif ext in AUDIO_EXTENSIONS or ext in VIDEO_EXTENSIONS:
            audio_path = storage_path

            if ext in VIDEO_EXTENSIONS:
                await update_lecture_status(
                    lecture_id,
                    status="extracting",
                    status_message=f"Extracting audio track from {ext.upper().replace('.', '')} video...",
                )
                await asyncio.sleep(0.5)
                audio_path = extract_audio_from_video(storage_path)
                temp_audio_to_delete = audio_path

            await update_lecture_status(
                lecture_id,
                status="transcribing",
                status_message=f"Transcribing audio using Whisper AI ({settings.hf_whisper_model})...",
            )
            await asyncio.sleep(0.5)

            full_text, metadata = await transcribe_audio_hf(audio_path)
            source_type = "audio"

            if not full_text.strip():
                full_text = "[No speech was recognized in the audio track.]"
                metadata["warning"] = "no_speech_detected"

        else:
            raise ValueError(f"Unsupported file format for processing: {ext}")

        # 3. STORE TRANSCRIPT IN "transcripts" COLLECTION
        word_count = len(full_text.split())
        char_count = len(full_text)

        transcript_doc = {
            "lecture_id": lecture_id,
            "user_id": user_id,
            "text": full_text,
            "source_type": source_type,
            "word_count": word_count,
            "character_count": char_count,
            "metadata": metadata,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }

        await settings.db.transcripts.update_one(
            {"lecture_id": lecture_id, "user_id": user_id},
            {"$set": transcript_doc},
            upsert=True,
        )

        # 4. MARK LECTURE AS COMPLETED
        await update_lecture_status(
            lecture_id,
            status="completed",
            status_message=f"Processing complete ({word_count} words extracted).",
        )
        print(f" Lecture {lecture_id} successfully processed into transcript.")

    except Exception as exc:
        error_msg = str(exc)
        print(f"❌ Processing failed for lecture {lecture_id}: {error_msg}")
        await update_lecture_status(
            lecture_id,
            status="failed",
            status_message="Processing failed",
            error_message=error_msg,
        )

    finally:
        # 5. CLEAN UP ANY TEMPORARY EXTRACTED AUDIO
        if temp_audio_to_delete and temp_audio_to_delete.exists():
            try:
                temp_audio_to_delete.unlink()
                print(f" Cleaned up temporary audio: {temp_audio_to_delete.name}")
            except Exception as e:
                print(f"Notice: Failed to delete temp audio file: {e}")
