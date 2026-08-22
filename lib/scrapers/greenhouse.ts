import { supabase, JobRow } from "../db";

// 60 target companies using Greenhouse — US/UK tech + Indian startups
const GREENHOUSE_COMPANIES = [
  // US/UK Tech
  "stripe", "notion", "figma", "linear", "vercel", "retool", "rippling",
  "brex", "ramp", "gusto", "lattice", "loom", "miro", "postman",
  "webflow", "zapier", "airtable", "hubspot", "intercom", "zendesk",
  "shopify", "gitlab", "hashicorp", "cloudflare", "datadog",
  "mongodb", "elastic", "twilio", "okta", "pagerduty",
  "asana", "clickup", "monday", "amplitude", "mixpanel",
  "segment", "braze", "contentful", "sanity", "algolia",
  // Indian Tech Companies on Greenhouse
  "razorpay", "zepto", "meesho", "cred", "phonepe",
  "freshworks", "zoho", "chargebee", "browserstack", "postman",
];

type GreenhouseJob = {
  id: number;
  title: string;
  location: { name: string };
  absolute_url: string;
  updated_at: string;
  content: string;
  departments: { name: string }[];
};

function extractSalary(text: string): { min: number | null; max: number | null } {
  const match = text.match(/\$(\d{2,3}),?(\d{3})\s*[-–]\s*\$(\d{2,3}),?(\d{3})/);
  if (match) {
    return {
      min: parseInt(match[1] + match[2]),
      max: parseInt(match[3] + match[4]),
    };
  }
  return { min: null, max: null };
}

function extractWorkModel(location: string): string {
  const l = location.toLowerCase();
  if (l.includes("remote")) return "Remote";
  if (l.includes("hybrid")) return "Hybrid";
  return "On-site";
}

function extractSkills(description: string): string[] {
  const techKeywords = [
    "React", "TypeScript", "JavaScript", "Python", "Java", "Go", "Rust", "Node.js",
    "Next.js", "GraphQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "AWS", "GCP",
    "Azure", "Docker", "Kubernetes", "Terraform", "CI/CD", "REST", "API",
    "Machine Learning", "AI", "LLM", "Data Science", "SQL", "Kafka", "Spark",
  ];
  return techKeywords.filter((kw) =>
    description.toLowerCase().includes(kw.toLowerCase())
  );
}

export async function scrapeGreenhouse(): Promise<{
  scraped: number;
  inserted: number;
  errors: string[];
}> {
  let totalScraped = 0;
  let totalInserted = 0;
  const errors: string[] = [];

  for (const company of GREENHOUSE_COMPANIES) {
    try {
      const res = await fetch(
        `https://boards-api.greenhouse.io/v1/boards/${company}/jobs?content=true`,
        { next: { revalidate: 0 } }
      );

      if (!res.ok) continue;

      const data = await res.json();
      const jobs: GreenhouseJob[] = data.jobs || [];
      totalScraped += jobs.length;

      const rows: Omit<JobRow, "scraped_at">[] = jobs.map((job) => {
        const salary = extractSalary(job.content || "");
        return {
          id: `greenhouse-${company}-${job.id}`,
          source: "greenhouse" as const,
          company_name: company.charAt(0).toUpperCase() + company.slice(1),
          role_title: job.title,
          location: job.location?.name || "Remote",
          work_model: extractWorkModel(job.location?.name || ""),
          salary_min: salary.min,
          salary_max: salary.max,
          currency: "USD",
          description: job.content ? job.content.replace(/<[^>]*>/g, "").slice(0, 2000) : null,
          required_skills: extractSkills(job.content || ""),
          apply_url: job.absolute_url,
          posted_date: job.updated_at,
          is_active: true,
        };
      });

      if (rows.length > 0) {
        const { error, count } = await supabase
          .from("jobs")
          .upsert(rows, { onConflict: "id", ignoreDuplicates: false })
          .select("id");

        if (error) {
          errors.push(`${company}: ${error.message}`);
        } else {
          totalInserted += rows.length;
        }
      }

      // Rate limit — be polite to their API
      await new Promise((r) => setTimeout(r, 200));
    } catch (err: any) {
      errors.push(`${company}: ${err.message}`);
    }
  }

  return { scraped: totalScraped, inserted: totalInserted, errors };
}
