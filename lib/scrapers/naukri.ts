import { supabase, JobRow } from "../db";

/**
 * Scrapes RemoteOK and Remotive — both 100% free APIs, no auth needed.
 * These are remote-first global jobs — exactly what Indian candidates want
 * when applying to US/UK/Canada/Australia companies from India.
 */

const TECH_KEYWORDS = [
  "React","TypeScript","JavaScript","Python","Java","Go","Node.js",
  "Next.js","GraphQL","PostgreSQL","MySQL","MongoDB","Redis","AWS","GCP",
  "Azure","Docker","Kubernetes","Terraform","CI/CD","REST","API",
  "Machine Learning","AI","SQL","Kafka","Android","iOS","Flutter",
  "Spring Boot","FastAPI","Django","Ruby","Scala","Rust","Vue",
];

function extractSkills(text: string): string[] {
  return TECH_KEYWORDS.filter((kw) =>
    text.toLowerCase().includes(kw.toLowerCase())
  );
}

// ─────────────────────────────────────────────────────────────
// 1. RemoteOK API — https://remoteok.io/api (totally free, open)
// ─────────────────────────────────────────────────────────────
async function scrapeRemoteOK(): Promise<Omit<JobRow, "scraped_at">[]> {
  const res = await fetch("https://remoteok.io/api", {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      "Accept": "application/json",
    },
  });

  if (!res.ok) throw new Error(`RemoteOK: HTTP ${res.status}`);

  const data = await res.json();
  // First element is a legal notice object, skip it
  const jobs = Array.isArray(data) ? data.slice(1) : [];

  return jobs
    .filter((job: any) => job.id && job.position)
    .map((job: any) => ({
      id: `remoteok-${job.id}`,
      source: "naukri" as const, // categorised as Indian-targeting source
      company_name: job.company || "Remote Company",
      role_title: job.position,
      location: "Remote (Global)",
      work_model: "Remote",
      salary_min: job.salary_min ? parseInt(job.salary_min) : null,
      salary_max: job.salary_max ? parseInt(job.salary_max) : null,
      currency: "USD",
      description: (job.description || "").replace(/<[^>]*>/g, "").slice(0, 2000),
      required_skills: [
        ...(job.tags || []),
        ...extractSkills(job.description || ""),
      ].slice(0, 20),
      apply_url: job.url || `https://remoteok.io/remote-jobs/${job.id}`,
      posted_date: job.date ? new Date(job.date).toISOString() : new Date().toISOString(),
      is_active: true,
    }));
}

// ─────────────────────────────────────────────────────────────
// 2. Remotive API — https://remotive.com/api/remote-jobs (free, open)
// ─────────────────────────────────────────────────────────────
const REMOTIVE_CATEGORIES = [
  "software-dev",
  "data",
  "devops",
  "mobile",
  "product",
];

async function scrapeRemotive(): Promise<Omit<JobRow, "scraped_at">[]> {
  const allJobs: Omit<JobRow, "scraped_at">[] = [];

  for (const category of REMOTIVE_CATEGORIES) {
    try {
      const res = await fetch(
        `https://remotive.com/api/remote-jobs?category=${category}&limit=50`,
        {
          headers: {
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0",
          },
        }
      );

      if (!res.ok) continue;

      const data = await res.json();
      const jobs = data?.jobs || [];

      for (const job of jobs) {
        allJobs.push({
          id: `remotive-${job.id}`,
          source: "naukri" as const,
          company_name: job.company_name || "Remote Company",
          role_title: job.title,
          location: job.candidate_required_location || "Remote (Global)",
          work_model: "Remote",
          salary_min: null,
          salary_max: null,
          currency: "USD",
          description: (job.description || "").replace(/<[^>]*>/g, "").slice(0, 2000),
          required_skills: extractSkills(job.description || job.title || ""),
          apply_url: job.url,
          posted_date: job.publication_date ? new Date(job.publication_date).toISOString() : new Date().toISOString(),
          is_active: true,
        });
      }

      await new Promise((r) => setTimeout(r, 300));
    } catch (_) {
      continue;
    }
  }

  return allJobs;
}

// ─────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────
export async function scrapeNaukri(): Promise<{
  scraped: number;
  inserted: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let totalInserted = 0;
  const allRows: Omit<JobRow, "scraped_at">[] = [];

  // 1. RemoteOK
  try {
    const remoteOKJobs = await scrapeRemoteOK();
    allRows.push(...remoteOKJobs);
  } catch (err: any) {
    errors.push(`RemoteOK: ${err.message}`);
  }

  // 2. Remotive
  try {
    const remotiveJobs = await scrapeRemotive();
    allRows.push(...remotiveJobs);
  } catch (err: any) {
    errors.push(`Remotive: ${err.message}`);
  }

  // Deduplicate by id
  const seen = new Set<string>();
  const uniqueRows = allRows.filter((row) => {
    if (seen.has(row.id)) return false;
    seen.add(row.id);
    return true;
  });

  // Save to Supabase in batches of 100
  for (let i = 0; i < uniqueRows.length; i += 100) {
    const batch = uniqueRows.slice(i, i + 100);
    const { error } = await supabase
      .from("jobs")
      .upsert(batch, { onConflict: "id", ignoreDuplicates: true });

    if (error) {
      errors.push(`DB insert batch ${i}: ${error.message}`);
    } else {
      totalInserted += batch.length;
    }
  }

  return {
    scraped: uniqueRows.length,
    inserted: totalInserted,
    errors,
  };
}
