import { NextResponse } from "next/server";
import { optimizeLinkedInProfile } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { currentHeadline, currentAbout, targetRoles, skills } = body;

    const result = await optimizeLinkedInProfile(
      currentHeadline || "Software Engineer",
      currentAbout || "",
      targetRoles || ["Full Stack Developer"],
      skills || ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"]
    );

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to optimize LinkedIn profile" },
      { status: 500 }
    );
  }
}
