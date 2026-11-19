from fastapi import APIRouter
from app.controllers import media_controller

router = APIRouter(tags=["Media"])

@router.get("/videos/{filename}")
async def serve_video(filename: str):
    return await media_controller.serve_video(filename)

@router.get("/pdfs/{filename}")
async def serve_pdf(filename: str):
    return await media_controller.serve_pdf(filename)
