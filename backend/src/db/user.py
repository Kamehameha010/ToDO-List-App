from .client import DbContext
from ..scheme.user import SignUp


class User(DbContext):
    def __init__(self):
        super().__init__("User")

    async def register_user(self, user: SignUp):
        return await self.insert_async(user.model_dump())

