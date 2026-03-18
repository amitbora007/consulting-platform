from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import aiofiles
import mimetypes

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Initialize MIME types for video files
mimetypes.init()
mimetypes.add_type('video/quicktime', '.mov')
mimetypes.add_type('video/mp4', '.mp4')
mimetypes.add_type('video/x-msvideo', '.avi')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

UPLOAD_DIR = ROOT_DIR / "uploads"
VIDEO_DIR = UPLOAD_DIR / "videos"
PDF_DIR = UPLOAD_DIR / "pdfs"

for directory in [VIDEO_DIR, PDF_DIR]:
    directory.mkdir(parents=True, exist_ok=True)

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

class Article(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str
    category: str
    read_time: str
    image_url: Optional[str] = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ArticleCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    category: str
    read_time: str
    image_url: Optional[str] = ""

@api_router.get("/")
async def root():
    return {"message": "Consulting Service API"}

@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(appointment: AppointmentCreate):
    appt = Appointment(**appointment.model_dump())
    doc = appt.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.appointments.insert_one(doc)
    return appt

@api_router.get("/appointments", response_model=List[Appointment])
async def get_appointments():
    appointments = await db.appointments.find({}, {"_id": 0}).to_list(1000)
    for appt in appointments:
        if isinstance(appt['created_at'], str):
            appt['created_at'] = datetime.fromisoformat(appt['created_at'])
    return appointments

@api_router.post("/testimonials/upload")
async def upload_testimonial(
    client_name: str = File(...),
    client_title: str = File(...),
    thumbnail_url: str = File(default=""),
    video: UploadFile = File(...)
):
    if not video.content_type.startswith('video/'):
        raise HTTPException(status_code=400, detail="File must be a video")
    
    file_ext = Path(video.filename).suffix
    file_name = f"{uuid.uuid4()}{file_ext}"
    file_path = VIDEO_DIR / file_name
    
    async with aiofiles.open(file_path, 'wb') as f:
        content = await video.read()
        await f.write(content)
    
    video_url = f"/api/videos/{file_name}"
    
    testimonial = Testimonial(
        client_name=client_name,
        client_title=client_title,
        video_url=video_url,
        thumbnail_url=thumbnail_url
    )
    
    doc = testimonial.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.testimonials.insert_one(doc)
    
    return testimonial

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(1000)
    for test in testimonials:
        if isinstance(test['created_at'], str):
            test['created_at'] = datetime.fromisoformat(test['created_at'])
    return testimonials

@api_router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str):
    # Get testimonial to delete video file
    testimonial = await db.testimonials.find_one({"id": testimonial_id}, {"_id": 0})
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    # Delete video file
    if testimonial.get('video_url'):
        video_filename = testimonial['video_url'].split('/')[-1]
        video_path = VIDEO_DIR / video_filename
        if video_path.exists():
            video_path.unlink()
    
    # Delete from database
    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    return {"message": "Testimonial deleted successfully"}

