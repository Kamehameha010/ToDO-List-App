import os
from pydantic_settings import BaseSettings



class Config(BaseSettings):
    mongo_uri: str = os.getenv("MONGO_URI")
    mongo_database:str = os.getenv("MONGO_DBNAME")
    app_title: str = os.getenv("APP_TITLE")
    env: str = os.getenv("ENV")
    jwt_secret_key: str = os.getenv("SECRET_KEY")
    jwt_algorithm: str = "HS512"
    domain_url:str = os.getenv("DOMAIN_URL")
    sentry_dsn: str = os.getenv("SENTRY_DSN")
    sentry_env: str = os.getenv("SENTRY_ENV")


settings = Config()
