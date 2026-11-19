import uuid
from datetime import datetime, timezone
from pydantic import BaseModel, Field, ConfigDict

class CaseStudy(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    industry: str
    pdf_url: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CaseStudyCreate(BaseModel):
    title: str
    description: str
    industry: str
