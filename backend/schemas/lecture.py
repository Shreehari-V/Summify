# backend/schemas/lecture.py

from pydantic import BaseModel, Field
from typing import Literal
from datetime import datetime

class LectureCreate(BaseModel):
    title: str = Field(..., max_length=200)
    # file is handled via UploadFile, no field here

class LectureRead(BaseModel):
    id: str
    user_id: str
    title: str
    original_filename: str
    file_type: str
    file_size: int
    storage_path: str
    upload_date: datetime
    processing_status: Literal["uploaded", "processing", "completed"]
