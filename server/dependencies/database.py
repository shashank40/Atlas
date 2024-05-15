from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import redis

SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/db-test"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
r = redis.Redis(host='localhost', port=6379, decode_responses=True)


def db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def redis_session():
    try:
        yield r
    finally:
        r.close()
