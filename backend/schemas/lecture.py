# backend/schemas/lecture.py

from pydantic import BaseModel, Field
from typing import Literal, Optional, Any
from datetime import datetime

class LectureCreate(BaseModel):
    title: str = Field(..., max_length=200)

class LectureStatusResponse(BaseModel):
    lecture_id: str
    processing_status: str  # "uploaded", "extracting", "transcribing", "completed", "failed"
    status_message: Optional[str] = None
    error_message: Optional[str] = None
    has_transcript: bool = False
    updated_at: Optional[datetime] = None

class TranscriptRead(BaseModel):
    id: str
    lecture_id: str
    user_id: str
    text: str
    source_type: str  # "document" or "audio"
    word_count: int
    character_count: int
    metadata: dict[str, Any] = Field(default_factory=dict)
    created_at: datetime

class LectureRead(BaseModel):
    id: str
    user_id: str
    title: str
    original_filename: str
    file_type: str
    file_size: int
    storage_path: str
    upload_date: datetime
    processing_status: str  # "uploaded", "extracting", "transcribing", "completed", "failed"
    status_message: Optional[str] = None
    error_message: Optional[str] = None
    updated_at: Optional[datetime] = None
