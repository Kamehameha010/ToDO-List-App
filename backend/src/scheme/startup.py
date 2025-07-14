from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi_limiter import FastAPILimiter
import redis.asyncio as rd


@asynccontextmanager
async def lifespan(app: FastAPI):
    redis = rd.Redis()
    await FastAPILimiter.init(redis)
    yield
    redis.close()
