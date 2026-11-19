import uuid
import logging
from datetime import datetime
from typing import List
from fastapi import HTTPException, UploadFile
import aiofiles
from app.config import PDF_DIR
from app.database import get_db
from app.models.case_study import CaseStudy, CaseStudyCreate

logger = logging.getLogger(__name__)

async def upload_case_study(
    title: str,
    description: str,
    industry: str,
    pdf: UploadFile
) -> CaseStudy:
    db = get_db()
    if pdf.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="File must be a PDF")

    file_name = f"{uuid.uuid4()}.pdf"
    file_path = PDF_DIR / file_name

    async with aiofiles.open(file_path, "wb") as f:
        while chunk := await pdf.read(1024 * 1024):
            await f.write(chunk)

    pdf_url = f"/api/pdfs/{file_name}"

    case_study = CaseStudy(
        title=title,
        description=description,
        industry=industry,
        pdf_url=pdf_url
    )

    doc = case_study.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    if db is not None:
        await db.case_studies.insert_one(doc)

    return case_study

async def get_case_studies() -> List[CaseStudy]:
    db = get_db()
    if db is None:
        return []
    try:
        case_studies = await db.case_studies.find({}, {"_id": 0}).to_list(1000)
        for cs in case_studies:
            if isinstance(cs.get("created_at"), str):
                cs["created_at"] = datetime.fromisoformat(cs["created_at"])
        return case_studies
    except Exception as e:
        logger.warning(f"Failed to fetch case studies: {e}")
        return []

async def delete_case_study(case_study_id: str) -> dict:
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")

    case_study = await db.case_studies.find_one({"id": case_study_id}, {"_id": 0})
    if not case_study:
        raise HTTPException(status_code=404, detail="Case study not found")

    # Delete PDF file
    if case_study.get("pdf_url"):
        pdf_filename = case_study["pdf_url"].split("/")[-1]
        pdf_path = PDF_DIR / pdf_filename
        if pdf_path.exists():
            try:
                pdf_path.unlink()
            except Exception as e:
                logger.warning(f"Failed to delete PDF file {pdf_path}: {e}")

    result = await db.case_studies.delete_one({"id": case_study_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Case study not found")

    return {"message": "Case study deleted successfully"}

async def update_case_study(case_study_id: str, case_study: CaseStudyCreate) -> CaseStudy:
    db = get_db()
    if db is None:
        raise HTTPException(status_code=503, detail="Database not available")

    existing = await db.case_studies.find_one({"id": case_study_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Case study not found")

    update_data = case_study.model_dump()
    update_data["id"] = case_study_id
    update_data["pdf_url"] = existing["pdf_url"]
    update_data["created_at"] = existing["created_at"]

    await db.case_studies.replace_one({"id": case_study_id}, update_data)

    updated = CaseStudy(**update_data)
    if isinstance(updated.created_at, str):
        updated.created_at = datetime.fromisoformat(updated.created_at)
    return updated
