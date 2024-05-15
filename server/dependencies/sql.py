from model import UserInDB, ItemCreate
from fastapi import HTTPException, status

from sqlalchemy.orm import Session
from schemas.schema import User, Item

from uuid import UUID


fake_users_db = {}

def get_user(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()
    

def add_user(user: UserInDB, db: Session):
    check_user = get_user(db, user.username)
    if check_user:
        return HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")
    db_user = User(email=user.email, hashed_password=user.hashed_password, username=user.username, full_name=user.full_name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Item).offset(skip).limit(limit).all()


def get_items_for_user(username: str, db: Session) -> list[Item]:
    user_id = get_user(db, username).id
    return db.query(Item).filter(Item.owner_id == user_id).all()


def create_user_item(db: Session, item: ItemCreate, user_id: UUID):
    db_item = Item(**item.model_dump(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
