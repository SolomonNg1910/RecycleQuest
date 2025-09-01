"""
User database model

SQLAlchemy model for user data with relationships.
"""

import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.core.database import Base


class User(Base):
    """User model for authentication and profile data"""
    
    __tablename__ = "users"
    
    # Primary key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    
    # Authentication fields
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    # Gamification fields
    level = Column(Integer, default=1)
    experience_points = Column(Integer, default=0)
    recycle_coins = Column(Integer, default=0)
    total_recycled_kg = Column(Float, default=0.0)
    
    # Profile fields
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    location = Column(String, nullable=True)  # For local leaderboards
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)
    
    # Relationships (will be added in subsequent tasks)
    # achievements = relationship("Achievement", back_populates="user")
    # quest_progress = relationship("QuestProgress", back_populates="user")
    # team_memberships = relationship("TeamMembership", back_populates="user")
    # recycling_activities = relationship("RecyclingActivity", back_populates="user")
    # transactions = relationship("Transaction", back_populates="user")
    
    def __repr__(self):
        return f"<User(id={self.id}, username={self.username}, email={self.email})>"
    
    @property
    def full_name(self) -> str:
        """Get user's full name"""
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        return self.username
    
    @property
    def level_name(self) -> str:
        """Get user's level name based on XP"""
        if self.experience_points < 1000:
            return "Recycler"
        elif self.experience_points < 5000:
            return "EcoHero"
        else:
            return "GreenChampion"
    
    @property
    def xp_to_next_level(self) -> int:
        """Calculate XP needed for next level"""
        if self.experience_points < 1000:
            return 1000 - self.experience_points
        elif self.experience_points < 5000:
            return 5000 - self.experience_points
        else:
            return 0  # Max level reached