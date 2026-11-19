"""
Corporate Consulting Platform - ASGI Entrypoint
Re-exports the modular application factory for backward-compatibility with
uvicorn server:app, Render blueprints, and automated scripts.
"""
import os
import uvicorn
from app.main import app, create_app
from app.database import db, client, lifespan
from app.routes import api_router
from app.models import (
    Appointment,
    AppointmentCreate,
    Testimonial,
    TestimonialCreate,
    CaseStudy,
    CaseStudyCreate,
    Article,
    ArticleCreate,
)

__all__ = [
    "app",
    "create_app",
    "db",
    "client",
    "lifespan",
    "api_router",
    "Appointment",
    "AppointmentCreate",
    "Testimonial",
    "TestimonialCreate",
    "CaseStudy",
    "CaseStudyCreate",
    "Article",
    "ArticleCreate",
]

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    host = os.environ.get("HOST", "0.0.0.0")
    uvicorn.run("server:app", host=host, port=port, reload=True)
