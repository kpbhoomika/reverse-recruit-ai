import { Resend } from "resend";
import { CandidateRow, JobRow } from "../db";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export async function sendRecruiterOutreach(
  candidate: CandidateRow,
  job: JobRow,
  coverLetter: string
) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith("re_placeholder")) {
    console.warn("No RESEND_API_KEY configured. Skipping actual email delivery.");
    return { success: true, skipped: true };
  }

  try {
    // In a full production app, you would scrape or buy the hiring manager's email.
    // For this demonstration, we simulate sending it to the company by BCCing the candidate
    // so they have a record of the outreach sent on their behalf.
    
    const { data, error } = await resend.emails.send({
      from: "ReverseRecruit AI <outreach@reverserecruit.ai>",
      to: candidate.email, // Simulating delivery by sending to the candidate
      subject: `Application for ${job.role_title} at ${job.company_name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <p>Hi Hiring Team at ${job.company_name},</p>
          <div>
            ${coverLetter.replace(/\n/g, "<br/>")}
          </div>
          <br/>
          <p>Best regards,<br/>
          <strong>${candidate.full_name}</strong><br/>
          <a href="${candidate.linkedin_url || ''}">${candidate.linkedin_url || ''}</a>
          </p>
          <hr/>
          <small style="color: #888;">
            Sent automatically by ReverseRecruit AI on behalf of ${candidate.full_name}.
          </small>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("Resend try/catch Error:", err);
    return { success: false, error: err.message };
  }
}
