"""
Authentication API routes

Endpoints for user registration, login, and profile management.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_active_user
from app.schemas.user import (
    UserCreate,
    UserLogin,
    UserResponse,
    UserUpdate,
    Token,
    PasswordReset,
    PasswordResetConfirm
)
from app.services.auth_service import AuthService
from app.models.user import User

router = APIRouter()


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    """
    Register a new user account
    
    Creates a new user with the provided information and returns user data.
    """
    auth_service = AuthService(db)
    try:
        user = auth_service.register_user(user_data)
        return user
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user account"
        )


@router.post("/login", response_model=Token)
async def login(
    login_data: UserLogin,
    db: Session = Depends(get_db)
):
    """
    Authenticate user and return access token
    
    Validates user credentials and returns JWT token for API access.
    """
    auth_service = AuthService(db)
    
    # Authenticate user
    user = auth_service.authenticate_user(login_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    token = auth_service.create_access_token_for_user(user)
    return token


@router.get("/profile", response_model=UserResponse)
async def get_profile(
    current_user: User = Depends(get_current_active_user)
):
    """
    Get current user profile information
    
    Returns detailed profile information for the authenticated user.
    """
    return UserResponse.from_orm(current_user)


@router.put("/profile", response_model=UserResponse)
async def update_profile(
    profile_data: UserUpdate,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Update current user profile information
    
    Updates user profile with provided data and returns updated information.
    """
    auth_service = AuthService(db)
    
    # Convert Pydantic model to dict, excluding None values
    update_data = profile_data.dict(exclude_unset=True)
    
    try:
        updated_user = auth_service.update_user_profile(current_user, update_data)
        return updated_user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update profile"
        )


@router.post("/refresh", response_model=Token)
async def refresh_token(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """
    Refresh access token
    
    Issues a new access token for the authenticated user.
    """
    auth_service = AuthService(db)
    token = auth_service.create_access_token_for_user(current_user)
    return token


@router.post("/password-reset", status_code=status.HTTP_200_OK)
async def request_password_reset(
    reset_data: PasswordReset,
    db: Session = Depends(get_db)
):
    """
    Request password reset
    
    Sends password reset instructions to the user's email address.
    Note: In a real application, this would send an email with reset link.
    """
    auth_service = AuthService(db)
    user = auth_service.get_user_by_email(reset_data.email)
    
    # Always return success to prevent email enumeration
    # In production, send email if user exists
    return {"message": "If the email exists, password reset instructions have been sent"}


@router.post("/password-reset/confirm", status_code=status.HTTP_200_OK)
async def confirm_password_reset(
    reset_data: PasswordResetConfirm,
    db: Session = Depends(get_db)
):
    """
    Confirm password reset with token
    
    Resets user password using the provided reset token.
    """
    # This would be implemented with proper token verification
    # For now, return success message
    return {"message": "Password has been reset successfully"}


@router.post("/logout", status_code=status.HTTP_200_OK)
async def logout(
    current_user: User = Depends(get_current_active_user)
):
    """
    Logout user
    
    In a stateless JWT system, logout is handled client-side by removing the token.
    This endpoint exists for consistency and future token blacklisting if needed.
    """
    return {"message": "Successfully logged out"}