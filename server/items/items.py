from fastapi import APIRouter, Depends
from model import Item
from sqlalchemy.orm import Session

from dependencies.database import db_session
from dependencies.sql import get_items

router = APIRouter(
    prefix="/items",
    tags=["items"],
)


@router.get("/", response_model=list[Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(db_session)):
    items = get_items(db, skip=skip, limit=limit)
    return items