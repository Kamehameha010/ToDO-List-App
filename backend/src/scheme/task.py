from datetime import datetime
from enum import StrEnum, auto

from pydantic import BaseModel, Field

from .custom import PydanticObjectId


class TaskPriority(StrEnum):
    High = auto()
    Medium = auto()
    Low = auto()

class TaskStatus(StrEnum):
    Active = auto()
    Done = auto()


class TaskBase(BaseModel):
    title: str = Field(default_factory="")
    description: str = Field(default_factory="")
    priority: TaskPriority = Field(default=TaskPriority.Low)
    status: TaskStatus = Field(default=TaskStatus.Active)


class CreateTask(TaskBase):
    created_at: int | None = Field(default=int(datetime.now().timestamp()))
    created_by: str | None = Field(default=None)


class UpdateTask(TaskBase):
    updated_at: int | None = Field(default=int(datetime.now().timestamp()))

class Task(TaskBase):
    id: PydanticObjectId = Field(alias="_id")
