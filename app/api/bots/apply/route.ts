import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { applyToGreenhouse } from "@/lib/bots/greenhouse";
import { applyToLever } from "@/lib/bots/lever";
import { generateResumePDF } from "@/lib/pdf-generator";
import { sendRecruiterOutreach } from "@/lib/email/resend";
import { GoogleGenAI } from "@google/genai";

export const maxDuration = 300;

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

    const { data: match, error: matchError } = await supabase
      .from("matches")
      .select(`*, candidates (*), jobs (*)`)
      .eq("id", matchId)
      .single();

    if (matchError || !match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    const candidate = match.candidates;
    const job = match.jobs;

    if (job.source !== "greenhouse" && job.source !== "lever") {
      return NextResponse.json({ error: "Only Greenhouse and Lever supported currently." }, { status: 400 });
    }

    // 1. Generate customized resume via AI
    let finalResumeText = match.tailored_resume;
    if (!finalResumeText && genAI) {
      const prompt = `You are an expert resume writer. Tailor this candidate's resume for the specific job.
      Candidate Info: ${candidate.resume_text || candidate.skills.join(", ")}
      Target Role: ${job.role_title}
      Job Description: ${job.description}
      Output a clean, ATS-friendly resume in Markdown.`;
      
      const response = await genAI.models.generateContent({ model: "gemini-2.0-flash", contents: prompt });
      finalResumeText = response.text || candidate.resume_text;
      await supabase.from("matches").update({ tailored_resume: finalResumeText }).eq("id", matchId);
    }

    // 2. Convert to PDF
    const pdfBytes = await generateResumePDF(
      candidate.full_name,
      `${candidate.email} | ${candidate.phone || ''}`,
      finalResumeText || candidate.skills.join("\n")
    );

    // 3. Trigger Playwright Bot based on ATS
    let botResult;
    if (job.source === "greenhouse") {
      botResult = await applyToGreenhouse(job, candidate, pdfBytes);
    } else {
      botResult = await applyToLever(job, candidate, pdfBytes);
    }

    if (!botResult.success) {
      return NextResponse.json({ success: false, error: botResult.message }, { status: 500 });
    }

    // 4. Professional Tier: Send Recruiter Outreach via Resend
    let emailSent = false;
    let finalCoverLetter = match.tailored_cover_letter;
    
    if (candidate.tier === "professional") {
      if (!finalCoverLetter && genAI) {
         const prompt = `Write a short, punchy cold email to the hiring manager for ${job.role_title} at ${job.company_name}. Candidate skills: ${candidate.skills.join(", ")}. Do not include Subject line.`;
         const response = await genAI.models.generateContent({ model: "gemini-2.0-flash", contents: prompt });
         finalCoverLetter = response.text || "I am highly interested in this role.";
         await supabase.from("matches").update({ tailored_cover_letter: finalCoverLetter }).eq("id", matchId);
      }
      
      const emailResult = await sendRecruiterOutreach(candidate, job, finalCoverLetter || "");
      if (emailResult.success) emailSent = true;
    }

    // 5. Update DB
    await supabase.from("matches").update({
      applied: true,
      applied_at: new Date().toISOString(),
      status: "applied",
      outreach_sent: emailSent,
      outreach_sent_at: emailSent ? new Date().toISOString() : null
    }).eq("id", matchId);
    
    return NextResponse.json({ success: true, message: botResult.message, emailSent });

  } catch (error: any) {
    console.error("Auto-apply failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
