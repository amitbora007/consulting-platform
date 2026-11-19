from fastapi import APIRouter
from app.routes.health import router as health_router
from app.routes.appointments import router as appointments_router
from app.routes.testimonials import router as testimonials_router
from app.routes.case_studies import router as case_studies_router
from app.routes.articles import router as articles_router
from app.routes.media import router as media_router

api_router = APIRouter(prefix="/api")

# Include domain sub-routers
api_router.include_router(health_router)
api_router.include_router(appointments_router)
api_router.include_router(testimonials_router)
api_router.include_router(case_studies_router)
api_router.include_router(articles_router)
api_router.include_router(media_router)

__all__ = ["api_router"]
