
from typing import TypedDict
from pydantic import BaseModel, field_validator
from datetime import date, datetime

class SubmitRequest(BaseModel):
    first_name: str
    last_name: str
    date: date

    @field_validator('first_name')
    @classmethod
    def validate_first_name(cls, v: str) -> str:
        """Валидация имени - запрет пробелов"""
        if ' ' in v:
            raise ValueError('No whitespace in first name is allowed')
        return v

    @field_validator('last_name')
    @classmethod
    def validate_last_name(cls, v: str) -> str:
        """Валидация фамилии - запрет пробелов"""
        if ' ' in v:
            raise ValueError('No whitespace in last name is allowed')
        return v

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


class ErrorResponse(TypedDict):
    success: bool = False
    error: dict[str, list[str]]