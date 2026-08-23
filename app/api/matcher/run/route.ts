import { NextRequest, NextResponse } from "next/server";
import { runMatchingEngine } from "@/lib/matcher";

export const maxDuration = 300;

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.CRON_SECRET && secret !== "manual-run") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("🎯 Starting matching engine...");
    const result = await runMatchingEngine();
    console.log("✅ Matching done:", result);

    return NextResponse.json({
      success: true,
      runAt: new Date().toISOString(),
      ...result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Matching engine failed" },
      { status: 500 }
    );
  }
}
