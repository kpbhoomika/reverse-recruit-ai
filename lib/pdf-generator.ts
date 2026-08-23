import { PDFDocument, StandardFonts, rgb, PDFFont } from 'pdf-lib';

/**
 * Converts a plain-text/markdown resume into a properly formatted PDF.
 * This is used to dynamically generate ATS-friendly PDFs for auto-applying to Greenhouse/Lever.
 */
export async function generateResumePDF(
  fullName: string,
  contactInfo: string,
  resumeText: string
): Promise<Uint8Array> {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  
  // Embed standard fonts (Helvetica is ATS safe)
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // A4 size setup
  let page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();
  const margin = 50;
  let y = height - margin;

  // Helper to draw text and handle page breaks
  const drawText = (text: string, size: number, fontFace: PDFFont, xOffset: number = 0) => {
    if (y < margin + 20) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = height - margin;
    }
    page.drawText(text, { x: margin + xOffset, y, size, font: fontFace, color: rgb(0, 0, 0) });
    y -= (size + 6);
  };

  // 1. Draw Header
  drawText(fullName || "Candidate", 24, boldFont);
  drawText(contactInfo || "", 10, font);
  y -= 15; // Extra spacing after header

  // 2. Draw Body (Parse basic markdown-like structures)
  const lines = resumeText.split('\n');
  
  for (let line of lines) {
    line = line.replace(/\r/g, ''); // clean carriage returns
    
    // Empty line
    if (line.trim() === '') {
      y -= 8;
      continue;
    }

    // Markdown Heading (e.g. "## Experience" or "EXPERIENCE")
    if (line.startsWith('#') || line === line.toUpperCase()) {
      const heading = line.replace(/^#+\s*/, '').trim();
      y -= 8; // spacing before heading
      drawText(heading, 14, boldFont);
      y -= 2; // small spacing after heading
    } 
    // Markdown Bullet points
    else if (line.startsWith('-') || line.startsWith('*')) {
      const bulletText = line.substring(1).trim();
      // Simple word wrapping for bullet points (~80 chars per line)
      const words = bulletText.split(' ');
      let currentLine = '';
      
      for (let i = 0; i < words.length; i++) {
        if (currentLine.length + words[i].length > 80) {
          drawText(currentLine ? `• ${currentLine.trim()}` : `• ${words[i]}`, 10, font, 15);
          currentLine = currentLine ? words[i] + ' ' : '';
        } else {
          currentLine += words[i] + ' ';
        }
      }
      if (currentLine.trim()) {
        drawText(`• ${currentLine.trim()}`, 10, font, 15);
      }
    } 
    // Normal Text
    else {
      // Simple word wrapping for normal paragraphs
      const words = line.split(' ');
      let currentLine = '';
      
      for (const word of words) {
        if (currentLine.length + word.length > 85) {
          drawText(currentLine.trim(), 10, font);
          currentLine = word + ' ';
        } else {
          currentLine += word + ' ';
        }
      }
      if (currentLine.trim()) {
        drawText(currentLine.trim(), 10, font);
      }
    }
  }

  // Serialize the PDF to bytes
  return await pdfDoc.save();
}
