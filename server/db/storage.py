

import random

from server.models.schemas import HistoryItem, SubmissionData, SubmitRequest


class Storage():
    _data = []
    @classmethod
    def append(cls, data: SubmissionData):
        cls._data.append(data)
    
    @classmethod
    def filter(cls, request: SubmitRequest):
        # Генерируем ответ
        num_items = random.randint(2, 5)
        data = []
        for i in range(num_items):
            data.append({
                "date": request.date.isoformat(),
                "name": f"{request.first_name} {request.last_name}"
            })

        return data
    
    @classmethod
    def history(cls):
        # Сортируем и берем 10 последних
        sorted_submissions = sorted(
            cls._data, 
            key=lambda x: (x['date'], x['first_name'], x['last_name']),
            reverse=True
        )[:10]

        history_items: list[HistoryItem] = []
    
        for submission in sorted_submissions:
            # Считаем количество записей до этой даты
            count = sum(1 for s in cls._data 
                    if s['first_name'] == submission['first_name'] 
                    and s['last_name'] == submission['last_name']
                    and s['date'] < submission['date'])
            
            history_items.append({
                "date": submission['date'],
                "first_name": submission['first_name'],
                "last_name": submission['last_name'],
                "count": count
            })

        return history_items
        
      

    