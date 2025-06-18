import json
from datetime import datetime
from typing import Annotated, Any, AsyncGenerator

from bson import ObjectId
from fastapi import APIRouter, Depends, Response
from fastapi.security import HTTPBearer
from starlette.status import HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND

from ...db.task import Task as TaskDb
from ...scheme.task import CreateTask, Task, UpdateTask
from ...utils.security import JwtSecurity, jwt_security

oauth_scheme = HTTPBearer()

task_router = APIRouter(prefix="/v1/tasks", dependencies=[Depends(jwt_security)], tags=["Task"])


async def db_context() -> AsyncGenerator[TaskDb, Any]:
    task_db = TaskDb()
    try:
        yield task_db
    finally:
        del task_db


@task_router.get("/")
async def get_tasks(
    task_db: Annotated[TaskDb, Depends(db_context)],
    jwt_details: Annotated[JwtSecurity, Depends(jwt_security)],
):
    return await task_db.get_tasks({"created_by": jwt_details["email"]})


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
    result = await task_db.update_async(
        {"_id": ObjectId(task_id), "created_by": jwt_details["email"]},
        task.model_dump(),
    )

    if result.matched_count < 1:
        return Response(
            content=json.dumps({"message": f"{task_id} not found"}),
            status_code=HTTP_404_NOT_FOUND,
        )
    updated_task = {"_id":task_id, **task.model_dump()}

    return updated_task



@task_router.delete("/{task_id}")
async def delete_task(
    task_id: str,
    task_db: Annotated[TaskDb, Depends(db_context)],
    jwt_details: Annotated[JwtSecurity, Depends(jwt_security)],
):
    task_deleted = await task_db.delete_async(
        {"_id": ObjectId(task_id), "created_by": jwt_details["email"]}
    )

    if task_deleted.deleted_count < 1:
        return Response(
            content=json.dumps({"message": f"{task_id} not found"}),
            status_code=HTTP_404_NOT_FOUND,
        )

    return Response(status_code=HTTP_204_NO_CONTENT)
