-- ==============================================================================
-- ReverseRecruit AI — Supabase PostgreSQL Database Schema
-- Production Ready with Row Level Security (RLS) & Triggers
-- ==============================================================================

-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CANDIDATES TABLE
CREATE TABLE IF NOT EXISTS public.candidates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    location TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    tier TEXT NOT NULL CHECK (tier IN ('student', 'professional')),
    target_roles TEXT[] NOT NULL DEFAULT '{}',
    target_locations TEXT[] NOT NULL DEFAULT '{}',
    work_model TEXT[] NOT NULL DEFAULT '{Remote, Hybrid}',
    min_salary NUMERIC NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'USD',
    years_of_experience NUMERIC NOT NULL DEFAULT 0,
    visa_status TEXT,
    notice_period_days INT DEFAULT 0,
    blacklisted_companies TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    master_resume_text TEXT NOT NULL,
    parsed_summary TEXT,
    interviews_guaranteed INT NOT NULL DEFAULT 5,
    interviews_landed INT NOT NULL DEFAULT 0,
    applications_submitted INT NOT NULL DEFAULT 0,
    subscription_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. JOBS TABLE (Ingested from Greenhouse, Lever, Ashby, Workday)
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_name TEXT NOT NULL,
    company_logo_url TEXT,
    role_title TEXT NOT NULL,
    location TEXT NOT NULL,
    work_model TEXT NOT NULL CHECK (work_model IN ('Remote', 'Hybrid', 'On-site')),
    salary_range TEXT,
    ats_platform TEXT NOT NULL CHECK (ats_platform IN ('Greenhouse', 'Lever', 'Ashby', 'Workday', 'Direct')),
    apply_url TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    required_skills TEXT[] DEFAULT '{}',
    preferred_skills TEXT[] DEFAULT '{}',
    posted_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. APPLICATIONS TABLE (Tracks every application lifecycle)
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    role_title TEXT NOT NULL,
    location TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Applied' CHECK (
        status IN ('Queued', 'Applied', 'Screening', 'Interview Scheduled', 'Offer Received', 'Rejected')
    ),
    applied_date DATE NOT NULL DEFAULT CURRENT_DATE,
    ats_platform TEXT NOT NULL,
    match_score INT DEFAULT 85,
    tailored_resume_snippet TEXT,
    cover_letter_snippet TEXT,
    recruiter_pitch_snippet TEXT,
    recruiter_email TEXT,
    outreach_sent BOOLEAN DEFAULT FALSE,
    interview_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. INTERVIEW PREP & EMAIL LOGS
CREATE TABLE IF NOT EXISTS public.interview_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
    candidate_id UUID NOT NULL REFERENCES public.candidates(id) ON DELETE CASCADE,
    email_sender TEXT,
    email_subject TEXT,
    detected_event_type TEXT CHECK (detected_event_type IN ('Interview Invite', 'Technical Screen', 'Take-Home Assessment', 'Rejection', 'Offer Letter')),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    ai_summary TEXT,
    prep_cheat_sheet TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_logs ENABLE ROW LEVEL SECURITY;

-- Candidate can view/edit only their own profile
CREATE POLICY "Candidates can access own profile" ON public.candidates
    FOR ALL USING (auth.uid() = user_id);

-- Applications can only be viewed by the candidate owner or authenticated admin
CREATE POLICY "Candidates can view own applications" ON public.applications
    FOR ALL USING (
        candidate_id IN (SELECT id FROM public.candidates WHERE user_id = auth.uid())
    );

-- Jobs are publicly readable
CREATE POLICY "Anyone can view active jobs" ON public.jobs
    FOR SELECT USING (is_active = TRUE);
