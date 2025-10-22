"""
    основной файл сервера
    задает статичексий сервер для подгрузки бандл +
    ендпоинты из  server.api.endpoints 
    и обработчик ошибок валидации
"""

from fastapi import FastAPI, status
from fastapi.exceptions import RequestValidationError
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from server.api.endpoints import router as api_router
import os

from server.models.types import ErrorResponse

server = FastAPI(
    title="My FastAPI Project",
    description="",
    version="1.0.0"
)

server.include_router(api_router, prefix="/api/v1")
server.mount("/static", StaticFiles(directory="server/static"), name="static")

@server.get("/")
async def read_index():
    """ read index """
    return FileResponse("server/static/index.html")


@server.get("/{path_name:path}")
async def serve_spa(path_name: str):
    """Для SPA приложений - все пути ведут на index.html"""
    static_path = "server/static"
    full_path = os.path.join(static_path, path_name)
    
    # Если файл существует - отдаем его
    if os.path.isfile(full_path) and not path_name.endswith('.html'):
        return FileResponse(full_path)
    
    # Иначе отдаем index.html (для SPA роутинга)
    return FileResponse("server/static/index.html")



# Обработчик ошибок валидации - ВСЕГДА возвращает 400
@server.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):
    """Обработка ошибок валидации Pydantic - всегда возвращает 400"""
    error_messages: ErrorResponse = {}
    
    for error in exc.errors():
        field = error['loc'][-1] if error['loc'] else 'unknown'
        msg = error['msg']
        
        if "whitespace" in msg.lower():
            if field == "first_name":
                error_messages["first_name"] = ["No whitespace in first name is allowed"]
            elif field == "last_name":
                error_messages["last_name"] = ["No whitespace in last name is allowed"]
        else:
            # Для других ошибок валидации
            if field not in error_messages:
                error_messages[field] = []
            error_messages[field].append(msg)
    
    # ВСЕГДА возвращаем 400 для ошибок валидации
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,  # 400
        content={"success": False, "error": error_messages}
    )