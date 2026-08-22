import { supabase, JobRow } from "../db";

// 50 target companies using Lever — major US/UK tech
const LEVER_COMPANIES = [
  "netflix", "lyft", "spotify", "coinbase", "databricks",
  "elastic", "fastly", "reddit", "squarespace", "unity",
  "compass", "benchling", "duolingo", "figma", "github",
  "invision", "khanacademy", "lever", "mailchimp", "opendoor",
  "palantir", "plaid", "robinhood", "scale", "snowflake",
  "splunk", "stripe", "thumbtack", "twitch", "uber",
  "airbnb", "dropbox", "eventbrite", "foursquare", "glassdoor",
  "instacart", "lyft", "medium", "pandora", "pinterest",
  "quora", "slack", "twitter", "whatsapp", "yelp",
  // Indian companies on Lever
  "swiggy", "flipkart", "paytm", "zomato", "byju",
];

type LeverJob = {
  id: string;
  text: string;
  categories: {
    commitment?: string;
    department?: string;
    location?: string;
    team?: string;
  };
  description: string;
  descriptionPlain: string;
  hostedUrl: string;
  createdAt: number;
};

function extractSalaryFromText(text: string): { min: number | null; max: number | null } {
  const match = text.match(/\$(\d{2,3}),?(\d{3})\s*[-–]\s*\$(\d{2,3}),?(\d{3})/);
  if (match) {
    return {
      min: parseInt(match[1] + match[2]),
      max: parseInt(match[3] + match[4]),
    };
  }
  return { min: null, max: null };
}

function extractWorkModel(commitment: string | undefined, location: string | undefined): string {
  const text = ((commitment || "") + " " + (location || "")).toLowerCase();
  if (text.includes("remote")) return "Remote";
  if (text.includes("hybrid")) return "Hybrid";
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

export async function scrapeLever(): Promise<{
  scraped: number;
  inserted: number;
  errors: string[];
}> {
  let totalScraped = 0;
  let totalInserted = 0;
  const errors: string[] = [];

  for (const company of LEVER_COMPANIES) {
    try {
      const res = await fetch(
        `https://api.lever.co/v0/postings/${company}?mode=json`,
        { next: { revalidate: 0 } }
      );

      if (!res.ok) continue;

      const jobs: LeverJob[] = await res.json();
      if (!Array.isArray(jobs)) continue;

      totalScraped += jobs.length;

      const rows: Omit<JobRow, "scraped_at">[] = jobs.map((job) => {
        const plainText = job.descriptionPlain || job.description?.replace(/<[^>]*>/g, "") || "";
        const salary = extractSalaryFromText(plainText);
        const location = job.categories?.location || "Remote";

        return {
          id: `lever-${company}-${job.id}`,
          source: "lever" as const,
          company_name: company.charAt(0).toUpperCase() + company.slice(1),
          role_title: job.text,
          location,
          work_model: extractWorkModel(job.categories?.commitment, location),
          salary_min: salary.min,
          salary_max: salary.max,
          currency: "USD",
          description: plainText.slice(0, 2000),
          required_skills: extractSkills(plainText),
          apply_url: job.hostedUrl,
          posted_date: new Date(job.createdAt).toISOString(),
          is_active: true,
        };
      });

      if (rows.length > 0) {
        const { error } = await supabase
          .from("jobs")
          .upsert(rows, { onConflict: "id", ignoreDuplicates: false });

        if (error) {
          errors.push(`${company}: ${error.message}`);
        } else {
          totalInserted += rows.length;
        }
      }

      await new Promise((r) => setTimeout(r, 200));
    } catch (err: any) {
      errors.push(`${company}: ${err.message}`);
    }
  }

  return { scraped: totalScraped, inserted: totalInserted, errors };
}
