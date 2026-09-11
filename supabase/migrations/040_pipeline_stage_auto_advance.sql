-- ============================================================
-- 040_pipeline_stage_auto_advance.sql — Auto-advance pipeline stages
--
-- Adds auto-advance configuration to pipeline_stages:
--   - auto_advance: boolean flag to enable auto-advance
--   - next_stage_id: UUID reference to the next stage
--
-- Idempotent migration — safe to run multiple times.
-- ============================================================

-- Add auto_advance column (default false)
ALTER TABLE pipeline_stages
  ADD COLUMN IF NOT EXISTS auto_advance BOOLEAN NOT NULL DEFAULT FALSE;

-- Add next_stage_id column (nullable, FK to self)
ALTER TABLE pipeline_stages
  ADD COLUMN IF NOT EXISTS next_stage_id UUID REFERENCES pipeline_stages(id) ON DELETE SET NULL;

-- Index for quick lookups when processing stage changes
CREATE INDEX IF NOT EXISTS idx_pipeline_stages_auto_advance
  ON pipeline_stages(id) WHERE auto_advance = TRUE;
