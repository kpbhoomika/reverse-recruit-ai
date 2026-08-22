import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.warn("Supabase credentials missing — DB features disabled");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type JobRow = {
  id: string;
  source: "greenhouse" | "lever" | "naukri" | "internshala";
  company_name: string;
  role_title: string;
  location: string | null;
  work_model: string | null;
  salary_min: number | null;
  salary_max: number | null;
  currency: string;
  description: string | null;
  required_skills: string[];
  apply_url: string;
  posted_date: string | null;
  scraped_at: string;
  is_active: boolean;
};

export type CandidateRow = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  linkedin_url: string | null;
  target_roles: string[];
  target_locations: string[];
  min_salary: number | null;
  currency: string;
  skills: string[];
  resume_text: string | null;
  tier: "student" | "professional";
  interviews_guaranteed: number;
  interviews_landed: number;
  applications_submitted: number;
  subscription_active: boolean;
  created_at: string;
};

export type MatchRow = {
  id: string;
  candidate_id: string;
  job_id: string;
  match_score: number;
  tailored_resume: string | null;
  tailored_cover_letter: string | null;
  applied: boolean;
  applied_at: string | null;
  outreach_sent: boolean;
  outreach_sent_at: string | null;
  status: "matched" | "applied" | "screening" | "interview" | "rejected" | "offer";
  created_at: string;
};
