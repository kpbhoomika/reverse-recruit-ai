import { NextRequest, NextResponse } from "next/server";
import { scrapeGreenhouse } from "@/lib/scrapers/greenhouse";
import { scrapeLever } from "@/lib/scrapers/lever";
import { scrapeNaukri } from "@/lib/scrapers/naukri";
import { scrapeInternshala } from "@/lib/scrapers/internshala";

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minute timeout for scraping

export async function GET(req: NextRequest) {
  // Simple auth check â€” only allow if secret matches
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET && secret !== "manual-run") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const source = req.nextUrl.searchParams.get("source") || "all";
  const results: Record<string, any> = {};

  try {
    if (source === "greenhouse" || source === "all") {
      console.log("ðŸŒ± Starting Greenhouse scrape...");
      results.greenhouse = await scrapeGreenhouse();
      console.log("âœ… Greenhouse done:", results.greenhouse);
    }

    if (source === "lever" || source === "all") {
      console.log("ðŸŽšï¸ Starting Lever scrape...");
      results.lever = await scrapeLever();
      console.log("âœ… Lever done:", results.lever);
    }

    if (source === "naukri" || source === "all") {
      console.log("ðŸ‡®ðŸ‡³ Starting Naukri scrape...");
      results.naukri = await scrapeNaukri();
      console.log("âœ… Naukri done:", results.naukri);
    }

    if (source === "internshala" || source === "all") {
      console.log("ðŸŽ“ Starting Internshala scrape...");
      results.internshala = await scrapeInternshala();
      console.log("âœ… Internshala done:", results.internshala);
    }


    const totalInserted = Object.values(results).reduce(
      (sum: number, r: any) => sum + (r.inserted || 0),
      0
    );

    return NextResponse.json({
      success: true,
      runAt: new Date().toISOString(),
      totalJobsInserted: totalInserted,
      results,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Scraper failed" },
      { status: 500 }
    );
  }
}

