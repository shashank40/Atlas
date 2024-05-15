from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from model import User, Item, ItemCreate

from dependencies.auth import get_current_active_user
from dependencies.database import db_session
from sqlalchemy.orm import Session
from dependencies.sql import create_user_item, get_users, get_user, get_items_for_user

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router.get("/me/", response_model=User)
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user


@router.get("/me/items/", response_model=list[Item])
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)], db: Session = Depends(db_session)
):
    return get_items_for_user(current_user.username , db)


@router.get("/", response_model=list[User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(db_session)):
    users = get_users(db, skip=skip, limit=limit)
    return users


@router.get("/{username}", response_model=User)
def read_user(username: str, db: Session = Depends(db_session)):
    db_user = get_user(db, username=username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.post("/add/item", response_model=Item)
def create_item_for_user(
     current_user: Annotated[User, Depends(get_current_active_user)] , item: ItemCreate, db: Session = Depends(db_session)
):  
    user_id = get_user(db, current_user.username).id
    return create_user_item(db=db, item=item, user_id=user_id)