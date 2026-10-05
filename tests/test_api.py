"""Tests de l'API FastAPI."""
from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_index():
    response = client.get("/")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]


def test_static_files():
    for name in ("app.js", "style.css"):
        assert client.get(f"/static/{name}").status_code == 200


def test_categories():
    categories = client.get("/api/categories").json()
    assert len(categories) == 9


def test_unknown_exercise():
    assert client.get("/api/exercise/inexistant").status_code == 404


def test_run_addition():
    response = client.post("/api/run", json={
        "exercise_id": "addition",
        "code": "def add(a, b):\n    return a + b\n",
    })
    data = response.json()
    assert data["success"]
    assert any(t["hidden"] for t in data["tests"])
