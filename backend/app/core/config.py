import os
from typing import List

class Settings:
    PROJECT_NAME: str = "TruthLens"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "truthlens_super_secure_secret_key_change_in_production_2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite+aiosqlite:///./truthlens.db"
    )
    
    # Storage & Upload limits
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "./storage/uploads")
    ARTIFACTS_DIR: str = os.getenv("ARTIFACTS_DIR", "./storage/artifacts")
    MAX_IMAGE_BYTES: int = 15 * 1024 * 1024  # 15 MB
    MAX_DOC_BYTES: int = 25 * 1024 * 1024    # 25 MB
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ]
    
    # Safe URL fetch limits
    URL_FETCH_TIMEOUT_SECONDS: float = 8.0
    URL_FETCH_MAX_BYTES: int = 10 * 1024 * 1024  # 10 MB

settings = Settings()

# Ensure storage directories exist
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
os.makedirs(settings.ARTIFACTS_DIR, exist_ok=True)
