import sentry_sdk
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.v1.auth import access_router
from .routes.v1.tasks import task_router
from .routes.v1.user import user_router
from .config import settings

sentry_sdk.init(
    dsn=settings.sentry_dsn,
    # Add data like request headers and IP for users,
    # see https://docs.sentry.io/platforms/python/data-management/data-collected/ for more info
    send_default_pii=True,
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for tracing.
    traces_sample_rate=1.0,
    # Set profile_session_sample_rate to 1.0 to profile 100%
    # of profile sessions.
    profile_session_sample_rate=1.0,
    # Set profile_lifecycle to "trace" to automatically
    # run the profiler on when there is an active transaction
    profile_lifecycle="trace",
)
app = FastAPI()

app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)

app.include_router(access_router)
app.include_router(task_router)
app.include_router(user_router)
