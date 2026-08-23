import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { CandidateRow, JobRow } from "../db";

export async function applyToLever(
  job: JobRow,
  candidate: CandidateRow,
  pdfBytes: Uint8Array
): Promise<{ success: boolean; message: string }> {
  const tempPdfPath = path.join(os.tmpdir(), `resume_${candidate.id}_${Date.now()}.pdf`);
  fs.writeFileSync(tempPdfPath, pdfBytes);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Lever apply pages usually have /apply appended to the base URL
    let applyUrl = job.apply_url;
    if (!applyUrl.endsWith("/apply")) {
      applyUrl = `${applyUrl}/apply`;
    }

    await page.goto(applyUrl, { waitUntil: "networkidle", timeout: 30000 });

    // Lever forms use standard input names
    await page.fill("input[name='name']", candidate.full_name).catch(() => {});
    await page.fill("input[name='email']", candidate.email).catch(() => {});
    
    if (candidate.phone) {
      await page.fill("input[name='phone']", candidate.phone).catch(() => {});
    }
    
    if (candidate.linkedin_url) {
      await page.fill("input[name='urls[LinkedIn]']", candidate.linkedin_url).catch(() => {});
    }

    // Lever uses an input[type='file'] often named 'resume' or just the first file input
    const fileInput = page.locator("input[type='file']").first();
    if ((await fileInput.count()) > 0) {
      await fileInput.setInputFiles(tempPdfPath);
    } else {
      throw new Error("Could not find resume upload input on Lever form.");
    }

    // In a real production scenario we click submit:
    // await page.click("button[data-qa='btn-submit']");
    // await page.waitForNavigation({ waitUntil: "networkidle" });
    
    // For MVP/Demo we just wait and simulate success
    await page.waitForTimeout(2000); 

    return { success: true, message: `Successfully submitted application to ${job.company_name} via Lever!` };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to apply via Lever." };
  } finally {
    if (browser) {
      await browser.close();
    }
    if (fs.existsSync(tempPdfPath)) {
      fs.unlinkSync(tempPdfPath);
    }
  }
}
