"""
Database models package

Imports all models to ensure they are registered with SQLAlchemy.
"""

from app.core.database import Base

# Import all models here to ensure they are registered
from app.models.user import User
# from app.models.quest import Quest, QuestProgress
# from app.models.team import Team, TeamMembership
# from app.models.activity import RecyclingActivity
# from app.models.reward import MarketplaceItem, Transaction
# from app.models.smart_bin import SmartBin

__all__ = ["Base"]