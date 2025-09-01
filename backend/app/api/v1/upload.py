"""
File Upload API routes

Endpoints for uploading and managing files using Supabase Storage.
"""

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_active_user
from app.services.storage_service import storage_service
from app.models.user import User

router = APIRouter()


@router.post("/avatar", status_code=status.HTTP_201_CREATED)
async def upload_avatar(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Upload user avatar image
    
    Uploads an avatar image for the current user and returns the public URL.
    """
    try:
        # Upload file to Supabase Storage
        file_info = await storage_service.upload_avatar(file, str(current_user.id))
        
        # TODO: Update user profile with avatar URL in database
        # This will be implemented when we create the user profile update endpoint
        
        return {
            "message": "Avatar uploaded successfully",
            "file_info": file_info
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Avatar upload failed: {str(e)}"
        )


@router.post("/achievement-badge", status_code=status.HTTP_201_CREATED)
async def upload_achievement_badge(
    achievement_id: str,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_active_user)
):
    """
    Upload achievement badge image
    
    Uploads a badge image for an achievement. This would typically be used
    by admin users or during achievement creation.
    """
    try:
        # Upload file to Supabase Storage
        file_info = await storage_service.upload_achievement_badge(file, achievement_id)
        
        return {
            "message": "Achievement badge uploaded successfully",
            "file_info": file_info
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Badge upload failed: {str(e)}"
        )


@router.post("/general", status_code=status.HTTP_201_CREATED)
async def upload_file(
    file: UploadFile = File(...),
    folder: str = "uploads",
    current_user: User = Depends(get_current_active_user)
):
    """
    Upload a general file
    
    Uploads a file to the specified folder in Supabase Storage.
    """
    try:
        # Upload file to Supabase Storage
        file_info = await storage_service.upload_file(
            file, 
            folder=folder, 
            user_id=str(current_user.id)
        )
        
        return {
            "message": "File uploaded successfully",
            "file_info": file_info
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"File upload failed: {str(e)}"
        )


@router.delete("/file")
async def delete_file(
    file_path: str,
    current_user: User = Depends(get_current_active_user)
):
    """
    Delete a file from storage
    
    Deletes a file from Supabase Storage. Users can only delete their own files.
    """
    try:
        # Check if file belongs to current user (basic security check)
        if not file_path.startswith(f"avatars/{current_user.id}/") and \
           not file_path.startswith(f"uploads/{current_user.id}/"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You can only delete your own files"
            )
        
        # Delete file from Supabase Storage
        success = await storage_service.delete_file(file_path)
        
        if success:
            return {"message": "File deleted successfully"}
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete file"
            )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"File deletion failed: {str(e)}"
        )


@router.get("/url")
async def get_file_url(
    file_path: str,
    current_user: User = Depends(get_current_active_user)
):
    """
    Get public URL for a file
    
    Returns the public URL for a file in Supabase Storage.
    """
    try:
        url = await storage_service.get_file_url(file_path)
        return {"public_url": url}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to get file URL: {str(e)}"
        )