@api_router.put("/testimonials/{testimonial_id}", response_model=Testimonial)
async def update_testimonial(testimonial_id: str, testimonial: TestimonialCreate):
    existing = await db.testimonials.find_one({"id": testimonial_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    # Update fields but keep id, video_url, and created_at
    update_data = testimonial.model_dump()
    update_data['id'] = testimonial_id
    update_data['video_url'] = existing['video_url']  # Keep existing video
    update_data['created_at'] = existing['created_at']
    
    await db.testimonials.replace_one({"id": testimonial_id}, update_data)
    
    updated = Testimonial(**update_data)
    if isinstance(updated.created_at, str):
        updated.created_at = datetime.fromisoformat(updated.created_at)
    return updated

@api_router.post("/case-studies/upload")
async def upload_case_study(
    title: str = File(...),
    description: str = File(...),
    industry: str = File(...),
    pdf: UploadFile = File(...)
):
    if pdf.content_type != 'application/pdf':
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    file_name = f"{uuid.uuid4()}.pdf"
    file_path = PDF_DIR / file_name
    
    async with aiofiles.open(file_path, 'wb') as f:
        content = await pdf.read()
        await f.write(content)
    
    pdf_url = f"/api/pdfs/{file_name}"
    
    case_study = CaseStudy(
        title=title,
        description=description,
        industry=industry,
        pdf_url=pdf_url
    )
    
    doc = case_study.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.case_studies.insert_one(doc)
    
    return case_study

@api_router.get("/case-studies", response_model=List[CaseStudy])
async def get_case_studies():
    case_studies = await db.case_studies.find({}, {"_id": 0}).to_list(1000)
    for cs in case_studies:
        if isinstance(cs['created_at'], str):
            cs['created_at'] = datetime.fromisoformat(cs['created_at'])
    return case_studies

@api_router.delete("/case-studies/{case_study_id}")
async def delete_case_study(case_study_id: str):
    # Get case study to delete PDF file
    case_study = await db.case_studies.find_one({"id": case_study_id}, {"_id": 0})
    if not case_study:
        raise HTTPException(status_code=404, detail="Case study not found")
    
    # Delete PDF file
    if case_study.get('pdf_url'):
        pdf_filename = case_study['pdf_url'].split('/')[-1]
        pdf_path = PDF_DIR / pdf_filename
        if pdf_path.exists():
            pdf_path.unlink()
    
    # Delete from database
    result = await db.case_studies.delete_one({"id": case_study_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Case study not found")
    
    return {"message": "Case study deleted successfully"}

@api_router.put("/case-studies/{case_study_id}", response_model=CaseStudy)
async def update_case_study(case_study_id: str, case_study: CaseStudyCreate):
    existing = await db.case_studies.find_one({"id": case_study_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Case study not found")
    
    # Update fields
    update_data = case_study.model_dump()
    update_data['id'] = case_study_id
    update_data['pdf_url'] = existing['pdf_url']  # Keep existing PDF
    update_data['created_at'] = existing['created_at']
    
    await db.case_studies.replace_one({"id": case_study_id}, update_data)
    
    updated = CaseStudy(**update_data)
    if isinstance(updated.created_at, str):
        updated.created_at = datetime.fromisoformat(updated.created_at)
    return updated

@api_router.post("/articles", response_model=Article)
async def create_article(article: ArticleCreate):
    new_article = Article(**article.model_dump())
    doc = new_article.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.articles.insert_one(doc)
    return new_article

@api_router.get("/articles", response_model=List[Article])
async def get_articles():
    articles = await db.articles.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for article in articles:
        if isinstance(article['created_at'], str):
            article['created_at'] = datetime.fromisoformat(article['created_at'])
    return articles

@api_router.delete("/articles/{article_id}")
async def delete_article(article_id: str):
    result = await db.articles.delete_one({"id": article_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Article not found")
    return {"message": "Article deleted successfully"}

@api_router.put("/articles/{article_id}", response_model=Article)
async def update_article(article_id: str, article: ArticleCreate):
    existing = await db.articles.find_one({"id": article_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Article not found")
    
    # Update fields but keep id and created_at
    update_data = article.model_dump()
    update_data['id'] = article_id
    update_data['created_at'] = existing['created_at']
    
    await db.articles.replace_one({"id": article_id}, update_data)
    
    updated = Article(**update_data)
    if isinstance(updated.created_at, str):
        updated.created_at = datetime.fromisoformat(updated.created_at)
    return updated

@api_router.get("/videos/{filename}")
async def serve_video(filename: str):
    file_path = VIDEO_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Video not found")
    
    mime_type, _ = mimetypes.guess_type(str(file_path))
    if not mime_type:
        mime_type = "video/mp4"
    
    return FileResponse(
        path=str(file_path),
        media_type=mime_type,
        headers={
            "Accept-Ranges": "bytes",
            "Cache-Control": "public, max-age=3600"
        }
    )

@api_router.get("/pdfs/{filename}")
async def serve_pdf(filename: str):
    file_path = PDF_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="PDF not found")
    
    return FileResponse(
        path=str(file_path),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename={filename}",
            "Cache-Control": "public, max-age=3600"
        }
    )

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
