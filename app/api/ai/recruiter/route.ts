import { NextRequest, NextResponse } from "next/server";
import { runRecruiterKeywordMatrix } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { resumeText, jobDescription, roleTitle } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Both resumeText and jobDescription are required." },
        { status: 400 }
      );
    }

    const result = await runRecruiterKeywordMatrix(
      resumeText,
      jobDescription,
      roleTitle || "Senior Software Engineer"
    );
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in recruiter keyword matrix API:", error);
    return NextResponse.json(
      { error: "Failed to process recruiter keyword analysis." },
      { status: 500 }
    );
  }
}
