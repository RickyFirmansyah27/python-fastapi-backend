from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.db_config import db_connection
from routes.index import router as routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes)
db_connection()
