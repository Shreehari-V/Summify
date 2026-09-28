# backend/tests/test_access_control.py

import pytest


@pytest.mark.asyncio
async def test_unauthorized_request_without_token(client):
    response = client.get("/api/admin/users")
    assert response.status_code == 401 or response.status_code == 403


@pytest.mark.asyncio
async def test_unauthorized_request_with_garbage_token(client):
    headers = {"Authorization": "Bearer not-a-real-token"}
    response = client.get("/api/auth/me", headers=headers)
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_student_cannot_access_admin_dashboard(client, seeded_users):
    student_token = seeded_users["student"]["token"]
    headers = {"Authorization": f"Bearer {student_token}"}
    response = client.get("/api/admin/users", headers=headers)
    assert response.status_code == 403
    assert "administrator access required" in response.json()["detail"].lower()


@pytest.mark.asyncio
async def test_educator_cannot_access_admin_dashboard(client, seeded_users):
    educator_token = seeded_users["educator"]["token"]
    headers = {"Authorization": f"Bearer {educator_token}"}
    response = client.get("/api/admin/users", headers=headers)
    assert response.status_code == 403


@pytest.mark.asyncio
async def test_admin_can_access_admin_users_and_stats(client, seeded_users):
    admin_token = seeded_users["admin"]["token"]
    headers = {"Authorization": f"Bearer {admin_token}"}

    # 1. Access user list
    users_res = client.get("/api/admin/users", headers=headers)
    assert users_res.status_code == 200
    user_list = users_res.json()
    assert len(user_list) >= 3

    # Check security: NO passwords exposed
    for u in user_list:
        assert "password" not in u
        assert "hashed_password" not in u

    # 2. Access dashboard stats
    stats_res = client.get("/api/admin/stats", headers=headers)
    assert stats_res.status_code == 200
    stats = stats_res.json()
    assert stats["total_users"] >= 3
    assert stats["admins_count"] >= 1


@pytest.mark.asyncio
async def test_admin_can_create_user(client, seeded_users):
    admin_token = seeded_users["admin"]["token"]
    headers = {"Authorization": f"Bearer {admin_token}"}
    new_user_payload = {
        "name": "Created By Admin",
        "email": "newuser@summify.io",
        "password": "TempPassword123!",
        "role": "educator",
        "is_active": True,
    }
    response = client.post("/api/admin/users", json=new_user_payload, headers=headers)
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "newuser@summify.io"
    assert data["role"] == "educator"
    assert "password" not in data
    assert "hashed_password" not in data


@pytest.mark.asyncio
async def test_admin_can_toggle_user_status(client, seeded_users):
    admin_token = seeded_users["admin"]["token"]
    headers = {"Authorization": f"Bearer {admin_token}"}
    student_id = seeded_users["student"]["id"]

    # Deactivate student
    toggle_res = client.post(f"/api/admin/users/{student_id}/toggle-status", headers=headers)
    assert toggle_res.status_code == 200
    assert toggle_res.json()["is_active"] is False

    # Try logging in as deactivated student -> should be 403
    login_res = client.post("/api/auth/login", json={"email": "student@summify.io", "password": "StudentPass123!"})
    assert login_res.status_code == 403

    # Re-activate student
    toggle_back = client.post(f"/api/admin/users/{student_id}/toggle-status", headers=headers)
    assert toggle_back.status_code == 200
    assert toggle_back.json()["is_active"] is True


@pytest.mark.asyncio
async def test_admin_cannot_deactivate_self(client, seeded_users):
    admin_token = seeded_users["admin"]["token"]
    admin_id = seeded_users["admin"]["id"]
    headers = {"Authorization": f"Bearer {admin_token}"}

    response = client.post(f"/api/admin/users/{admin_id}/toggle-status", headers=headers)
    assert response.status_code == 400
    assert "cannot" in response.json()["detail"].lower()
