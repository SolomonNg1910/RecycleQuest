-- Initialize RecycleQuest database
-- This file is run when the PostgreSQL container starts

-- Create database if it doesn't exist
-- (This is handled by POSTGRES_DB environment variable)

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create indexes for better performance (will be added by Alembic migrations)
-- These are just examples of what we'll need

-- Example: Index for user lookups
-- CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
-- CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

-- Example: Index for leaderboard queries
-- CREATE INDEX IF NOT EXISTS idx_users_level_xp ON users(level DESC, experience_points DESC);
-- CREATE INDEX IF NOT EXISTS idx_recycling_activities_user_timestamp ON recycling_activities(user_id, timestamp DESC);

-- Example: Index for quest queries
-- CREATE INDEX IF NOT EXISTS idx_quests_type_active ON quests(quest_type, is_active);
-- CREATE INDEX IF NOT EXISTS idx_quest_progress_user_quest ON quest_progress(user_id, quest_id);

-- Set timezone
SET timezone = 'UTC';