from pydantic import BaseModel, Field


class Task(BaseModel):
    id: str = Field(default_factory="")
    title: str = Field(default_factory="")
    description: str = Field(default_factory="")
