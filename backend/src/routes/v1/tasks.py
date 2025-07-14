import json
from datetime import datetime
from typing import Annotated, Any, AsyncGenerator

from bson import ObjectId
from fastapi import APIRouter, Depends, Query, Response
from fastapi.security import HTTPBearer
from fastapi_limiter.depends import RateLimiter
from fastapi_pagination import Params, set_params
from fastapi_pagination.ext.motor import apaginate
from starlette.status import HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND

from ...db.task import Task as TaskDb
from ...scheme.task import CreateTask, Task, TaskFilter, TaskStatus, UpdateTask
from ...utils.security import JwtSecurity, jwt_security

oauth_scheme = HTTPBearer()

task_router = APIRouter(
    prefix="/v1/tasks",
    dependencies=[Depends(jwt_security), Depends(RateLimiter(times=10, seconds=10))],
    tags=["Task"],
)


async def db_context() -> AsyncGenerator[TaskDb, Any]:
    task_db = TaskDb()
    try:
        yield task_db
    finally:
        del task_db


@task_router.get("/")
async def get_tasks(
    filters: Annotated[TaskFilter, Query()],
    task_db: Annotated[TaskDb, Depends(db_context)],
    jwt_details: Annotated[JwtSecurity, Depends(jwt_security)],
):
    query = {
        "created_by": jwt_details["email"],
        "title": {"$regex": filters.q, "$options": "i"},
    }

    if filters.status != "all":
        query.update({"status": filters.status})

    set_params(Params(page=filters.page, size=filters.size))

    return await apaginate(
        task_db._collection,
        query,
        transformer=lambda items: [Task(**item) for item in items]
    )


@task_router.post("/")
async def create_task(
    task: CreateTask,
    task_db: Annotated[TaskDb, Depends(db_context)],
    jwt_details: Annotated[JwtSecurity, Depends(jwt_security)],
):
    task_deserailize = task.model_dump()
    task_deserailize.update(
        {
            "created_by": jwt_details["email"],
            "updated_at": int(datetime.now().timestamp()),
        }
    )
    task_id = await task_db.insert_async(task_deserailize)
    new_task = Task(**task_deserailize, id=str(task_id))
    return new_task


@task_router.put("/{task_id}")
async def update_task(
    task_id: str,
    task: UpdateTask,
    task_db: Annotated[TaskDb, Depends(db_context)],
    jwt_details: Annotated[JwtSecurity, Depends(jwt_security)],
):
    _task = await task_db.get_async(
        {"_id": ObjectId(task_id), "created_by": jwt_details["email"]}
    )
    if not _task:
        return Response(
            content=json.dumps({"message": f"{task_id} not found"}),
            status_code=HTTP_404_NOT_FOUND,
        )

    _ = await task_db.update_async(
        {"_id": ObjectId(task_id), "created_by": jwt_details["email"]},
        task.model_dump(),
    )

    updated_task = {"_id": task_id, **task.model_dump()}

    return updated_task


@task_router.put("/{task_id}/status/{status}")
async def update_task_status(
    task_id: str,
    status: TaskStatus,
    task_db: Annotated[TaskDb, Depends(db_context)],
    jwt_details: Annotated[JwtSecurity, Depends(jwt_security)],
):
    task = await task_db.get_async(
        {"_id": ObjectId(task_id), "created_by": jwt_details["email"]}
    )

    if not task:
        return Response(
            content=json.dumps({"message": f"{task_id} not found"}),
            status_code=HTTP_404_NOT_FOUND,
        )

    _ = await task_db.update_async(
        {"_id": ObjectId(task_id), "created_by": jwt_details["email"]},
        {"status": status},
    )

    return {"_id": task_id, "status": status}


@task_router.delete("/{task_id}")
async def delete_task(
    task_id: str,
    task_db: Annotated[TaskDb, Depends(db_context)],
    jwt_details: Annotated[JwtSecurity, Depends(jwt_security)],
):
    task = await task_db.get_async(
        {"_id": ObjectId(task_id), "created_by": jwt_details["email"]}
    )
    if not task:
        return Response(
            content=json.dumps({"message": f"{task_id} not found"}),
            status_code=HTTP_404_NOT_FOUND,
        )

    _ = await task_db.delete_async(
        {"_id": ObjectId(task_id), "created_by": jwt_details["email"]}
    )

    return Response(status_code=HTTP_204_NO_CONTENT)


@task_router.get("/stats")
async def get_task_stats(
    task_db: Annotated[TaskDb, Depends(db_context)],
    jwt_details: Annotated[JwtSecurity, Depends(jwt_security)],
):
    tasks_stats = await task_db.get_task_stats_counter(jwt_details["email"])

    total_tasks = sum([stat["count"] for stat in tasks_stats])

    tasks_stats_dict = {stat["status"]: stat["count"] for stat in tasks_stats}

    tasks_stats_dict.update({"total_tasks": total_tasks})

    return {"summary": tasks_stats_dict}
