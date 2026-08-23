import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { applyToGreenhouse } from "@/lib/bots/greenhouse";
import { generateResumePDF } from "@/lib/pdf-generator";
import { GoogleGenAI } from "@google/genai";

export const maxDuration = 300; // Allow 5 minutes for Playwright & AI

// We initialize the Google Gen AI client for on-the-fly tailoring
const apiKey = process.env.GEMINI_API_KEY;
let genAI: any = null;
if (apiKey) {
  genAI = new GoogleGenAI({ apiKey });
}

export async function POST(req: NextRequest) {
  try {
    const { matchId } = await req.json();

    if (!matchId) {
      return NextResponse.json({ error: "Missing matchId" }, { status: 400 });
    }

    // 1. Fetch match, job, and candidate from DB
    const { data: match, error: matchError } = await supabase
      .from("matches")
      .select(`
        *,
        candidates (*),
        jobs (*)
      `)
      .eq("id", matchId)
      .single();

    if (matchError || !match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    const candidate = match.candidates;
    const job = match.jobs;

    // Only greenhouse is supported for this bot so far
    if (job.source !== "greenhouse") {
      return NextResponse.json({ error: "Only Greenhouse supported for auto-apply currently." }, { status: 400 });
    }

    // 2. Generate customized resume text via Gemini (if not already done)
    let finalResumeText = match.tailored_resume;
    
    if (!finalResumeText && genAI) {
      const prompt = `
      You are an expert resume writer. Tailor this candidate's resume for the specific job.
      
      Candidate Info: ${candidate.resume_text || candidate.skills.join(", ")}
      Target Role: ${job.role_title}
      Job Description: ${job.description}
      
      Output a clean, ATS-friendly resume in Markdown.
      `;
      const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt
      });
      finalResumeText = response.text || candidate.resume_text;
      
      // Update DB with tailored text
      await supabase.from("matches").update({ tailored_resume: finalResumeText }).eq("id", matchId);
    }

    // 3. Convert tailored text to PDF Buffer
    const pdfBytes = await generateResumePDF(
      candidate.full_name,
      `${candidate.email} | ${candidate.phone || ''}`,
      finalResumeText || candidate.skills.join("\n")
    );

    // 4. Trigger Playwright Bot
    const botResult = await applyToGreenhouse(job, candidate, pdfBytes);

    if (botResult.success) {
      // 5. Update DB that application was sent
      await supabase.from("matches").update({
        applied: true,
        applied_at: new Date().toISOString(),
        status: "applied"
      }).eq("id", matchId);
      
      return NextResponse.json({ success: true, message: botResult.message });
    } else {
      return NextResponse.json({ success: false, error: botResult.message }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Auto-apply failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
