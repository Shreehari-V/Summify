# backend/utils/jwt.py

from datetime import datetime, timedelta
from jose import jwt
from ..config import settings


def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Create a JWT token with given payload.
    `data` should contain at least a ``sub`` field (the user id).
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=settings.access_token_expire_minutes))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)
    return encoded_jwt


def decode_access_token(token: str) -> dict:
    """Decode a JWT token and return its payload.
    Raises ``jose.JWTError`` on failure.
    """
    payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
    return payload
