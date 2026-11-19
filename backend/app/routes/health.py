from datetime import datetime, timezone
from fastapi import APIRouter
from app.database import check_db_connection

router = APIRouter(tags=["Health"])

@router.get("/")
async def api_root():
    """Root metadata response for /api/ endpoint."""
    return {"message": "Consulting Service API"}

@router.get("/health")
@router.get("/healthz")
async def api_health():
    """Dedicated health probe endpoint for /api/health and /api/healthz."""
    db_status = await check_db_connection()
    return {
        "status": "healthy",
        "service": "corporate-consulting-platform-api",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "database": db_status
    }
