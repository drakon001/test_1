from fastapi import APIRouter
from server.db.MemoryStorage import Storage
import asyncio
import random
from datetime import datetime

from server.models.schemas import SubmitRequest
from server.models.types import ErrorResponse, ResponceHistoryBase, SubmissionData, SuccessResponse

router = APIRouter()

@router.post("/submit",  response_model=SuccessResponse | ErrorResponse)
async def submit_form(request: SubmitRequest) -> SuccessResponse | ErrorResponse:
    await asyncio.sleep(random.uniform(0.5, 3.0))
    submission_data: SubmissionData = {
        "first_name": request.first_name,
        "last_name": request.last_name,
        "date": request.date,
        "created_at": datetime.now()
    }
    Storage.append(submission_data)
    data = Storage.filter(request)
    result:SuccessResponse =  {"success": True, "data": data}
    return result

@router.get("/history")
async def get_history():
    history: ResponceHistoryBase =  {"items": Storage.history()}
    return history
