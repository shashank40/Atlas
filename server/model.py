from pydantic import EmailStr, BaseModel
from typing import Optional, Union
from uuid import UUID
from fastapi_camelcase import CamelModel

def to_camelcase(string: str) -> str:
    res = ''.join(word.capitalize() for word in string.split('_'))
    return res[0].lower() + res[1:]


class ItemBase(CamelModel):
    title: str
    description: Union[str, None] = None


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: UUID
    owner_id: UUID

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str
    username: str


class TokenData(BaseModel):
    username: Optional[str] = None


class User(CamelModel):
    full_name: str
    email: EmailStr
    username: str

    class Config:
        orm_mode = True


class UserIn(User):
    password: str


class UserInDB(User):
    hashed_password: str
    items: list[Item] = []

    class Config:
        orm_mode = True
