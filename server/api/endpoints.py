from fastapi import APIRouter
from server.db.MongoStorage import MongoStorage
import asyncio
import random
from datetime import datetime

from server.models.schemas import SubmitRequest
from server.models.types import ErrorResponse, ResponceHistoryBase, SubmissionData, SuccessResponse

router = APIRouter()

storage = MongoStorage()

@router.post("/submit",  response_model=SuccessResponse | ErrorResponse)
async def submit_form(request: SubmitRequest) -> SuccessResponse | ErrorResponse:
    await asyncio.sleep(random.uniform(0.5, 3.0))
    submission_data: SubmissionData = {
        "first_name": request.first_name,
        "last_name": request.last_name,
        "date": request.date,
        "created_at": datetime.now()
    }
    storage.append(submission_data)
    data = storage.filter(request)
    result:SuccessResponse =  {"success": True, "data": data}
    return result

@router.get("/history")
async def get_history():
    history: ResponceHistoryBase =  {"items": storage.history()}
    return history
