# backend/schemas/user.py

from pydantic import BaseModel, EmailStr, Field, validator
from typing import Literal, Optional
from datetime import datetime

class UserCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)
    role: Literal["student", "educator"]

    @validator("password")
    def strip_spaces(cls, v: str) -> str:
        return v.strip()

class UserRead(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: Literal["student", "educator"]
    created_at: Optional[datetime] = None

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
