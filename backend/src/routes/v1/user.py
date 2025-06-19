from typing import Annotated

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from starlette.status import HTTP_404_NOT_FOUND

from ...db.user import User as UserDb
from ...utils.security import JwtSecurity, jwt_security

user_router = APIRouter(
    prefix="/v1/users", dependencies=[Depends(jwt_security)], tags=["User"]
)


@user_router.post(
    "/me/profile",
    summary="Get user profile",
)
async def get_me_profile(
    userDb: Annotated[UserDb, Depends(UserDb)],
    jwt_details: Annotated[JwtSecurity, Depends(jwt_security)],
):
    profile = await userDb.get_me_profile(jwt_details["email"])

    if not profile:
        return JSONResponse(
            {"message": "User not found."},
            status_code=HTTP_404_NOT_FOUND,
        )

    return profile.model_dump()
