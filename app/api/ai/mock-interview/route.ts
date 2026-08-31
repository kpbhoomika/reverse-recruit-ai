import { NextRequest, NextResponse } from "next/server";
import { generateInterviewQuestions, runHiringManagerEvaluation } from "@/lib/gemini";
import { InterviewPersona } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const roleTitle = searchParams.get("roleTitle") || "Senior Full Stack Engineer";
    const persona = (searchParams.get("persona") || "faang_director") as InterviewPersona;

    const questions = await generateInterviewQuestions(roleTitle, persona);
    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Error in mock interview question generator:", error);
    return NextResponse.json(
      { error: "Failed to generate interview questions." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { mode, roleTitle, persona, question, candidateAnswer } = body;

    if (mode === "questions") {
      const questions = await generateInterviewQuestions(
        roleTitle || "Senior Full Stack Engineer",
        (persona || "faang_director") as InterviewPersona
      );
      return NextResponse.json({ questions });
    }

    if (!question || !candidateAnswer) {
      return NextResponse.json(
        { error: "Both question and candidateAnswer are required." },
        { status: 400 }
      );
    }

    const result = await runHiringManagerEvaluation(
      roleTitle || "Senior Full Stack Engineer",
      (persona || "faang_director") as InterviewPersona,
      question,
      candidateAnswer
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in hiring manager evaluation API:", error);
    return NextResponse.json(
      { error: "Failed to evaluate candidate interview answer." },
      { status: 500 }
    );
  }
}
