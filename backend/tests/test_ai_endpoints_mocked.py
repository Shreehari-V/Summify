# backend/tests/test_ai_endpoints_mocked.py

import pytest
from unittest.mock import patch
from datetime import datetime


@pytest.mark.asyncio
async def test_summary_and_keywords_retrieval(client, seeded_users, test_db):
    educator_id = seeded_users["educator"]["id"]
    headers = {"Authorization": f"Bearer {seeded_users['educator']['token']}"}

    # Seed lecture
    lec_res = await test_db.lectures.insert_one({
        "user_id": educator_id,
        "title": "Machine Learning Foundations",
        "original_filename": "ml.pdf",
        "file_type": "application/pdf",
        "file_size": 2048,
        "storage_path": "uploads/fake_ml.pdf",
        "upload_date": datetime.utcnow(),
        "processing_status": "completed",
    })
    lecture_id = str(lec_res.inserted_id)

    # Seed summary
    await test_db.summaries.insert_one({
        "lecture_id": lecture_id,
        "user_id": educator_id,
        "summary_text": "Machine learning enables systems to learn from data patterns without explicit programming.",
        "key_points": ["Supervised learning uses labeled data", "Unsupervised learning finds hidden patterns"],
        "model": "facebook/bart-large-cnn",
        "word_count": 12,
        "character_count": 92,
        "chunks_processed": 1,
        "created_at": datetime.utcnow(),
    })

    # Seed keywords
    await test_db.keywords.insert_one({
        "lecture_id": lecture_id,
        "user_id": educator_id,
        "keywords": [
            {"term": "supervised learning", "score": 0.85},
            {"term": "neural networks", "score": 0.72},
        ],
        "total_keywords": 2,
        "method": "tfidf",
        "created_at": datetime.utcnow(),
    })

    # 1. Fetch Summary
    sum_res = client.get(f"/api/lectures/{lecture_id}/summary", headers=headers)
    assert sum_res.status_code == 200
    assert "Machine learning enables" in sum_res.json()["summary_text"]
    assert len(sum_res.json()["key_points"]) == 2

    # 2. Fetch Keywords
    kw_res = client.get(f"/api/lectures/{lecture_id}/keywords", headers=headers)
    assert kw_res.status_code == 200
    assert kw_res.json()["total_keywords"] == 2


@pytest.mark.asyncio
async def test_flashcard_generation_mocked(client, seeded_users, test_db):
    """Test flashcard regeneration with mocked AI response to ensure 0 paid/external calls."""
    educator_id = seeded_users["educator"]["id"]
    headers = {"Authorization": f"Bearer {seeded_users['educator']['token']}"}

    lec_res = await test_db.lectures.insert_one({
        "user_id": educator_id,
        "title": "Cell Biology",
        "original_filename": "cell.txt",
        "file_type": "text/plain",
        "file_size": 512,
        "storage_path": "uploads/fake_cell.txt",
        "upload_date": datetime.utcnow(),
        "processing_status": "completed",
    })
    lecture_id = str(lec_res.inserted_id)

    await test_db.summaries.insert_one({
        "lecture_id": lecture_id,
        "user_id": educator_id,
        "summary_text": "Mitochondria produce ATP through cellular respiration in eukaryotic cells.",
        "key_points": ["Mitochondria are the powerhouse", "ATP is the energy currency"],
        "model": "facebook/bart-large-cnn",
        "created_at": datetime.utcnow(),
    })

    # Mocked 5 flashcards
    mock_cards = [
        {"id": f"card-{i}", "question": f"Question {i} about ATP?", "answer": f"Answer {i} regarding cell respiration.", "category": "Cell Biology"}
        for i in range(1, 6)
    ]

    with patch("backend.api.lectures.generate_flashcards_for_lecture") as mock_gen:
        mock_gen.return_value = {
            "id": "mock-flashcards-id",
            "lecture_id": lecture_id,
            "user_id": educator_id,
            "cards": mock_cards,
            "total_cards": 5,
            "model": "meta-llama/Llama-3.1-8B-Instruct",
            "created_at": datetime.utcnow(),
        }

        # Request 5 cards
        res = client.post(f"/api/lectures/{lecture_id}/generate-flashcards", json={"count": 5}, headers=headers)
        assert res.status_code == 200
        data = res.json()
        assert data["total_cards"] == 5
        assert len(data["cards"]) == 5


@pytest.mark.asyncio
async def test_educator_flashcard_deck_update_and_sharing(client, seeded_users, test_db):
    """Educators can edit existing cards, add new cards, save, and publicly share the deck."""
    educator_id = seeded_users["educator"]["id"]
    headers = {"Authorization": f"Bearer {seeded_users['educator']['token']}"}

    lec_res = await test_db.lectures.insert_one({
        "user_id": educator_id,
        "title": "Quantum Physics 101",
        "original_filename": "quantum.txt",
        "file_type": "text/plain",
        "file_size": 512,
        "storage_path": "uploads/fake_quantum.txt",
        "upload_date": datetime.utcnow(),
        "processing_status": "completed",
    })
    lecture_id = str(lec_res.inserted_id)

    # 1. Educator edits deck
    updated_cards = [
        {"id": "q1", "question": "What is superposition?", "answer": "A principle where a quantum system exists in multiple states simultaneously.", "category": "Principles"},
        {"id": "q2", "question": "What is entanglement?", "answer": "When two particles remain connected so actions on one affect the other.", "category": "Phenomena"},
    ]
    put_res = client.put(f"/api/lectures/{lecture_id}/flashcards", json={"cards": updated_cards}, headers=headers)
    assert put_res.status_code == 200
    assert put_res.json()["total_cards"] == 2

    # 2. Educator shares the deck
    share_res = client.post(f"/api/lectures/{lecture_id}/share", headers=headers)
    assert share_res.status_code == 200
    share_data = share_res.json()
    assert share_data["is_shared"] is True
    share_id = share_data["share_id"]

    # 3. Public Student retrieval without auth token
    public_res = client.get(f"/api/lectures/shared/{share_id}")
    assert public_res.status_code == 200
    pub_data = public_res.json()
    assert pub_data["lecture_title"] == "Quantum Physics 101"
    assert pub_data["total_cards"] == 2
    assert pub_data["cards"][0]["question"] == "What is superposition?"
