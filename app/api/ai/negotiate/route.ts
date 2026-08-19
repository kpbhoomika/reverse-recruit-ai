import { NextResponse } from "next/server";
import { analyzeOfferAndNegotiate } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyName, roleTitle, baseSalary, signingBonus, equityValueYear, yoe, location } = body;

    const result = await analyzeOfferAndNegotiate(
      companyName || "Tech Company",
      roleTitle || "Software Engineer",
      Number(baseSalary) || 120000,
      Number(signingBonus) || 0,
      Number(equityValueYear) || 0,
      Number(yoe) || 2,
      location || "Remote / USA"
    );

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to analyze offer" },
      { status: 500 }
    );
  }
}
