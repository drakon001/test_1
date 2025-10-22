from pymongo import MongoClient, DESCENDING
import os
from datetime import datetime, timezone

from server.models.schemas import  SubmitRequest
from server.models.types import SubmissionData

class MongoStorage():
    '''
    Класс для работы с MongoDB вместо хранения данных в памяти
    приведен как пример работы с монго бд + классический вариант работы с классами и интансами
    '''
    
    def __init__(self):
        self.client = None
        self.db = None
        self.collection = None
        self._connect()
    
    def _connect(self):
        """Подключение к MongoDB"""
        try:
          
            mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
            db_name = os.getenv('MONGO_DB_NAME', 'submissions_db')
            collection_name = os.getenv('MONGO_COLLECTION', 'submissions')
            
            self.client = MongoClient(mongo_uri)
            self.db = self.client[db_name]
            self.collection = self.db[collection_name]
            
          
            self.collection.create_index([("date", DESCENDING)])
            self.collection.create_index([("first_name", 1), ("last_name", 1)])
            
        except Exception as e:
            print(f"Error connecting to MongoDB: {e}")
            raise
    

    def append(self, data: SubmissionData):
        """Добавление данных в MongoDB"""
        try:
            
            if hasattr(data, 'dict'):
                document = data.dict()
            else:
                document = dict(data)
            
           
            document['created_at'] = datetime.now(timezone.utc)
            
            result = self.collection.insert_one(document)
            return result.inserted_id
            
        except Exception as e:
            print(f"Error inserting data: {e}")
            raise
    
  
    def filter(self, request: SubmitRequest):
        """Фильтрация данных в MongoDB"""
        try:
            
            query = {}
            if hasattr(request, 'date') and request.date:
                query['date'] = request.date.isoformat()
            if hasattr(request, 'first_name') and request.first_name:
                query['first_name'] = request.first_name
            if hasattr(request, 'last_name') and request.last_name:
                query['last_name'] = request.last_name
            
           
            pipeline = [
                {"$match": query},
                {"$sample": {"size": 5}},  
                {"$project": {
                    "date": 1,
                    "name": {"$concat": ["$first_name", " ", "$last_name"]}
                }}
            ]
            
            results = list(self.collection.aggregate(pipeline))
            
            
            return results[:5]  
            
        except Exception as e:
            print(f"Error filtering data: {e}")
          
            # Если что то пошло не так - добавляем сгенерированные данные
            num_items = 5
            data = []
            for i in range(num_items):
                data.append({
                    "date": request.date.isoformat() if hasattr(request, 'date') and request.date else datetime.now().isoformat(),
                    "name": f"{request.first_name} {request.last_name}" if hasattr(request, 'first_name') and hasattr(request, 'last_name') else "Unknown User"
                })
            return data
    
    def history(self, limit=10):
        """Получение истории из MongoDB"""
        try:
            # Агрегация для получения истории с подсчетом предыдущих записей
            # пишем агрегацию на стророне монго через collection.aggregate
            pipeline = [
                {
                    "$sort": {
                        "date": -1,
                        "first_name": 1,
                        "last_name": 1
                    }
                },
                {
                    "$limit": limit
                },
                {
                    "$lookup": {
                        "from": self.collection.name,
                        "let": {
                            "current_first_name": "$first_name",
                            "current_last_name": "$last_name", 
                            "current_date": "$date"
                        },
                        "pipeline": [
                            {
                                "$match": {
                                    "$expr": {
                                        "$and": [
                                            {"$eq": ["$first_name", "$$current_first_name"]},
                                            {"$eq": ["$last_name", "$$current_last_name"]},
                                            {"$lt": ["$date", "$$current_date"]}
                                        ]
                                    }
                                }
                            },
                            {
                                "$count": "previous_count"
                            }
                        ],
                        "as": "previous_submissions"
                    }
                },
                {
                    "$project": {
                        "date": 1,
                        "first_name": 1,
                        "last_name": 1,
                        "count": {
                            "$ifNull": [{"$arrayElemAt": ["$previous_submissions.previous_count", 0]}, 0]
                        }
                    }
                }
            ]
            
            results = list(self.collection.aggregate(pipeline))
            
            # Преобразуем ObjectId в строки и обрабатываем даты
            history_items = []
            for item in results:
                item['_id'] = str(item['_id'])
                # Если date является datetime объектом, преобразуем в строку
                # Преобразуем строку даты в объект datetime для последующей обработки
                if 'date' in item and isinstance(item['date'], str):
                    try:
                        item['date'] = datetime.fromisoformat(item['date'])
                    except ValueError:
                        pass
                # Затем преобразуем обратно в строку для ответа
                if isinstance(item.get('date'), datetime):
                    item['date'] = item['date'].isoformat()
                history_items.append(item)
            
            return history_items
            
        except Exception as e:
            print(f"Error getting history: {e}")
            return []
    
    def close(self):
        """Закрытие соединения с MongoDB"""
        if self.client:
            self.client.close()
    
    def __del__(self):
        """Деструктор для автоматического закрытия соединения"""
        self.close()


# Создаем глобальный экземпляр для использования
Storage = MongoStorage()