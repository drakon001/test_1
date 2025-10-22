#!/usr/bin/env python3
"""
Run script for FastAPI application
"""
import uvicorn
import os

if __name__ == "__main__":
    # Настройки запуска
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8001))
    reload = os.getenv("RELOAD", "true").lower() == "true"
    
    uvicorn.run(
        "server.main:server",
        host=host,
        port=port,
        reload=reload,
        log_level="info"
    )