"""
Application configuration using Pydantic Settings

Handles environment variables and configuration validation.
"""

from typing import List, Optional
from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings with environment variable support"""
    
    # Application
    APP_NAME: str = "RecycleQuest API"
    ENVIRONMENT: str = Field(default="development", env="ENVIRONMENT")
    DEBUG: bool = Field(default=True, env="DEBUG")
    
    # Security
    SECRET_KEY: str = Field(env="SECRET_KEY")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALLOWED_HOSTS: str = Field(default="localhost,127.0.0.1", env="ALLOWED_HOSTS")
    CORS_ORIGINS: str = Field(default="http://localhost:3000,http://localhost:19006", env="CORS_ORIGINS")
    
    # Database
    DATABASE_URL: str = Field(env="DATABASE_URL")
    DATABASE_ECHO: bool = Field(default=False, env="DATABASE_ECHO")
    
    # Redis
    REDIS_URL: str = Field(default="redis://localhost:6379", env="REDIS_URL")
    UPSTASH_REDIS_REST_URL: Optional[str] = Field(default=None, env="UPSTASH_REDIS_REST_URL")
    UPSTASH_REDIS_REST_TOKEN: Optional[str] = Field(default=None, env="UPSTASH_REDIS_REST_TOKEN")
    
    # External APIs
    CDC_VOUCHER_API_URL: Optional[str] = Field(default=None, env="CDC_VOUCHER_API_URL")
    CDC_VOUCHER_API_KEY: Optional[str] = Field(default=None, env="CDC_VOUCHER_API_KEY")
    
    # File Storage (Supabase)
    SUPABASE_URL: str = Field(env="SUPABASE_URL")
    SUPABASE_ANON_KEY: str = Field(env="SUPABASE_ANON_KEY")
    SUPABASE_SERVICE_ROLE_KEY: str = Field(env="SUPABASE_SERVICE_ROLE_KEY")
    SUPABASE_STORAGE_BUCKET: str = Field(default="recyclequest-uploads", env="SUPABASE_STORAGE_BUCKET")
    MAX_FILE_SIZE: int = Field(default=10 * 1024 * 1024, env="MAX_FILE_SIZE")  # 10MB
    
    # Smart Bin Integration
    SMART_BIN_API_URL: Optional[str] = Field(default=None, env="SMART_BIN_API_URL")
    SMART_BIN_API_KEY: Optional[str] = Field(default=None, env="SMART_BIN_API_KEY")
    
    # QR Code Settings
    QR_CODE_SECRET: str = Field(default="default-qr-secret", env="QR_CODE_SECRET")
    QR_CODE_EXPIRY_HOURS: int = Field(default=24, env="QR_CODE_EXPIRY_HOURS")
    
    # Gamification
    BASE_XP_PER_KG: int = Field(default=10, env="BASE_XP_PER_KG")
    BASE_COINS_PER_KG: int = Field(default=10, env="BASE_COINS_PER_KG")
    LEVEL_XP_MULTIPLIER: float = Field(default=1.5, env="LEVEL_XP_MULTIPLIER")
    
    @property
    def allowed_hosts_list(self) -> List[str]:
        """Convert ALLOWED_HOSTS string to list"""
        return [host.strip() for host in self.ALLOWED_HOSTS.split(",")]
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Convert CORS_ORIGINS string to list"""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Global settings instance
settings = Settings()