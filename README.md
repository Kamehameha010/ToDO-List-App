# TODO LIST APP

This project is a full-stack implementation of the classic [ToDo List API exercise](https://roadmap.sh/projects/todo-list-api). It allows users to register, log in, and manage their personal tasks securely. Authentication is handled using JWT tokens stored in cookies for a seamless and secure experience between frontend and backend.


## Features
- User registration and login
- JWT authentication via cookies
- Create, read, update, and delete tasks (CRUD)
- Mark tasks as completed or pending
- Filter and search tasks by status or keyword
- Responsive and modern UI

## Tech Stack
- **Backend:** FastAPI (Python), MongoDB (Motor), Sentry (optional)
- **Frontend:** React, Vite, Tailwind CSS, Sentry (optional)

## Project Structure
```
ToDO-List-App/
│
├── [backend](backend/README.md)/   # FastAPI backend (API, DB, Auth, Tests)
│   └── src/
│       ├── config.py
│       ├── main.py
│       ├── db/
│       ├── routes/
│       ├── scheme/
│       ├── utils/
│       └── test/
│
├── [frontend](frontend/README.md)/  # React frontend (UI, Services, Hooks)
│   └── src/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── reducer/
│       ├── routes/
│       └── services/
│
└── README.md  # Project documentation
```

- [Backend README](backend/README.md) — FastAPI ToDo API and authentication
- [Frontend UI README](frontend/README.md) — Preact + Vite web interface

---

See each subproject's README for setup, environment variables, and usage instructions.