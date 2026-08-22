import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const role = req.nextUrl.searchParams.get("role") || "";
    const location = req.nextUrl.searchParams.get("location") || "";
    const source = req.nextUrl.searchParams.get("source") || "";

    let query = supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true)
      .order("posted_date", { ascending: false })
      .limit(100);

    if (role) {
      query = query.ilike("role_title", `%${role}%`);
    }
    if (location) {
      query = query.ilike("location", `%${location}%`);
    }
    if (source) {
      query = query.eq("source", source);
    }

    const { data: jobs, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      syncedAt: new Date().toISOString(),
      activeJobsCount: count || jobs?.length || 0,
      jobs: jobs || [],
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
