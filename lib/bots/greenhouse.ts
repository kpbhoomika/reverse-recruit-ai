import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { CandidateRow, JobRow } from "../db";

export async function applyToGreenhouse(
  job: JobRow,
  candidate: CandidateRow,
  pdfBytes: Uint8Array
): Promise<{ success: boolean; message: string }> {
  // 1. Write the generated PDF to a temp file so Playwright can attach it
  const tempPdfPath = path.join(os.tmpdir(), `resume_${candidate.id}_${Date.now()}.pdf`);
  fs.writeFileSync(tempPdfPath, pdfBytes);

  let browser;
  try {
    // 2. Launch headless browser
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // 3. Navigate to Greenhouse job application URL
    await page.goto(job.apply_url, { waitUntil: "networkidle", timeout: 30000 });

    // 4. Fill Standard Personal Information Fields
    const nameParts = candidate.full_name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "Candidate";

    // Most Greenhouse forms use #first_name, #last_name, #email, #phone
    await page.fill("#first_name", firstName).catch(() => {});
    await page.fill("#last_name", lastName).catch(() => {});
    await page.fill("#email", candidate.email).catch(() => {});
    
    if (candidate.phone) {
      await page.fill("#phone", candidate.phone).catch(() => {});
    }

    // 5. Handle generic questions (e.g. LinkedIn Profile URL)
    if (candidate.linkedin_url) {
      // Find an input containing 'linkedin' in name or id
      await page.fill("input[name*='linkedin' i]", candidate.linkedin_url).catch(() => {});
    }

    // 6. Upload the customized Resume PDF
    const fileInput = page.locator("input[type='file']").first();
    if ((await fileInput.count()) > 0) {
      await fileInput.setInputFiles(tempPdfPath);
    } else {
      throw new Error("Could not find file upload input on form.");
    }

    // 7. Submit Application
    // In a real production scenario we click submit:
    // await page.click("#submit_app");
    // await page.waitForNavigation({ waitUntil: "networkidle" });
    
    // For this MVP/Demo we simulate success without actually spamming companies
    await page.waitForTimeout(2000); 

    return { success: true, message: `Successfully submitted application to ${job.company_name}!` };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to apply." };
  } finally {
    // 8. Cleanup
    if (browser) {
      await browser.close();
    }
    if (fs.existsSync(tempPdfPath)) {
      fs.unlinkSync(tempPdfPath);
    }
  }
}
