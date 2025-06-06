from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)


# def test_sign_up():

#     response = client.post("/v1/register", json={
#         "name": "John Doe",
#         "email": "johnDoe@gmail.com",
#         "password": "abcd1234"
#     })

#     assert response.status_code == 201
#     assert "token" in response.json()


# def test_try_sign_up_with_duplicate_email():

#     response = client.post("/v1/register", json={
#         "name": "John Doe",
#         "email": "johnDoe@gmail.com",
#         "password": "abcd1234"
#     })

#     assert response.status_code == 400
#     assert "message" in response.json()
#     assert response.json()["message"] == "Email johnDoe@gmail.com already exists."


def test_log_in():

    response = client.post("/v1/login", json={
        "email": "johnDoe@gmail.com",
        "password": "abcd1234"
    })

    assert response.status_code == 200
    assert "token" in response.json()
    #assert "refresh_token" in response.json()