-- ============================================================
-- ReverseRecruit AI — Supabase Database Schema
-- Run this entire SQL in Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- JOBS TABLE: Stores all scraped job listings
CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL CHECK (source IN ('greenhouse', 'lever', 'naukri', 'internshala')),
  company_name TEXT NOT NULL,
  role_title TEXT NOT NULL,
  location TEXT,
  work_model TEXT DEFAULT 'On-site',
  salary_min INTEGER,
  salary_max INTEGER,
  currency TEXT DEFAULT 'USD',
  description TEXT,
  required_skills TEXT[] DEFAULT '{}',
  apply_url TEXT NOT NULL,
  posted_date TIMESTAMPTZ,
  scraped_at TIMESTAMPTZ DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Index for fast role-based searching
CREATE INDEX IF NOT EXISTS idx_jobs_role ON jobs USING GIN (to_tsvector('english', role_title));
CREATE INDEX IF NOT EXISTS idx_jobs_source ON jobs (source);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs (is_active);
CREATE INDEX IF NOT EXISTS idx_jobs_posted ON jobs (posted_date DESC);

-- CANDIDATES TABLE: Stores all paying clients
CREATE TABLE IF NOT EXISTS candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  linkedin_url TEXT,
  target_roles TEXT[] DEFAULT '{}',
  target_locations TEXT[] DEFAULT '{}',
  min_salary INTEGER,
  currency TEXT DEFAULT 'USD',
  skills TEXT[] DEFAULT '{}',
  resume_text TEXT,
  tier TEXT DEFAULT 'student' CHECK (tier IN ('student', 'professional')),
  interviews_guaranteed INTEGER DEFAULT 5,
  interviews_landed INTEGER DEFAULT 0,
  applications_submitted INTEGER DEFAULT 0,
  subscription_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_candidates_email ON candidates (email);
CREATE INDEX IF NOT EXISTS idx_candidates_active ON candidates (subscription_active);

-- MATCHES TABLE: Tracks which jobs have been matched/applied for each candidate
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
  job_id TEXT REFERENCES jobs(id) ON DELETE CASCADE,
  match_score INTEGER DEFAULT 0,
  tailored_resume TEXT,
  tailored_cover_letter TEXT,
  applied BOOLEAN DEFAULT FALSE,
  applied_at TIMESTAMPTZ,
  outreach_sent BOOLEAN DEFAULT FALSE,
  outreach_sent_at TIMESTAMPTZ,
  status TEXT DEFAULT 'matched' CHECK (status IN ('matched','applied','screening','interview','rejected','offer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(candidate_id, job_id)
);

CREATE INDEX IF NOT EXISTS idx_matches_candidate ON matches (candidate_id);
CREATE INDEX IF NOT EXISTS idx_matches_applied ON matches (applied);
CREATE INDEX IF NOT EXISTS idx_matches_status ON matches (status);

-- Enable Row Level Security (allows public reads for now)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Allow the anon key to read/write everything (for now — tighten later)
CREATE POLICY "Allow all for anon" ON jobs FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON candidates FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON matches FOR ALL TO anon USING (true) WITH CHECK (true);

-- ============================================================
-- Verify tables were created:
-- SELECT table_name FROM information_schema.tables 
-- WHERE table_schema = 'public';
-- ============================================================
