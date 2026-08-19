import { NextResponse } from "next/server";
import { initialJobs } from "@/lib/mock-data";

export async function GET() {
  try {
    // In production, this pulls live Greenhouse/Lever/Ashby feeds
    // and stores new jobs into Supabase
    return NextResponse.json({
      success: true,
      syncedAt: new Date().toISOString(),
      activeJobsCount: initialJobs.length,
      jobs: initialJobs,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to sync jobs" },
      { status: 500 }
    );
  }
}
