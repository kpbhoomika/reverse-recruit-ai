import { supabase, JobRow } from "../db";

// Internshala search categories — covers students + freshers
const INTERNSHALA_SEARCHES = [
  { category: "computer-science", label: "Computer Science" },
  { category: "web-development", label: "Web Development" },
  { category: "python", label: "Python" },
  { category: "machine-learning", label: "Machine Learning" },
  { category: "app-development", label: "App Development" },
  { category: "data-science", label: "Data Science" },
  { category: "artificial-intelligence", label: "AI" },
  { category: "javascript", label: "JavaScript" },
  { category: "reactjs", label: "ReactJS" },
  { category: "nodejs", label: "NodeJS" },
  { category: "java", label: "Java" },
  { category: "android", label: "Android Development" },
  { category: "ios", label: "iOS Development" },
  { category: "ui-ux-design", label: "UI/UX Design" },
  { category: "devops", label: "DevOps" },
];

type InternshalaPosting = {
  id: number;
  title: string;
  company_name: string;
  location_names: string[];
  stipend: { salary: string };
  start_date: string;
  duration: string;
  skills: string[];
  is_remote: boolean;
  cover_letter_requirement: string;
  url_template: string;
};

function parseStipend(stipendStr: string): number | null {
  if (!stipendStr) return null;
  // e.g. "₹ 5,000 /month" or "10000-15000"
  const match = stipendStr.replace(/,/g, "").match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}

export async function scrapeInternshala(): Promise<{
  scraped: number;
  inserted: number;
  errors: string[];
}> {
  let totalScraped = 0;
  let totalInserted = 0;
  const errors: string[] = [];
  const seenIds = new Set<string>();

  for (const search of INTERNSHALA_SEARCHES) {
    try {
      // Internshala's internal API for listing internships
      const url = `https://internshala.com/internships/${search.category}-internship/`;

      const res = await fetch(url, {
        headers: {
          "Accept": "text/html,application/xhtml+xml",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Referer": "https://internshala.com/",
        },
      });

      if (!res.ok) {
        errors.push(`Internshala ${search.category}: HTTP ${res.status}`);
        continue;
      }

      const html = await res.text();

      // Extract internship data from embedded JSON in page
      const jsonMatch = html.match(/var\s+internships_data\s*=\s*({[\s\S]*?});\s*var/);
      if (!jsonMatch) {
        // Try alternative API endpoint
        const apiRes = await fetch(
          `https://internshala.com/internships/matching-preferences/page-1`,
          {
            headers: {
              "Accept": "application/json",
              "X-Requested-With": "XMLHttpRequest",
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
              "Referer": `https://internshala.com/internships/${search.category}-internship/`,
            },
          }
        );
        if (!apiRes.ok) continue;
      }

      // Parse listing cards from HTML
      const titleMatches = html.matchAll(/<div[^>]*class="[^"]*internship-meta[^"]*"[^>]*>[\s\S]*?<h3[^>]*>\s*<a[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g);
      const companyMatches = html.matchAll(/class="[^"]*company-name[^"]*"[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/g);
      const stipendMatches = html.matchAll(/class="[^"]*stipend[^"]*"[^>]*>([\s\S]*?)<\/span>/g);

      const titles = Array.from(titleMatches);
      const companies = Array.from(companyMatches);

      totalScraped += titles.length;

      const rows: Omit<JobRow, "scraped_at">[] = [];

      titles.forEach((match, i) => {
        const url = match[1];
        const title = match[2]?.trim();
        const company = companies[i]?.[1]?.trim() || "Company";
        const idMatch = url.match(/internship-detail\/(\d+)/);
        const id = idMatch ? idMatch[1] : `${i}-${search.category}`;

        if (seenIds.has(id)) return;
        seenIds.add(id);

        rows.push({
          id: `internshala-${id}`,
          source: "internshala",
          company_name: company,
          role_title: title || `${search.label} Internship`,
          location: "India (Remote / On-site)",
          work_model: html.includes("Work from home") ? "Remote" : "On-site",
          salary_min: 5000,  // default stipend estimate
          salary_max: 20000,
          currency: "INR",
          description: `${search.label} internship opportunity. Skills required: ${search.label}.`,
          required_skills: [search.label],
          apply_url: `https://internshala.com${url}`,
          posted_date: new Date().toISOString(),
          is_active: true,
        });
      });

      if (rows.length > 0) {
        const { error } = await supabase
          .from("jobs")
          .upsert(rows, { onConflict: "id", ignoreDuplicates: true });

        if (error) {
          errors.push(`Internshala insert: ${error.message}`);
        } else {
          totalInserted += rows.length;
        }
      }

      await new Promise((r) => setTimeout(r, 600));
    } catch (err: any) {
      errors.push(`Internshala ${search.category}: ${err.message}`);
    }
  }

  return { scraped: totalScraped, inserted: totalInserted, errors };
}
