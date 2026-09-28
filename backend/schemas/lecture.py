# backend/schemas/lecture.py

from pydantic import BaseModel, Field
from typing import Literal, Optional, Any
from datetime import datetime

class LectureCreate(BaseModel):
    title: str = Field(..., max_length=200)

class LectureStatusResponse(BaseModel):
    lecture_id: str
    processing_status: str  # "uploaded", "extracting", "transcribing", "summarizing", "extracting_keywords", "generating_flashcards", "completed", "failed"
    status_message: Optional[str] = None
    error_message: Optional[str] = None
    has_transcript: bool = False
    has_summary: bool = False
    has_keywords: bool = False
    has_flashcards: bool = False
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

class SummaryRead(BaseModel):
    id: str
    lecture_id: str
    user_id: str
    summary_text: str
    key_points: list[str] = Field(default_factory=list)
    word_count: int
    character_count: int
    chunks_processed: int
    model: str
    created_at: datetime

class KeywordItem(BaseModel):
    term: str
    score: float
    frequency: int = 1

class KeywordsRead(BaseModel):
    id: str
    lecture_id: str
    user_id: str
    keywords: list[KeywordItem]
    method: str
    total_keywords: int
    created_at: datetime

class FlashcardItem(BaseModel):
    id: str
    question: str
    answer: str
    category: Optional[str] = None

class FlashcardsRead(BaseModel):
    id: str
    lecture_id: str
    user_id: str
    cards: list[FlashcardItem]
    total_cards: int
    model: str
    created_at: datetime
    updated_at: Optional[datetime] = None

class FlashcardGenerateRequest(BaseModel):
    count: Optional[int] = Field(default=None, ge=1, le=25)

class LectureRead(BaseModel):
    id: str
    user_id: str
    title: str
    original_filename: str
    file_type: str
    file_size: int
    storage_path: str
    upload_date: datetime
    processing_status: str  # "uploaded", "extracting", "transcribing", "summarizing", "extracting_keywords", "generating_flashcards", "completed", "failed"
    status_message: Optional[str] = None
    error_message: Optional[str] = None
    updated_at: Optional[datetime] = None
