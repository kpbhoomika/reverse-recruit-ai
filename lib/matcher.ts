import { supabase, CandidateRow, JobRow } from "./db";

/**
 * Calculates match score between a candidate and a job (0–100)
 * Based on: skills overlap, role title match, location match, salary fit
 */
function calculateMatchScore(candidate: CandidateRow, job: JobRow): number {
  let score = 0;

  // 1. Skills overlap (50 points max)
  const candidateSkills = candidate.skills.map((s) => s.toLowerCase());
  const jobSkills = job.required_skills.map((s) => s.toLowerCase());

  if (jobSkills.length > 0) {
    const matched = jobSkills.filter((s) =>
      candidateSkills.some((cs) => cs.includes(s) || s.includes(cs))
    );
    score += Math.round((matched.length / jobSkills.length) * 50);
  } else {
    score += 25; // no skills listed = neutral
  }

  // 2. Role title match (30 points max)
  const jobTitle = job.role_title.toLowerCase();
  const targetRoles = candidate.target_roles.map((r) => r.toLowerCase());

  let titleMatch = 0;
  for (const role of targetRoles) {
    const roleWords = role.split(/\s+/);
    const matchedWords = roleWords.filter((w) => w.length > 3 && jobTitle.includes(w));
    const roleScore = (matchedWords.length / roleWords.length) * 30;
    titleMatch = Math.max(titleMatch, roleScore);
  }
  score += Math.round(titleMatch);

  // 3. Location / work model match (10 points)
  const targetLocations = candidate.target_locations.map((l) => l.toLowerCase());
  const jobLocation = (job.location || "").toLowerCase();
  const jobWorkModel = (job.work_model || "").toLowerCase();

  const isRemoteOk = targetLocations.some((l) => l.includes("remote"));
  const jobIsRemote = jobWorkModel.includes("remote") || jobLocation.includes("remote");

  if (jobIsRemote && isRemoteOk) {
    score += 10;
  } else if (targetLocations.some((l) => jobLocation.includes(l.split(",")[0].trim()))) {
    score += 10;
  } else {
    score += 3; // partial credit
  }

  // 4. Salary fit (10 points)
  if (candidate.min_salary && job.salary_min) {
    // Currency normalisation — rough INR/USD conversion
    let jobSalaryNorm = job.salary_min;
    if (job.currency === "INR" && candidate.currency === "USD") {
      jobSalaryNorm = job.salary_min / 83;
    } else if (job.currency === "USD" && candidate.currency === "INR") {
      jobSalaryNorm = job.salary_min * 83;
    }

    if (jobSalaryNorm >= candidate.min_salary) {
      score += 10;
    } else if (jobSalaryNorm >= candidate.min_salary * 0.8) {
      score += 5; // within 20% of target
    }
  } else {
    score += 5; // unknown salary = neutral
  }

  return Math.min(100, Math.max(0, score));
}

/**
 * Runs the full matching engine:
 * - Reads all active candidates from Supabase
 * - For each candidate, finds top matching jobs from DB
 * - Saves matches to the matches table
 * Returns summary stats
 */
export async function runMatchingEngine(): Promise<{
  candidatesProcessed: number;
  matchesCreated: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let matchesCreated = 0;

  // 1. Get all active candidates
  const { data: candidates, error: candError } = await supabase
    .from("candidates")
    .select("*")
    .eq("subscription_active", true);

  if (candError) {
    return { candidatesProcessed: 0, matchesCreated: 0, errors: [candError.message] };
  }

  if (!candidates || candidates.length === 0) {
    return { candidatesProcessed: 0, matchesCreated: 0, errors: ["No active candidates found"] };
  }

  // 2. For each candidate, find matching jobs
  for (const candidate of candidates as CandidateRow[]) {
    try {
      // Get jobs NOT already matched/applied for this candidate
      const { data: existingMatches } = await supabase
        .from("matches")
        .select("job_id")
        .eq("candidate_id", candidate.id);

      const alreadyMatchedIds = new Set((existingMatches || []).map((m: any) => m.job_id));

      // Build keyword query from candidate's target roles
      const roleKeywords = candidate.target_roles
        .flatMap((r) => r.split(/\s+/))
        .filter((w) => w.length > 3)
        .slice(0, 5);

      // Fetch top 200 relevant jobs from DB
      let jobQuery = supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("posted_date", { ascending: false })
        .limit(200);

      // Filter by currency match (student tier prefers INR, professional can do USD or INR)
      if (candidate.tier === "student") {
        jobQuery = jobQuery.in("currency", ["INR", "USD"]);
      }

      const { data: jobs, error: jobError } = await jobQuery;

      if (jobError || !jobs) continue;

      // Score each job
      const scored = (jobs as JobRow[])
        .filter((job) => !alreadyMatchedIds.has(job.id))
        .map((job) => ({
          job,
          score: calculateMatchScore(candidate, job),
        }))
        .filter((item) => item.score >= 40) // only worthwhile matches
        .sort((a, b) => b.score - a.score)
        .slice(0, 30); // top 30 matches per candidate

      // Save matches to DB
      if (scored.length > 0) {
        const matchRows = scored.map(({ job, score }) => ({
          candidate_id: candidate.id,
          job_id: job.id,
          match_score: score,
          applied: false,
          outreach_sent: false,
          status: "matched",
        }));

        const { error: insertError, data: inserted } = await supabase
          .from("matches")
          .upsert(matchRows, { onConflict: "candidate_id,job_id", ignoreDuplicates: true })
          .select("id");

        if (insertError) {
          errors.push(`Matches for ${candidate.email}: ${insertError.message}`);
        } else {
          matchesCreated += inserted?.length || scored.length;
        }
      }
    } catch (err: any) {
      errors.push(`Candidate ${candidate.email}: ${err.message}`);
    }
  }

  return {
    candidatesProcessed: candidates.length,
    matchesCreated,
    errors,
  };
}

/**
 * Gets top matches for a specific candidate (for dashboard display)
 */
export async function getMatchesForCandidate(candidateId: string, limit = 20) {
  const { data, error } = await supabase
    .from("matches")
    .select(`
      *,
      jobs (
        id, company_name, role_title, location, work_model,
        salary_min, salary_max, currency, required_skills,
        apply_url, source, posted_date
      )
    `)
    .eq("candidate_id", candidateId)
    .order("match_score", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}
