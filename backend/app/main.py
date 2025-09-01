"""
RecycleQuest FastAPI Application

Main application entry point with middleware, CORS, and route configuration.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from app.core.config import settings
from app.core.database import engine
from app.models import Base

# Import routers
from app.api.v1.auth import router as auth_router
from app.api.v1.upload import router as upload_router
# from app.api.v1.users import router as users_router
# from app.api.v1.quests import router as quests_router
# from app.api.v1.leaderboard import router as leaderboard_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="RecycleQuest API",
    description="Gamified recycling application backend",
    version="1.0.0",
    docs_url="/docs" if settings.ENVIRONMENT == "development" else None,
    redoc_url="/redoc" if settings.ENVIRONMENT == "development" else None,
)

# Security middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=settings.allowed_hosts_list,
)

# CORS middleware for mobile app
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "RecycleQuest API",
        "version": "1.0.0",
        "status": "healthy"
    }


@app.get("/health")
async def health_check():
    """Detailed health check for monitoring"""
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "database": "connected",  # TODO: Add actual DB health check
        "redis": "connected",     # TODO: Add actual Redis health check
    }


# Include API routers
app.include_router(auth_router, prefix="/api/v1/auth", tags=["authentication"])
app.include_router(upload_router, prefix="/api/v1/upload", tags=["file-upload"])
# app.include_router(users_router, prefix="/api/v1/users", tags=["users"])
# app.include_router(quests_router, prefix="/api/v1/quests", tags=["quests"])
# app.include_router(leaderboard_router, prefix="/api/v1/leaderboard", tags=["leaderboard"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True if settings.ENVIRONMENT == "development" else False,
    )