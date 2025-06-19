from pydantic import BaseModel


class User(BaseModel):
    email: str


class SignUp(User):
    name: str
    password: str

class LogIn(User):
    password: str


class Profile(User):
    name: str | None = None
    email: str | None = None