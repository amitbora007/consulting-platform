import logging
from datetime import datetime
from typing import List
from app.database import get_db
from app.models.appointment import Appointment, AppointmentCreate

logger = logging.getLogger(__name__)

async def create_appointment(appointment: AppointmentCreate) -> Appointment:
    db = get_db()
    appt = Appointment(**appointment.model_dump())
    doc = appt.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    if db is not None:
        await db.appointments.insert_one(doc)
    return appt

async def get_appointments() -> List[Appointment]:
    db = get_db()
    if db is None:
        return []
    try:
        appointments = await db.appointments.find({}, {"_id": 0}).to_list(1000)
        for appt in appointments:
            if isinstance(appt.get("created_at"), str):
                appt["created_at"] = datetime.fromisoformat(appt["created_at"])
        return appointments
    except Exception as e:
        logger.warning(f"Failed to fetch appointments: {e}")
        return []
