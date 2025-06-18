import asyncio

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from src.db.user import User as UserDb
from src.main import app


@pytest_asyncio.fixture(scope='session')
def event_loop():
    loop = asyncio.get_event_loop()
    yield loop

@pytest_asyncio.fixture(scope='session')
async def async_client() -> AsyncClient:
    return AsyncClient(transport=ASGITransport(app=app), base_url='http://localhost:8000')

@pytest_asyncio.fixture(scope="function", autouse=True)
async def cleanup_user():
    db = UserDb()
    await db.delete_async({ "email": MOCK_SINGUP["email"] })
    yield
    await db.delete_async({ "email": MOCK_SINGUP["email"] })
    

MOCK_SINGUP = {
    "name": "John Doe",
    "email": "johnDoe@gmail.com",
    "password": "abcd1234"
}

MOCK_LOGIN = {
    "email": "johnDoe@gmail.com",
    "password": "abcd1234"
}

@pytest.mark.asyncio
async def test_sign_up(async_client: AsyncClient):

    response = await async_client.post("/v1/register", json=MOCK_SINGUP)

    assert response.status_code == 200
    assert "token" in response.json()

@pytest.mark.asyncio
async def test_try_sign_up_with_duplicate_email(async_client: AsyncClient):

    response = await async_client.post("/v1/register", json=MOCK_SINGUP)

    assert response.status_code == 400
    assert "message" in response.json()
    assert response.json()["message"] == "Email johnDoe@gmail.com already exists."

@pytest.mark.asyncio
async def test_log_in(async_client: AsyncClient):
    response = await async_client.post('/v1/login', json=MOCK_LOGIN)

    assert response.status_code == 200
    assert "token" in response.json()
    assert "expiration" in response.json()

@pytest.mark.asyncio
async def test_log_in_with_not_valid_credential(async_client:AsyncClient):
    MOCK_LOGIN_INVALID = {
        "password": "wrongPassword",
        **MOCK_LOGIN
    }

    response = await async_client.post("/v1/login", json=MOCK_LOGIN_INVALID)

    assert response.status_code == 401
