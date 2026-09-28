# backend/tests/test_upload_and_ownership.py

import io
import pytest
from datetime import datetime


@pytest.mark.asyncio
async def test_upload_disallowed_extension_rejected(client, seeded_users):
    token = seeded_users["educator"]["token"]
    headers = {"Authorization": f"Bearer {token}"}

    file_content = b"malicious binary content"
    files = {"file": ("malware.exe", io.BytesIO(file_content), "application/octet-stream")}
    data = {"title": "Malicious File"}

    response = client.post("/api/lectures/upload", data=data, files=files, headers=headers)
    assert response.status_code == 400
    assert "unsupported" in response.json()["detail"].lower()


from unittest.mock import patch

@pytest.mark.asyncio
async def test_upload_valid_text_file(client, seeded_users, test_db):
    token = seeded_users["educator"]["token"]
    headers = {"Authorization": f"Bearer {token}"}

    content = b"Photosynthesis is the process by which green plants create food from sunlight."
    files = {"file": ("biology_intro.txt", io.BytesIO(content), "text/plain")}
    data = {"title": "Introduction to Biology"}

    with patch("backend.api.lectures.process_lecture_background") as mock_pipeline:
        response = client.post("/api/lectures/upload", data=data, files=files, headers=headers)
        assert response.status_code == 201
        res_data = response.json()
        assert res_data["title"] == "Introduction to Biology"
        assert res_data["processing_status"] in ["uploaded", "extracting", "completed"]
        mock_pipeline.assert_called_once()


@pytest.mark.asyncio
async def test_ownership_isolation(client, seeded_users, test_db):
    """User B cannot access or delete User A's lecture."""
    # Seed a lecture belonging to the educator
    lec_doc = {
        "user_id": seeded_users["educator"]["id"],
        "title": "Private Educator Lecture",
        "original_filename": "lecture1.pdf",
        "file_type": "application/pdf",
        "file_size": 1024,
        "storage_path": "uploads/fake.pdf",
        "upload_date": datetime.utcnow(),
        "processing_status": "completed",
    }
    res = await test_db.lectures.insert_one(lec_doc)
    lecture_id = str(res.inserted_id)

    # 1. Student (User B) tries to GET the lecture -> 404
    student_headers = {"Authorization": f"Bearer {seeded_users['student']['token']}"}
    get_res = client.get(f"/api/lectures/{lecture_id}", headers=student_headers)
    assert get_res.status_code == 404

    # 2. Student tries to DELETE the lecture -> 404
    del_res = client.delete(f"/api/lectures/{lecture_id}", headers=student_headers)
    assert del_res.status_code == 404

    # 3. Owner (Educator) CAN access it -> 200
    educator_headers = {"Authorization": f"Bearer {seeded_users['educator']['token']}"}
    owner_res = client.get(f"/api/lectures/{lecture_id}", headers=educator_headers)
    assert owner_res.status_code == 200

    # 4. Admin CAN also access it -> 200
    admin_headers = {"Authorization": f"Bearer {seeded_users['admin']['token']}"}
    admin_res = client.get(f"/api/lectures/{lecture_id}", headers=admin_headers)
    assert admin_res.status_code == 200
