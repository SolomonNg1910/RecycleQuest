"""
Redis configuration and connection management

Redis setup for caching and real-time features.
"""

import redis.asyncio as redis
from typing import Optional

from app.core.config import settings

# Global Redis connection pool
redis_pool: Optional[redis.ConnectionPool] = None


async def get_redis_pool() -> redis.ConnectionPool:
    """
    Get or create Redis connection pool
    
    Returns:
        redis.ConnectionPool: Redis connection pool
    """
    global redis_pool
    if redis_pool is None:
        redis_pool = redis.ConnectionPool.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True,
            max_connections=20,
        )
    return redis_pool


async def get_redis() -> redis.Redis:
    """
    Get Redis connection from pool
    
    Returns:
        redis.Redis: Redis connection
    """
    pool = await get_redis_pool()
    return redis.Redis(connection_pool=pool)


async def close_redis_pool():
    """Close Redis connection pool"""
    global redis_pool
    if redis_pool:
        await redis_pool.disconnect()
        redis_pool = None