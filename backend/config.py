# backend/config.py

from pydantic import Field
from typing import ClassVar, Any
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongodb_uri: str = Field(..., env="MONGODB_URI")
    jwt_secret_key: str = Field(..., env="JWT_SECRET_KEY")
    jwt_algorithm: str = Field(default="HS256", env="JWT_ALGORITHM")
    access_token_expire_minutes: int = Field(default=60, env="ACCESS_TOKEN_EXPIRE_MINUTES")
    hf_token: str | None = Field(default=None, env="HF_TOKEN")
    hf_whisper_model: str = Field(default="openai/whisper-large-v3-turbo", env="HF_WHISPER_MODEL")
    hf_summary_model: str = Field(default="facebook/bart-large-cnn", env="HF_SUMMARY_MODEL")
    hf_flashcard_model: str = Field(default="meta-llama/Llama-3.1-8B-Instruct", env="HF_FLASHCARD_MODEL")
    default_flashcard_count: int = Field(default=10, env="DEFAULT_FLASHCARD_COUNT")
    # This will be set after the DB connection is established
    db: ClassVar[Any] = None

    class Config:
        env_file = (".env", "backend/.env")
        env_file_encoding = "utf-8"
        extra = "ignore"

settings = Settings()
