import logging
from contextlib import asynccontextmanager
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import FastAPI
from app.config import MONGO_URL, DB_NAME

logger = logging.getLogger(__name__)

client: AsyncIOMotorClient | None = None
db = None

try:
    client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=5000)
    db = client[DB_NAME]
except Exception as e:
    logger.error(f"Failed to initialize MongoDB client: {e}")
    client = None
    db = None

def get_db():
    return db

async def check_db_connection() -> dict:
    """Checks MongoDB server responsiveness with a ping command."""
    if db is None or client is None:
        return {"status": "disconnected", "database": DB_NAME, "message": "Client not initialized"}
    try:
        await client.admin.command("ping")
        return {"status": "connected", "database": DB_NAME}
    except Exception as e:
        return {"status": "unreachable", "database": DB_NAME, "error": str(e)}

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan managing database connections."""
    yield
    if client:
        try:
            client.close()
            logger.info("MongoDB connection closed cleanly.")
        except Exception as e:
            logger.warning(f"Error closing MongoDB connection: {e}")
