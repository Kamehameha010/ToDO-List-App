# ToDoList Backend

This is the backend service for the ToDoList application. It provides a RESTful API for managing users and tasks.

## Tech Stack
- Python 3.13+
- FastAPI
- MongoDB (via Motor)

## Project Structure
```
backend/
  src/
    config.py         # Configuration settings
    main.py           # FastAPI app entry point
    db/               # Database client and models
    routes/           # API routes (v1/auth, v1/tasks)
    scheme/           # Pydantic models (schemas)
    utils/            # Utility functions (e.g., auth)
    test/             # Backend tests
  pyproject.toml      # Project dependencies
```

## Getting Started

### Prerequisites
- Python 3.13 or higher
- MongoDB instance (local or cloud)

### Installation
Install dependencies using pip and pyproject.toml:
   ```sh
   pip install .
   ```

### Configuration
Set the following environment variables (in `src/config.py` or a `.env` file):
- `MONGODB_URL`: MongoDB connection string
- `SECRET_KEY`: Secret key for JWT authentication
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time (minutes)

### Running the Server
Start the server with Uvicorn:
```sh
uvicorn src.main:app --reload

or

chmod +x ./run.sh
./run.sh
```
The API will be available at `http://localhost:8000` by default.

### Running Tests
```sh
pytest src/test/
```

## API Endpoints
Auth
- `/v1/register` - Register new user
- `/v1/login`    - Authenticate user

