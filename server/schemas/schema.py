from sqlalchemy import Column, ForeignKey, Integer, String, UUID
from sqlalchemy.orm import relationship, Mapped
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects import postgresql
import uuid

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id: Mapped[UUID] = Column(
        postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    username = Column(String, index=True, unique=True)
    full_name = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    ## its just a relationship and not a column. It just means i can fetch items by doing User.items. It will be lazy loaded
    items = relationship("Item", back_populates="owner")


class Item(Base):
    __tablename__ = "items"

    id: Mapped[UUID] = Column(
        postgresql.UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    title = Column(String, index=True)
    description = Column(String, index=True)
    owner_id = Column(postgresql.UUID(as_uuid=True), ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")
