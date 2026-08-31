import { NextRequest, NextResponse } from "next/server";
import { runGoogleXYZRewriter } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { bullets, targetRole } = await req.json();

    if (!bullets) {
      return NextResponse.json(
        { error: "bullets input is required." },
        { status: 400 }
      );
    }

    const result = await runGoogleXYZRewriter(
      bullets,
      targetRole || "Senior Software Engineer"
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in Google XYZ rewriter API:", error);
    return NextResponse.json(
      { error: "Failed to rewrite bullets in Google XYZ format." },
      { status: 500 }
    );
  }
}
