
from .client import DbContext
from ..scheme.task import Task as TaskScheme

class Task(DbContext):
    def __init__(self):
        super().__init__("Task")

    async def get_tasks(self, _filter) -> list[TaskScheme]:
        tasks = []
        results = await self.get_all_async(_filter)
        async for task in results:
            tasks.append(TaskScheme(**task))
        return tasks
