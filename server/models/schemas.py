from pydantic import BaseModel, field_validator
from datetime import datetime

class SubmitRequest(BaseModel):
    first_name: str
    last_name: str
    date: datetime

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

