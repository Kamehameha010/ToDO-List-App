

# ToDoList Backend

This is the backend for the [ToDo List API exercise](https://roadmap.sh/projects/todo-list-api). It provides a RESTful API for user authentication and personal task management, using JWT authentication via cookies for secure session handling.


## Features
- User registration and login
- JWT authentication via cookies
- Create, read, update, and delete tasks (CRUD)
- Mark tasks as completed or pending
- Filter and search tasks by status or keyword

## Tech Stack
- Python 3.13+
- FastAPI
- MongoDB (Motor)


## Project Structure
```
backend/
  src/
    config.py         # Configuration
    main.py           # FastAPI app
    db/               # DB models and client
    routes/           # API routes (v1/auth, v1/tasks)
    scheme/           # Pydantic schemas
    utils/            # Utilities (auth, security)
    test/             # Backend tests
  pyproject.toml      # Dependencies
  README.md           # Backend documentation
```


## Getting Started


### Prerequisites
- Python 3.13+
- MongoDB
- Redis


### Installation
```sh
pip install .
```



### Configuration
Set environment variables (in `.env` or `src/config.py`):

- `MONGO_URI`        : MongoDB connection string (default: `mongodb://localhost:27017`)
- `MONGO_DBNAME`     : MongoDB database name (default: `Todo`)
- `APP_TITLE`        : Application title (default: `Todo List API`)
- `ENV`              : Environment (e.g., `dev`, `prod`) (default: `dev`)
- `SECRET_KEY`       : JWT secret key (default: `test_phrase`)
- `DOMAIN_URL`       : Backend domain URL (default: `http://localhost:8000`)
- `SENTRY_DSN`       : Sentry DSN for error tracking (default: example DSN)
- `SENTRY_ENV`       : Sentry environment (default: `dev`)


### Running the Server
```sh
uvicorn src.main:app --reload
# or
chmod +x ./run.sh
./run.sh
```
API available at `http://localhost:8000`


### Running Tests
```sh
pytest src/test/
```

## API Endpoints


### Auth
- `POST /v1/register` — Register a new user

- `POST /v1/login` — User login (returns JWT in cookie and JSON)


### User
- `GET /v1/users/me/profile` — Get the authenticated user's profile



### Tasks (require authentication)
- `GET /v1/tasks/` — List tasks (supports filters: `q` for search, `status`, `page`, `size` for pagination)
- `POST /v1/tasks/` — Create a new task (requires JSON body)

- `PUT /v1/tasks/{task_id}` — Update a task (requires JSON body)
- `PUT /v1/tasks/{task_id}/status/{status}` — Update only the status of a task

- `DELETE /v1/tasks/{task_id}` — Delete a task by ID
