# backend/config.py

from pydantic import Field
from typing import ClassVar, Any
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongodb_uri: str = Field(..., env="MONGODB_URI")
    jwt_secret_key: str = Field(..., env="JWT_SECRET_KEY")
    jwt_algorithm: str = Field(default="HS256", env="JWT_ALGORITHM")
    access_token_expire_minutes: int = Field(default=60, env="ACCESS_TOKEN_EXPIRE_MINUTES")
    # This will be set after the DB connection is established
    db: ClassVar[Any] = None

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
