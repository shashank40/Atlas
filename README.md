# Services Running
1) Server > handles python backend(FASTAPI).
2) Web is the web application
3) chat-service is a websocket server that can be used for chats
4) Postgres for data saving
5) Redis as cache

# SPIN UP Postgres and Redis

1) cd server
2) docker-compose --file docker-compose.yaml up --remove-orphans --force-recreate
3) For migrations > cd server/schema
4) # Alembic Readme![alt text](server/schemas/README.md)

# Run everything together

1) Have conda installed & create conda env
2) cd server & do pip-sync requirements.txt requirements-dev.txt
3) cd ..
4) make run


# Stop everthing

1) cmd + c & return (in terminal)

# Services Port

1) Server runs on 8000
2) Web runs on 5173
3) Chat service runs on 3000
4) Redis runs on 6379
5) Postgres runs on 5432