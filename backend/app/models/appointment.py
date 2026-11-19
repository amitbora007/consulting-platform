import uuid
from datetime import datetime, timezone
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

class AppointmentCreate(BaseModel):
    name: str
    email: str
    phone: str
    date: str
    time: str
    message: Optional[str] = ""

class Appointment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    date: str
    time: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
