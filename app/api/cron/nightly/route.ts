import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";

// Allow Vercel max execution time (up to 5 mins on Pro)
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");

    // Secure the cron route
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // A real production cron might take hours. 
    // For Vercel Serverless, we trigger asynchronous endpoints or background jobs via QStash/Inngest.
    // For this MVP, we simply kick off the scrapers and matching engine internally, 
    // and process a small batch of auto-applies so it fits in the 5 minute window.

    const origin = req.nextUrl.origin;
    
    // 1. Kick off scrapers in background (don't await fully if it's too long, but we'll await a fast run)
    console.log("Triggering nightly scraper...");
    await fetch(`${origin}/api/scraper/run?secret=manual-run`, { method: 'GET' });

    // 2. Run Matcher to pair new jobs with candidates
    console.log("Triggering matcher engine...");
    await fetch(`${origin}/api/matcher/run?secret=manual-run`, { method: 'GET' });

    // 3. Find top 3 "matched" status items that haven't been applied to yet
    console.log("Processing auto-applies...");
    const { data: topMatches } = await supabase
      .from("matches")
      .select("id")
      .eq("status", "matched")
      .eq("applied", false)
      .order("match_score", { ascending: false })
      .limit(3); // Limit to 3 to avoid Vercel timeout on Playwright

    let appliedCount = 0;
    if (topMatches) {
      for (const match of topMatches) {
        try {
          const applyRes = await fetch(`${origin}/api/bots/apply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matchId: match.id })
          });
          
          if (applyRes.ok) {
            appliedCount++;
          }
        } catch (e) {
          console.error(`Failed to apply match ${match.id}`, e);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Nightly cron executed successfully",
      stats: {
        autoApplicationsSent: appliedCount,
        jobsScraped: "Checked via background task",
        candidatesMatched: "Checked via background task"
      }
    });

  } catch (error: any) {
    console.error("Nightly cron failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

