from .client import DbContext
from ..scheme.user import SignUp, Profile

class User(DbContext):
    def __init__(self):
        super().__init__("User")

    async def register_user(self, user: SignUp):
        return await self.insert_async(user.model_dump())
    
    async def get_me_profile(self, email: str):
        user = await self.get_async({"email": email})
        if not user:
            return None
        return Profile(email=user["email"], name=user["name"])
