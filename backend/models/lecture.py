# backend/models/lecture.py

from datetime import datetime
from typing import Optional

class Lecture:
    def __init__(
        self,
        *,
        id: str,
        user_id: str,
        title: str,
        original_filename: str,
        file_type: str,
        file_size: int,
        storage_path: str,
        upload_date: Optional[datetime] = None,
        processing_status: str = "uploaded",
    ):
        self.id = id
        self.user_id = user_id
        self.title = title
        self.original_filename = original_filename
        self.file_type = file_type
        self.file_size = file_size
        self.storage_path = storage_path
        self.upload_date = upload_date or datetime.utcnow()
        self.processing_status = processing_status
