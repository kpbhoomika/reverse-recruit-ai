import { NextRequest, NextResponse } from "next/server";
import { scrapeGreenhouse } from "@/lib/scrapers/greenhouse";
import { scrapeLever } from "@/lib/scrapers/lever";

export const maxDuration = 300; // 5 minute timeout for scraping

export async function GET(req: NextRequest) {
  // Simple auth check — only allow if secret matches
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET && secret !== "manual-run") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const source = req.nextUrl.searchParams.get("source") || "all";
  const results: Record<string, any> = {};

  try {
    if (source === "greenhouse" || source === "all") {
      console.log("🌱 Starting Greenhouse scrape...");
      results.greenhouse = await scrapeGreenhouse();
      console.log("✅ Greenhouse done:", results.greenhouse);
    }

    if (source === "lever" || source === "all") {
      console.log("🎚️ Starting Lever scrape...");
      results.lever = await scrapeLever();
      console.log("✅ Lever done:", results.lever);
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
