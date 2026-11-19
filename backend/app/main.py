import logging
from datetime import datetime, timezone
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.config import CORS_ORIGINS, CORS_ALLOW_ORIGIN_REGEX
from app.database import lifespan
from app.routes import api_router

# Configure centralized logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

def create_app() -> FastAPI:
    """FastAPI application factory."""
    application = FastAPI(
        title="Corporate Consulting Platform API",
        version="1.0.0",
        lifespan=lifespan
    )

    # CORS configuration
    application.add_middleware(
        CORSMiddleware,
        allow_origins=CORS_ORIGINS,
        allow_origin_regex=CORS_ALLOW_ORIGIN_REGEX,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Mount API router under /api
    application.include_router(api_router)

    # Root health probes for Render and platform orchestrators
    @application.get("/healthz", tags=["Health"])
    @application.get("/", tags=["Health"])
    async def root_health():
        return {
            "status": "healthy",
            "service": "corporate-consulting-platform-backend",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }

    return application

app = create_app()
