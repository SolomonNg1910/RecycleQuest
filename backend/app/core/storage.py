"""
Local file storage configuration

Handles file uploads and storage without cloud dependencies.
"""

import os
import uuid
import shutil
from pathlib import Path
from typing import Optional
from fastapi import UploadFile, HTTPException

from app.core.config import settings


class LocalFileStorage:
    """Local file storage handler"""
    
    def __init__(self):
        self.upload_dir = Path(settings.UPLOAD_DIR)
        self.upload_dir.mkdir(exist_ok=True)
        
        # Create subdirectories
        (self.upload_dir / "images").mkdir(exist_ok=True)
        (self.upload_dir / "documents").mkdir(exist_ok=True)
        (self.upload_dir / "temp").mkdir(exist_ok=True)
    
    async def save_file(
        self, 
        file: UploadFile, 
        subfolder: str = "images"
    ) -> str:
        """
        Save uploaded file to local storage
        
        Args:
            file: FastAPI UploadFile object
            subfolder: Subdirectory to save file in
            
        Returns:
            str: Relative path to saved file
            
        Raises:
            HTTPException: If file is too large or invalid
        """
        # Validate file size
        if file.size and file.size > settings.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail=f"File too large. Maximum size: {settings.MAX_FILE_SIZE} bytes"
            )
        
        # Generate unique filename
        file_extension = Path(file.filename).suffix if file.filename else ""
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        
        # Create full path
        subfolder_path = self.upload_dir / subfolder
        subfolder_path.mkdir(exist_ok=True)
        file_path = subfolder_path / unique_filename
        
        try:
            # Save file
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            
            # Return relative path
            return f"{subfolder}/{unique_filename}"
            
        except Exception as e:
            # Clean up partial file if error occurs
            if file_path.exists():
                file_path.unlink()
            raise HTTPException(
                status_code=500,
                detail=f"Failed to save file: {str(e)}"
            )
    
    def get_file_path(self, relative_path: str) -> Path:
        """
        Get full path to file
        
        Args:
            relative_path: Relative path from upload directory
            
        Returns:
            Path: Full path to file
        """
        return self.upload_dir / relative_path
    
    def delete_file(self, relative_path: str) -> bool:
        """
        Delete file from storage
        
        Args:
            relative_path: Relative path from upload directory
            
        Returns:
            bool: True if file was deleted, False if not found
        """
        file_path = self.get_file_path(relative_path)
        if file_path.exists():
            file_path.unlink()
            return True
        return False
    
    def file_exists(self, relative_path: str) -> bool:
        """
        Check if file exists
        
        Args:
            relative_path: Relative path from upload directory
            
        Returns:
            bool: True if file exists
        """
        return self.get_file_path(relative_path).exists()
    
    def get_file_url(self, relative_path: str) -> str:
        """
        Get public URL for file
        
        Args:
            relative_path: Relative path from upload directory
            
        Returns:
            str: Public URL for file
        """
        # For local development, return localhost URL
        # In production, this would be your domain
        base_url = "http://localhost:8000" if settings.ENVIRONMENT == "development" else "https://your-domain.com"
        return f"{base_url}/uploads/{relative_path}"


# Global storage instance
storage = LocalFileStorage()