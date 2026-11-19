from typing import List
from fastapi import APIRouter
from app.models.appointment import Appointment, AppointmentCreate
from app.controllers import appointment_controller

router = APIRouter(prefix="/appointments", tags=["Appointments"])

@router.post("", response_model=Appointment)
async def create_appointment(appointment: AppointmentCreate):
    return await appointment_controller.create_appointment(appointment)

@router.get("", response_model=List[Appointment])
async def get_appointments():
    return await appointment_controller.get_appointments()
