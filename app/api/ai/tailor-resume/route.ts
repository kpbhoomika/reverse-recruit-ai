import { NextResponse } from "next/server";
import { analyzeAndTailorResume } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { resumeText, jobDescription, targetRole } = body;

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Missing resumeText or jobDescription" },
        { status: 400 }
      );
    }

    const result = await analyzeAndTailorResume(
      resumeText,
      jobDescription,
      targetRole || "Software Engineer"
    );

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to analyze resume" },
      { status: 500 }
    );
  }
}
