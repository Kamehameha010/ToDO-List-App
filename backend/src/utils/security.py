from typing import Optional
from fastapi import HTTPException, Request
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from starlette.status import HTTP_403_FORBIDDEN
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from ..config import settings
from .typing import Result


class JwtSecurity(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JwtSecurity, self).__init__(auto_error=auto_error)

    async def __call__(
        self, request: Request
    ) -> Optional[HTTPAuthorizationCredentials]:
        credentials: HTTPAuthorizationCredentials = await super(
            JwtSecurity, self
        ).__call__(request)

        if credentials:
            result = self.__verify_jwt(credentials.credentials)
            if not result.is_success:
                raise HTTPException(status_code=HTTP_403_FORBIDDEN, detail=result.error)
            return result.data

    def __verify_jwt(self, jwt_token: str) -> Result:
        return self.__decode_token(jwt_token)

    def __decode_token(self, token: str) -> Result:
        try:
            return Result(
                data=jwt.decode(
                    token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm]
                ),
                is_success=True,
                error=None,
            )
        except ExpiredSignatureError:
            return Result(
                data=None, is_success=False, error={"message": "Signture has expired."}
            )
        except InvalidTokenError as e:
            print(e)
            return Result(
                data=None, is_success=False, error={"message": "Invalid token."}
            )


jwt_security = JwtSecurity()
