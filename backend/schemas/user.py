# backend/schemas/user.py

from pydantic import BaseModel, EmailStr, Field, validator
from typing import Literal, Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)
    # Public registration can ONLY create student or educator; NEVER admin
    role: Literal["student", "educator"]

    @validator("password")
    def strip_spaces(cls, v: str) -> str:
        return v.strip()

class UserRead(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: Literal["student", "educator", "admin"]
    is_active: bool = True
    created_at: Optional[datetime] = None

class AdminUserCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: Literal["student", "educator", "admin"] = "student"
    is_active: bool = True

class AdminUserUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=100)
    role: Optional[Literal["student", "educator", "admin"]] = None
    is_active: Optional[bool] = None

class AdminUserRead(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str
    is_active: bool
    lecture_count: int = 0
    created_at: Optional[datetime] = None

class AdminStatsUsers(BaseModel):
    total: int = 0
    active: int = 0
    deactivated: int = 0
    students: int = 0
    educators: int = 0
    admins: int = 0

class AdminStatsLectures(BaseModel):
    total: int = 0
    with_transcripts: int = 0
    with_summaries: int = 0
    with_flashcards: int = 0

class AdminStatsResponse(BaseModel):
    total_users: int = 0
    active_users: int = 0
    deactivated_users: int = 0
    students_count: int = 0
    educators_count: int = 0
    admins_count: int = 0
    total_lectures: int = 0
    users: Optional[AdminStatsUsers] = None
    lectures: Optional[AdminStatsLectures] = None

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
