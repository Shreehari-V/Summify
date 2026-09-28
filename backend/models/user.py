# backend/models/user.py

from typing import Optional
from datetime import datetime

# This is a plain Python class used to type hint MongoDB documents.
# Motor returns dicts; we keep the structure simple.
class User:
    def __init__(self, *, id: str, name: str, email: str, hashed_password: str, role: str, created_at: Optional[datetime] = None):
        self.id = id
        self.name = name
        self.email = email
        self.hashed_password = hashed_password
        self.role = role  # "student" or "educator"
        self.created_at = created_at or datetime.utcnow()
