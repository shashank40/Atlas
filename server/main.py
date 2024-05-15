from datetime import timedelta
from typing import Annotated, Any

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from model import Token, UserInDB, UserIn, User
from dependencies.auth import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    authenticate_user,
    create_access_token,
    get_password_hash,
)
from users import users
from dependencies.sql import add_user
from dependencies.database import db_session, redis_session
from sqlalchemy.orm import Session
from dependencies.auth import get_current_user_logout_details, credentials_exception
from fastapi.middleware.cors import CORSMiddleware

from redis import Redis

origins = ["*"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(users.router)


@app.post("/signup", tags=["signup"], response_model=User)
async def user_signup(form_data: UserIn, db: Session = Depends(db_session)) -> Any:
    print(form_data)
    user = UserInDB(
        username=form_data.username,
        email=form_data.email,
        full_name=form_data.full_name,
        hashed_password=get_password_hash(form_data.password),
    )
    db_user = add_user(user, db)
    return db_user


@app.post("/logout", tags=["logout"])
async def logout_user(
    current_user: User = Depends(get_current_user_logout_details),
    redis_session: Redis = Depends(redis_session),
) -> None:
    redis_session.set(current_user["username"], current_user["token"], ex=30 * 60)

@app.post("/verify-token", tags=["verify-token"])
async def verify_token(
    current_user: User = Depends(get_current_user_logout_details),
    redis_session: Redis = Depends(redis_session),
) -> None:
    if redis_session.get(current_user["username"]) == current_user["token"]:
        raise credentials_exception


@app.post("/token", tags=["login"])
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(db_session),
) -> Token:
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer", username=user.username)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, port=8000)
