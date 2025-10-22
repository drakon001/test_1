
from typing import Literal, TypedDict
from datetime import datetime



class SubmissionData(TypedDict): 
    first_name: str
    last_name: str
    date: str
    created_at: datetime

class ItemBase(TypedDict):
    date: str
    name: str

class HistoryItem(TypedDict):
    date: str 
    first_name: str
    last_name: str 
    count: int

class ResponceHistoryBase(TypedDict):
    items: list[HistoryItem] 

class SuccessResponse(TypedDict):
    success: bool = True
    data: list[ItemBase] 

ErrorKeys = Literal['first_name', 'last_name', 'date', 'unknown']
class ErrorResponse(TypedDict):
    success: bool = False
    error: dict[ErrorKeys, list[str]]