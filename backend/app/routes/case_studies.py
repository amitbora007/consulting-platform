from typing import List
from fastapi import APIRouter, UploadFile, File
from app.models.case_study import CaseStudy, CaseStudyCreate
from app.controllers import case_study_controller

router = APIRouter(prefix="/case-studies", tags=["Case Studies"])

@router.post("/upload", response_model=CaseStudy)
async def upload_case_study(
    title: str = File(...),
    description: str = File(...),
    industry: str = File(...),
    pdf: UploadFile = File(...)
):
    return await case_study_controller.upload_case_study(
        title=title,
        description=description,
        industry=industry,
        pdf=pdf
    )

@router.get("", response_model=List[CaseStudy])
async def get_case_studies():
    return await case_study_controller.get_case_studies()

@router.delete("/{case_study_id}")
async def delete_case_study(case_study_id: str):
    return await case_study_controller.delete_case_study(case_study_id)

@router.put("/{case_study_id}", response_model=CaseStudy)
async def update_case_study(case_study_id: str, case_study: CaseStudyCreate):
    return await case_study_controller.update_case_study(case_study_id, case_study)
