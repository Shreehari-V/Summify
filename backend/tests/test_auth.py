# backend/tests/test_auth.py

import pytest


@pytest.mark.asyncio
async def test_register_student_success(client, test_db):
    payload = {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "password": "Password123!",
        "role": "student",
    }
    response = client.post("/api/auth/register", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"

    # Verify user saved with is_active = True
    user = await test_db.users.find_one({"email": "jane@example.com"})
    assert user is not None
    assert user["role"] == "student"
    assert user["is_active"] is True
    assert "hashed_password" in user
    assert user["hashed_password"] != "Password123!"


@pytest.mark.asyncio
async def test_register_educator_success(client, test_db):
    payload = {
        "name": "Professor Smith",
        "email": "smith@university.edu",
        "password": "ProfessorPass123!",
        "role": "educator",
    }
    response = client.post("/api/auth/register", json=payload)
    assert response.status_code == 201
    assert "access_token" in response.json()


@pytest.mark.asyncio
async def test_register_admin_role_rejected(client, test_db):
    """Admin accounts can NEVER be created through public registration."""
    payload = {
        "name": "Hacker Admin",
        "email": "hacker@example.com",
        "password": "HackerPass123!",
        "role": "admin",
    }
    response = client.post("/api/auth/register", json=payload)
    # Pydantic Literal rejects "admin" with 422 Unprocessable Entity
    assert response.status_code in [400, 403, 422]


@pytest.mark.asyncio
async def test_register_duplicate_email_rejected(client, seeded_users):
    payload = {
        "name": "Duplicate User",
        "email": "student@summify.io",  # Already seeded
        "password": "AnotherPassword123!",
        "role": "student",
    }
    response = client.post("/api/auth/register", json=payload)
    assert response.status_code == 409
    assert "already exists" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_login_valid_credentials(client, seeded_users):
    payload = {
        "email": "student@summify.io",
        "password": "StudentPass123!",
    }
    response = client.post("/api/auth/login", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data


@pytest.mark.asyncio
async def test_login_invalid_password_returns_generic_error(client, seeded_users):
    payload = {
        "email": "student@summify.io",
        "password": "WrongPassword!",
    }
    response = client.post("/api/auth/login", json=payload)
    assert response.status_code == 401
    # Generic message avoids user enumeration
    assert response.json()["detail"] == "Invalid email or password"


@pytest.mark.asyncio
async def test_login_nonexistent_email_returns_generic_error(client, seeded_users):
    payload = {
        "email": "nonexistent@example.com",
        "password": "AnyPassword123!",
    }
    response = client.post("/api/auth/login", json=payload)
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"


@pytest.mark.asyncio
async def test_login_deactivated_account_blocked(client, seeded_users):
    payload = {
        "email": "inactive@summify.io",
        "password": "InactivePass123!",
    }
    response = client.post("/api/auth/login", json=payload)
    assert response.status_code == 403
    assert "deactivated" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_get_me_never_exposes_password_hash(client, seeded_users):
    token = seeded_users["educator"]["token"]
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/api/auth/me", headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert data["email"] == "educator@summify.io"
    assert data["role"] == "educator"
    assert data["is_active"] is True
    # Security check: password hashes must NEVER be present
    assert "password" not in data
    assert "hashed_password" not in data
    assert "password_hash" not in data
