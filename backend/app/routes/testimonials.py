from typing import List
from fastapi import APIRouter, UploadFile, File
from app.models.testimonial import Testimonial, TestimonialCreate
from app.controllers import testimonial_controller

router = APIRouter(prefix="/testimonials", tags=["Testimonials"])

@router.post("/upload", response_model=Testimonial)
async def upload_testimonial(
    client_name: str = File(...),
    client_title: str = File(...),
    thumbnail_url: str = File(default=""),
    video: UploadFile = File(...)
):
    return await testimonial_controller.upload_testimonial(
        client_name=client_name,
        client_title=client_title,
        thumbnail_url=thumbnail_url,
        video=video
    )

@router.get("", response_model=List[Testimonial])
async def get_testimonials():
    return await testimonial_controller.get_testimonials()

@router.delete("/{testimonial_id}")
async def delete_testimonial(testimonial_id: str):
    return await testimonial_controller.delete_testimonial(testimonial_id)

@router.put("/{testimonial_id}", response_model=Testimonial)
async def update_testimonial(testimonial_id: str, testimonial: TestimonialCreate):
    return await testimonial_controller.update_testimonial(testimonial_id, testimonial)
