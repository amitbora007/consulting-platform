import uuid
from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    client_title: str
    video_url: str
    thumbnail_url: Optional[str] = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TestimonialCreate(BaseModel):
    client_name: str
    client_title: str
    thumbnail_url: Optional[str] = ""
