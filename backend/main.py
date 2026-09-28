# backend/main.py

from contextlib import asynccontextmanager
import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .config import Settings, settings
from .database import connect_to_mongo, close_mongo_connection
from .api import auth, lectures, health, admin

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager handling startup and shutdown events."""
    await connect_to_mongo()
    if Settings.db is not None:
        try:
            await Settings.db.users.create_index("email", unique=True)
            await Settings.db.lectures.create_index("user_id")
            await Settings.db.transcripts.create_index([("lecture_id", 1), ("user_id", 1)], unique=True)
            await Settings.db.summaries.create_index([("lecture_id", 1), ("user_id", 1)], unique=True)
            await Settings.db.keywords.create_index([("lecture_id", 1), ("user_id", 1)], unique=True)
            await Settings.db.flashcards.create_index([("lecture_id", 1), ("user_id", 1)], unique=True)
        except Exception as e:
            print(f"Index creation notice: {e}")
    yield
    await close_mongo_connection()

app = FastAPI(
    title="Summify API",
    description="Intelligent Lecture Summarization and Study Platform",
    version="1.0.0",
    lifespan=lifespan,
)

# Auto-reconnect middleware: If DB was offline at boot, re-attempt on incoming request
@app.middleware("http")
async def db_auto_reconnect_middleware(request: Request, call_next):
    if Settings.db is None and not request.url.path.startswith("/api/health"):
        await connect_to_mongo()
    return await call_next(request)

# Robust CORS supporting localhost on any port (5173, 5174, 3000, 127.0.0.1, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(lectures.router, prefix="/api/lectures", tags=["lectures"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(health.router, prefix="/api", tags=["health"])

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True, reload_dirs=["backend"])
