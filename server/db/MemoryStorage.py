

import random
from server.models.schemas import SubmitRequest
from server.models.types import HistoryItem, SubmissionData


class Storage():
    '''
        простая обертка чтобы не возится с поднятием монго или другой базы данных
        радом  расположил класс как пример работы с монго
    '''
    _data = []


    @classmethod
    def append(cls, data: SubmissionData):
        '''
            просто добавляем новую запись
        '''
        cls._data.append(data)
    
    @classmethod
    def filter(cls, request: SubmitRequest):
        '''
            вывод как буддто отфильрованных данных
        '''
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
        '''
            вывод истории с агрегацией
        '''
        sorted_submissions = sorted(
            cls._data, 
            key=lambda x: (x['date'], x['first_name'], x['last_name']),
            reverse=True
        )[:10]

        history_items: list[HistoryItem] = []
    
        for submission in sorted_submissions:
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
        
      

    