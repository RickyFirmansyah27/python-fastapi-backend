from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config.db_config import db_connection
import uvicorn

from routes.index import router as routes

app = FastAPI()

app.include_router(routes)

if __name__ == "__main__":
    db_connection()
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
