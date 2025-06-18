import os
from pydantic_settings import BaseSettings



class Config(BaseSettings):
    mongo_uri: str = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    mongo_database:str = os.getenv("MONGO_DBNAME", "Todo")
    app_title: str = os.getenv("APP_TITLE", "Todo List API")
    env: str = os.getenv("ENV", "dev")
    jwt_secret_key: str = os.getenv("SECRET_KEY", "test_phrase")
    jwt_algorithm: str = "HS512"
    domain_url:str = os.getenv("DOMAIN_URL", "http://localhost:8000")
    sentry_dsn: str = os.getenv("SENTRY_DSN", "")

    

settings = Config()
