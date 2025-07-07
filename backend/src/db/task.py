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

    async def get_task_stats_counter(self, created_by: str):
        stats = await self._collection.aggregate(
            [
                {"$match": {"created_by": created_by}},
                {"$group": {"_id": "$status", "count": {"$sum": 1}}},
                {"$project": {"_id": 0, "status": "$_id", "count": 1}},
            ]
        ).to_list(2)

        return stats

    
