-- Add dm_users column to channels table
ALTER TABLE channels ADD COLUMN IF NOT EXISTS dm_users uuid[];

-- Set replica identity for proper DELETE events (if not already set)
ALTER TABLE messages REPLICA IDENTITY FULL;
ALTER TABLE reactions REPLICA IDENTITY FULL;
ALTER TABLE channels REPLICA IDENTITY FULL;