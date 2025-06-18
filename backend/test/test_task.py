import asyncio
import pytest
from src.main import app
from httpx import AsyncClient, ASGITransport
import pytest_asyncio
from src.db.task import Task as TaskDb

@pytest_asyncio.fixture(scope='session')
def event_loop():
    loop = asyncio.get_event_loop()
    yield loop

@pytest_asyncio.fixture(scope='session')
async def async_client() -> AsyncClient:
    return AsyncClient(transport=ASGITransport(app=app), base_url='http://localhost:8000', headers={"Authorization": "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2VsQGdtYWlsLmNvbSIsImVtYWlsIjoiam9lbEBnbWFpbC5jb20iLCJpYXQiOjE3NTAyMzI0MDMuMzMzLCJleHAiOjE3NTAyMzMzMDMuMzMyOTksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJ9.b_2prlsHcBBLNsdIAimi0wwLmxX0RpuGjs8q21U96ZMQM0xKE8hCK6qQvp_ZRboZt3rITUGMsG48ChmsC3tvCg"})
    

@pytest_asyncio.fixture(scope="function", autouse=True)
async def cleanup_tasks():
    # Limpiar la colección antes y después de cada test
    db = TaskDb()
    await db._collection.delete_many({})
    yield
    await db._collection.delete_many({})

MOCK_TASK = {
    "title": "Mock Task",
    "description": "Mock Description",
    "priority": "low"
}

@pytest.mark.asyncio
async def test_create_task(async_client: AsyncClient):
    
    response = await async_client.post("/v1/tasks/", json=MOCK_TASK)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == MOCK_TASK["title"]
    assert "_id" in data

@pytest.mark.asyncio
async def test_get_tasks(async_client: AsyncClient):
    
    await async_client.post("/v1/tasks/", json=MOCK_TASK)
    response = await async_client.get("/v1/tasks/")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert any(task["title"] == MOCK_TASK["title"] for task in data)

@pytest.mark.asyncio
async def test_update_task(async_client: AsyncClient):
    
    create_resp = await async_client.post("/v1/tasks/", json=MOCK_TASK)
    task_id = create_resp.json()["_id"]
    update_payload = {"title": "Updated Title", "description": "desc", "priority": "high"}
    update_resp = await async_client.put(f"/v1/tasks/{task_id}", json=update_payload)
    assert update_resp.status_code == 200
    updated = update_resp.json()
    assert updated["title"] == "Updated Title"

@pytest.mark.asyncio
async def test_delete_task(async_client: AsyncClient):
    
    create_resp = await async_client.post("/v1/tasks/", json=MOCK_TASK)
    task_id = create_resp.json()["_id"]
    delete_resp = await async_client.delete(f"/v1/tasks/{task_id}")
    assert delete_resp.status_code == 204
    delete_resp_2 = await async_client.delete(f"/v1/tasks/{task_id}")
    assert delete_resp_2.status_code == 404

