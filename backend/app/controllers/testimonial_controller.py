import uuid
import logging
from pathlib import Path
from datetime import datetime
from typing import List
from fastapi import HTTPException, UploadFile
import aiofiles
from app.config import VIDEO_DIR
from app.database import get_db
from app.models.testimonial import Testimonial, TestimonialCreate

logger = logging.getLogger(__name__)

async def upload_testimonial(
    client_name: str,
    client_title: str,
    thumbnail_url: str,
    video: UploadFile
) -> Testimonial:
    db = get_db()
    if not video.content_type or not video.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="File must be a video")

    file_ext = Path(video.filename or "").suffix or ".mp4"
    file_name = f"{uuid.uuid4()}{file_ext}"
    file_path = VIDEO_DIR / file_name

    async with aiofiles.open(file_path, "wb") as f:
        while chunk := await video.read(1024 * 1024):
            await f.write(chunk)

    video_url = f"/api/videos/{file_name}"

    testimonial = Testimonial(
        client_name=client_name,
        client_title=client_title,
        video_url=video_url,
        thumbnail_url=thumbnail_url
    )

    doc = testimonial.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    if db is not None:
        await db.testimonials.insert_one(doc)

    return testimonial

async def get_testimonials() -> List[Testimonial]:
    db = get_db()
    if db is None:
        return []
    try:
        testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(1000)
        for test in testimonials:
            if isinstance(test.get("created_at"), str):
                test["created_at"] = datetime.fromisoformat(test["created_at"])
        return testimonials
    except Exception as e:
        logger.warning(f"Failed to fetch testimonials: {e}")
        return []

async def delete_testimonial(testimonial_id: str) -> dict:
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")

    testimonial = await db.testimonials.find_one({"id": testimonial_id}, {"_id": 0})
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    # Delete video file
    if testimonial.get("video_url"):
        video_filename = testimonial["video_url"].split("/")[-1]
        video_path = VIDEO_DIR / video_filename
        if video_path.exists():
            try:
                video_path.unlink()
            except Exception as e:
                logger.warning(f"Failed to delete video file {video_path}: {e}")

    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    return {"message": "Testimonial deleted successfully"}

async def update_testimonial(testimonial_id: str, testimonial: TestimonialCreate) -> Testimonial:
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")

    existing = await db.testimonials.find_one({"id": testimonial_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Testimonial not found")

    update_data = testimonial.model_dump()
    update_data["id"] = testimonial_id
    update_data["video_url"] = existing["video_url"]
    update_data["created_at"] = existing["created_at"]

    await db.testimonials.replace_one({"id": testimonial_id}, update_data)

    updated = Testimonial(**update_data)
    if isinstance(updated.created_at, str):
        updated.created_at = datetime.fromisoformat(updated.created_at)
    return updated
