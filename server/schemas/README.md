## Alembic Migrations

NOTE : If Schemas and Base are in same file then importing just Base.metadata in env.py would work fine
ex: target_metadata = Base.metadata

BUTT if Base and schemas are in diff file then ex : target_metadata = list(
    {
        m.metadata
        for m in [
            Base,
            Model1,
            Model2,
        ]
    }
)

# Commands

1) alembic revision -m "Added XYZ" > This is to create a revision
2) alembic upgrade head > to apply latest migration to db
3) alembic upgrade +1 > Relative migration(so would go 1 above the current migration)
4) alembic downgrade -1 > Relative migration(so would go 1 below the current migration)
5) alembic downgrade base > Would go to the base migration
6) alembic history > to get list of migrations
7) alembic current > to get current revision version
8) alembic revision --autogenerate -m "Added XYZ" > to auto generate revisions from SQLAlchemy models

## Postgres connection

Using psql cli

1) \dt > list tables


## Docker command

# Postgres

1) docker exec -it container_name psql -U postgres -d dbname
This is to exec into container with psql command and then run things on DB inside container

# Redis
1) docker exec -it redis redis-cli


## PYTHONPATH MISCONFIGURATION
export PYTHONPATH="/Users/shashanktiwari/Desktop/atlas/server:$PYTHONPATH"
export PYTHONDONTWRITEBYTECODE=1 >> to stop pycache generation
