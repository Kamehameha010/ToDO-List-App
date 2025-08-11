# ToDoList Frontend

This is the frontend for the [ToDo List API exercise](https://roadmap.sh/projects/todo-list-api), built with React, Vite, and Tailwind CSS. It provides a modern UI for user authentication and personal task management.

# Tech Stack

- React
- Vite
- Tailwind CSS
- TypeScript

## Configuration

- Ensure the backend is running at `http://localhost:8000` (see [backend README](../backend/README.md)).
- Set the backend domain in `src/config.ts` if needed.

## Environment Variables

- `.env.local` — You can set the following (defaults are usually fine for local dev):
	- `VITE_API_URL` — Backend API URL (e.g., `http://localhost:8000`)
	- `VITE_SENTRY_DSN` — Sentry DSN for error tracking (optional)
	- `VITE_SENTRY_ENV` — Sentry environment (e.g., `dev`, `prod`) (optional)


## Running the App

Install dependencies and start the development server:

```sh
pnpm install
pnpm dev
```

The app will be available at `http://localhost:5173`

---

See the [backend README](../backend/README.md) for API endpoints and backend setup.
