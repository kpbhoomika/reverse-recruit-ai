import { NextResponse } from "next/server";
import { generateCoverLetter } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { candidateName, candidateSkills, companyName, roleTitle, jobDescription } = body;

    if (!companyName || !roleTitle) {
      return NextResponse.json(
        { error: "Missing companyName or roleTitle" },
        { status: 400 }
      );
    }

    const result = await generateCoverLetter(
      candidateName || "Candidate",
      candidateSkills || ["TypeScript", "React", "Node.js"],
      companyName,
      roleTitle,
      jobDescription || "Full Stack Software Engineer role"
    );

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to generate cover letter" },
      { status: 500 }
    );
  }
}
