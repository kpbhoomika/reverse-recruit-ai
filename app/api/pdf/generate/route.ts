import { NextRequest, NextResponse } from "next/server";
import { generateResumePDF } from "@/lib/pdf-generator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, contactInfo, resumeText } = body;

    if (!resumeText) {
      return NextResponse.json({ error: "Missing resumeText" }, { status: 400 });
    }

    const name = fullName || "Candidate";
    const contact = contactInfo || "contact@example.com";

    const pdfBytes = await generateResumePDF(name, contact, resumeText);

    // Return the generated PDF directly as a file download
    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${name.replace(/\s+/g, "_")}_resume.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("PDF generation failed:", error);
    return NextResponse.json(
      { error: error.message || "PDF generation failed" },
      { status: 500 }
    );
  }
}
