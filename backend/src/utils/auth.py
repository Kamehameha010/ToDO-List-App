from datetime import datetime, timedelta, timezone
from typing import Any, Mapping
import jwt
from passlib.context import CryptContext
from ..db.user import User as UserDb
from ..config import settings

class AuthUtils:
    _pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    _user_db = UserDb()
    
    def _verify_pwd_hash(self, password: str, hash:str) -> bool:
        return self._pwd_context.verify(password, hash)
    
    def get_password_hash(self, password: str) -> str:
        return self._pwd_context.hash(password)
    
    async def exists_user(self, email: str) -> bool:
        return (await self._user_db.get_async({"email": email})) is not None
            
    async def authenticate_user(self, email: str, password: str) -> Mapping[str, Any]:
        if not (user:=await self._user_db.get_async({"email": email})):
            return None
        return user if self._verify_pwd_hash(password, user.get("password")) else None
    

    def create_access_token(self, claims: dict, expires_delta: timedelta | None = None):
        to_encode = claims.copy()
        if expires_delta:
            expire = datetime.now(timezone.utc) + expires_delta
        else:
            expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        now = datetime.now(timezone.utc)

        to_encode.update({"iat": now.timestamp() ,"exp": expire.timestamp(), "iss": settings.domain_url, "aud": f"{settings.domain_url}/v1" })
        
        encoded_jwt = jwt.encode(to_encode, key=settings.jwt_secret_key, algorithm=settings.jwt_algorithm )
        return encoded_jwt
    


