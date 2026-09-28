# backend/schemas/auth.py

from pydantic import BaseModel, EmailStr, Field

class LoginIn(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)
