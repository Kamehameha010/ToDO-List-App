from datetime import datetime
from enum import StrEnum, auto

from pydantic import BaseModel, Field, field_validator

from .custom import PydanticObjectId


class TaskPriority(StrEnum):
    High = auto()
    Medium = auto()
    Low = auto()


class TaskBase(BaseModel):
    title: str = Field(default_factory="")
    description: str = Field(default_factory="")
    priority: TaskPriority = Field(default=TaskPriority.Low)


class CreateTask(TaskBase):
    created_at: int | None = Field(default=int(datetime.now().timestamp()))
    created_by: str | None = Field(default=None)


class UpdateTask(TaskBase):
    updated_at: int | None = Field(default=int(datetime.now().timestamp()))

class Task(TaskBase):
    id: PydanticObjectId = Field(alias="_id")
