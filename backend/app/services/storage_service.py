"""
Supabase Storage Service

Handles file uploads, downloads, and management using Supabase Storage.
"""

import os
import uuid
from typing import Optional, BinaryIO
from supabase import create_client, Client
from fastapi import HTTPException, UploadFile
import mimetypes

from app.core.config import settings


class SupabaseStorageService:
    """Service for handling file storage operations with Supabase Storage"""
    
    def __init__(self):
        self.supabase: Client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_SERVICE_ROLE_KEY
        )
        self.bucket_name = settings.SUPABASE_STORAGE_BUCKET
        
    async def upload_file(
        self, 
        file: UploadFile, 
        folder: str = "uploads",
        user_id: Optional[str] = None
    ) -> dict:
        """
        Upload a file to Supabase Storage
        
        Args:
            file: The uploaded file
            folder: Storage folder (e.g., 'avatars', 'achievements')
            user_id: Optional user ID for organizing files
            
        Returns:
            dict: File information including public URL
        """
        try:
            # Validate file size
            if file.size > settings.MAX_FILE_SIZE:
                raise HTTPException(
                    status_code=413,
                    detail=f"File too large. Maximum size is {settings.MAX_FILE_SIZE} bytes"
                )
            
            # Validate file type
            allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
            if file.content_type not in allowed_types:
                raise HTTPException(
                    status_code=400,
                    detail=f"File type {file.content_type} not allowed"
                )
            
            # Generate unique filename
            file_extension = os.path.splitext(file.filename)[1]
            unique_filename = f"{uuid.uuid4()}{file_extension}"
            
            # Create file path
            if user_id:
                file_path = f"{folder}/{user_id}/{unique_filename}"
            else:
                file_path = f"{folder}/{unique_filename}"
            
            # Read file content
            file_content = await file.read()
            
            # Upload to Supabase Storage
            response = self.supabase.storage.from_(self.bucket_name).upload(
                path=file_path,
                file=file_content,
                file_options={
                    "content-type": file.content_type,
                    "cache-control": "3600"
                }
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=500,
                    detail="Failed to upload file to storage"
                )
            
            # Get public URL
            public_url = self.supabase.storage.from_(self.bucket_name).get_public_url(file_path)
            
            return {
                "filename": unique_filename,
                "original_filename": file.filename,
                "file_path": file_path,
                "public_url": public_url,
                "content_type": file.content_type,
                "size": file.size
            }
            
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"File upload failed: {str(e)}"
            )
    
    async def delete_file(self, file_path: str) -> bool:
        """
        Delete a file from Supabase Storage
        
        Args:
            file_path: Path to the file in storage
            
        Returns:
            bool: True if successful
        """
        try:
            response = self.supabase.storage.from_(self.bucket_name).remove([file_path])
            return response.status_code == 200
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"File deletion failed: {str(e)}"
            )
    
    async def get_file_url(self, file_path: str) -> str:
        """
        Get public URL for a file
        
        Args:
            file_path: Path to the file in storage
            
        Returns:
            str: Public URL
        """
        try:
            return self.supabase.storage.from_(self.bucket_name).get_public_url(file_path)
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to get file URL: {str(e)}"
            )
    
    async def upload_avatar(self, file: UploadFile, user_id: str) -> dict:
        """
        Upload user avatar image
        
        Args:
            file: Avatar image file
            user_id: User ID
            
        Returns:
            dict: File information
        """
        return await self.upload_file(file, folder="avatars", user_id=user_id)
    
    async def upload_achievement_badge(self, file: UploadFile, achievement_id: str) -> dict:
        """
        Upload achievement badge image
        
        Args:
            file: Badge image file
            achievement_id: Achievement ID
            
        Returns:
            dict: File information
        """
        return await self.upload_file(file, folder="achievements", user_id=achievement_id)
    
    async def create_bucket_if_not_exists(self) -> bool:
        """
        Create storage bucket if it doesn't exist
        
        Returns:
            bool: True if bucket exists or was created
        """
        try:
            # Check if bucket exists
            buckets = self.supabase.storage.list_buckets()
            bucket_exists = any(bucket.name == self.bucket_name for bucket in buckets)
            
            if not bucket_exists:
                # Create bucket
                self.supabase.storage.create_bucket(
                    self.bucket_name,
                    options={"public": True}
                )
            
            return True
        except Exception as e:
            print(f"Failed to create bucket: {str(e)}")
            return False


# Global instance
storage_service = SupabaseStorageService()