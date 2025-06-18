from typing import Any, Mapping

from ..config import settings
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorCursor


class DbContext:
    def __init__(self, collection_name: str):
        self._client = AsyncIOMotorClient(settings.mongo_uri)
        self._db = self._client.get_database(settings.mongo_database)
        self._collection = self._db.get_collection(collection_name)

    async def insert_async(self, entity: dict) -> str:
        return (await self._collection.insert_one(entity)).inserted_id

    async def update_async(self, _filter: Mapping[str, Any], entity: Mapping[str, Any]):
        return await self._collection.update_one(_filter, {"$set": entity})

    async def delete_async(self, _filter: Mapping[str, Any]):
        return await self._collection.delete_one(_filter)

    async def get_async(self, _filter: Mapping[str, Any]):
        return await self._collection.find_one(_filter)

    async def get_all_async(self, _filter: Mapping[str, Any]) -> AsyncIOMotorCursor:
        return self._collection.find(_filter)

    def __del__(self):
        if self._client:
            self._client.close()
