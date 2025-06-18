from typing import Annotated

from fastapi import APIRouter, Body, Depends
from fastapi.responses import JSONResponse
from starlette.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
)

from ...db.user import User as UserDb
from ...scheme.user import LogIn, SignUp
from ...utils.auth import _auth_util, AuthUtils

access_router = APIRouter(
    prefix="/v1",
)


@access_router.post("/register", tags=["Access"])
async def register(
    sign_up: Annotated[SignUp, Body(...)],
    auth_util: Annotated[AuthUtils, Depends(_auth_util)],
    userDb: Annotated[UserDb, Depends(UserDb)]
):
    
    if  (await auth_util.exists_user(sign_up.email)):
        return JSONResponse(
            {"message": f"Email {sign_up.email} already exists."},
            status_code=HTTP_400_BAD_REQUEST,
        )

    sign_up.password = auth_util.get_password_hash(sign_up.password)

    _ = await userDb.register_user(sign_up)

    token, expire = auth_util.create_access_token({"sub": sign_up.email, "email": sign_up.email})

    return JSONResponse({"token": token, "expiration": expire})


@access_router.post("/login", tags=["Access"])
async def log_in(
    log_in: Annotated[LogIn, Body(...)],
    auth_util: Annotated[AuthUtils, Depends(_auth_util)],
):
    
    user = await auth_util.authenticate_user(log_in.email, log_in.password)
    
    if not user:
        return JSONResponse(
            {"message": "Credentials incorrect.Try again"},
            status_code=HTTP_401_UNAUTHORIZED,
        )
    token, expire = auth_util.create_access_token({"sub": log_in.email, "email": log_in.email})

    return JSONResponse({"token": token, "expiration": expire})
