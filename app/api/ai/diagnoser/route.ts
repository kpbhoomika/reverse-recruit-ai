import { NextRequest, NextResponse } from "next/server";
import { runStructuralDiagnostic } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { resumeText, targetRole } = await req.json();

    if (!resumeText || typeof resumeText !== "string") {
      return NextResponse.json(
        { error: "resumeText is required and must be a string." },
        { status: 400 }
      );
    }

    const result = await runStructuralDiagnostic(resumeText, targetRole || "Software Engineer");
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in diagnoser API:", error);
    return NextResponse.json(
      { error: "Failed to process structural diagnostic." },
      { status: 500 }
    );
  }
}
