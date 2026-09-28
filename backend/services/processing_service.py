# backend/services/processing_service.py
# Re-exporting from backend.processing_service for flexible import paths

from ..processing_service import (
    extract_text_from_pdf,
    extract_text_from_docx,
    extract_text_from_txt,
    extract_audio_from_video,
    transcribe_audio_hf,
    process_lecture_background,
    update_lecture_status,
)

__all__ = [
    "extract_text_from_pdf",
    "extract_text_from_docx",
    "extract_text_from_txt",
    "extract_audio_from_video",
    "transcribe_audio_hf",
    "process_lecture_background",
    "update_lecture_status",
]
