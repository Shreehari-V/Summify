# backend/tests/conftest.py

import os
import sys
import pytest
import asyncio
from datetime import datetime
from starlette.testclient import TestClient
from dotenv import load_dotenv

# Ensure root workspace is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

load_dotenv("backend/.env")
load_dotenv(".env")

from backend.main import app
from backend.config import settings, Settings
from backend.utils.password import hash_password
from backend.utils.jwt import create_access_token

try:
    from mongomock_motor import AsyncMongoMockClient
    USE_MOCK = True
except ImportError:
    from motor.motor_asyncio import AsyncIOMotorClient
    USE_MOCK = False



@pytest.fixture(scope="function")
async def test_db():
    """Fixture providing an isolated test database with fresh state per test."""
    if USE_MOCK:
        client = AsyncMongoMockClient()
        db = client["summify_test"]
    else:
        client = AsyncIOMotorClient(settings.mongodb_uri)
        db = client["summify_test"]
        # Clear collections before test
        for col in ["users", "lectures", "transcripts", "summaries", "keywords", "flashcards"]:
            await db[col].delete_many({})

    # Set as global active db for FastAPI app
    Settings.db = db

    yield db

    # Cleanup after test
    if not USE_MOCK:
        for col in ["users", "lectures", "transcripts", "summaries", "keywords", "flashcards"]:
            await db[col].delete_many({})
        client.close()


from unittest.mock import patch, AsyncMock

@pytest.fixture
def client(test_db):
    """FastAPI TestClient with isolated test database attached."""
    Settings.db = test_db
    with patch("backend.main.connect_to_mongo", new_callable=AsyncMock), \
         patch("backend.main.close_mongo_connection", new_callable=AsyncMock), \
         patch("backend.database.connect_to_mongo", new_callable=AsyncMock), \
         patch("backend.database.close_mongo_connection", new_callable=AsyncMock):
        with TestClient(app) as test_client:
            Settings.db = test_db
            yield test_client


@pytest.fixture
async def seeded_users(test_db):
    """Seed student, educator, admin, and inactive accounts into the test database."""
    users_col = test_db.users

    # 1. Student User
    student_doc = {
        "name": "Alice Student",
        "email": "student@summify.io",
        "hashed_password": hash_password("StudentPass123!"),
        "role": "student",
        "is_active": True,
        "created_at": datetime.utcnow(),
    }
    s_res = await users_col.insert_one(student_doc)
    student_id = str(s_res.inserted_id)

    # 2. Educator User
    educator_doc = {
        "name": "Dr. Bob Educator",
        "email": "educator@summify.io",
        "hashed_password": hash_password("EducatorPass123!"),
        "role": "educator",
        "is_active": True,
        "created_at": datetime.utcnow(),
    }
    e_res = await users_col.insert_one(educator_doc)
    educator_id = str(e_res.inserted_id)

    # 3. Admin User
    admin_doc = {
        "name": "Super Admin",
        "email": "admin@summify.io",
        "hashed_password": hash_password("AdminPass123!"),
        "role": "admin",
        "is_active": True,
        "created_at": datetime.utcnow(),
    }
    a_res = await users_col.insert_one(admin_doc)
    admin_id = str(a_res.inserted_id)

    # 4. Inactive / Deactivated User
    inactive_doc = {
        "name": "Inactive User",
        "email": "inactive@summify.io",
        "hashed_password": hash_password("InactivePass123!"),
        "role": "student",
        "is_active": False,
        "created_at": datetime.utcnow(),
    }
    i_res = await users_col.insert_one(inactive_doc)
    inactive_id = str(i_res.inserted_id)

    return {
        "student": {
            "id": student_id,
            "email": "student@summify.io",
            "token": create_access_token({"sub": student_id, "role": "student"}),
        },
        "educator": {
            "id": educator_id,
            "email": "educator@summify.io",
            "token": create_access_token({"sub": educator_id, "role": "educator"}),
        },
        "admin": {
            "id": admin_id,
            "email": "admin@summify.io",
            "token": create_access_token({"sub": admin_id, "role": "admin"}),
        },
        "inactive": {
            "id": inactive_id,
            "email": "inactive@summify.io",
            "token": create_access_token({"sub": inactive_id, "role": "student"}),
        },
    }
