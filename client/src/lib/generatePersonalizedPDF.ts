import { PDFDocument, PDFPage, rgb } from 'pdf-lib';

export interface PillarData {
  id: number;
  title: string;
  subtitle: string;
  responses: Record<string, string>;
}

export async function generatePersonalizedPDF(pillars: PillarData[]): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  
  // Set up colors
  const primaryColor = rgb(79 / 255, 70 / 255, 229 / 255); // Indigo
  const accentColor = rgb(217 / 255, 119 / 255, 6 / 255); // Amber
  const textColor = rgb(15 / 255, 23 / 255, 42 / 255); // Slate
  const lightGray = rgb(226 / 255, 232 / 255, 240 / 255); // Light slate

  // Title Page
  let page = pdfDoc.addPage([612, 792]); // Letter size
  const { height, width } = page.getSize();

  // Add gradient-like background with rectangles
  page.drawRectangle({
    x: 0,
    y: height - 200,
    width: width,
    height: 200,
    color: primaryColor,
  });

  page.drawText('Level Up: The Enlightened Edge', {
    x: 50,
    y: height - 100,
    size: 28,
    color: rgb(1, 1, 1),
    maxWidth: width - 100,
  });

  page.drawText('Personal Brand Workbook', {
    x: 50,
    y: height - 150,
    size: 18,
    color: rgb(1, 1, 1),
  });

  page.drawText('Your Personalized Responses', {
    x: 50,
    y: height - 300,
    size: 24,
    color: textColor,
  });

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  page.drawText(`Generated on ${today}`, {
    x: 50,
    y: height - 350,
    size: 12,
    color: rgb(100 / 255, 100 / 255, 100 / 255),
  });

  page.drawText(
    'This workbook contains your personalized responses to the 9 pillars of personal branding. Use this document as a reference guide for building and communicating your authentic personal brand.',
    {
      x: 50,
      y: height - 420,
      size: 11,
      color: textColor,
      maxWidth: width - 100,
      lineHeight: 16,
    }
  );

  // Table of Contents
  page = pdfDoc.addPage([612, 792]);
  page.drawText('Table of Contents', {
    x: 50,
    y: height - 50,
    size: 20,
    color: primaryColor,
  });

  let yPosition = height - 100;
  pillars.forEach((pillar, index) => {
    page.drawText(`${index + 1}. ${pillar.title}`, {
      x: 70,
      y: yPosition,
      size: 12,
      color: textColor,
    });
    yPosition -= 25;
  });

  // Content Pages
  pillars.forEach((pillar) => {
    page = pdfDoc.addPage([612, 792]);
    let yPos = height - 50;

    // Pillar header
    page.drawRectangle({
      x: 0,
      y: yPos - 40,
      width: width,
      height: 40,
      color: lightGray,
    });

    page.drawText(`Pillar ${pillar.id}: ${pillar.title}`, {
      x: 50,
      y: yPos - 25,
      size: 16,
      color: primaryColor,
    });

    yPos -= 80;

    // Subtitle
    page.drawText(pillar.subtitle, {
      x: 50,
      y: yPos,
      size: 12,
      color: rgb(100, 100, 100),
      maxWidth: width - 100,
    });

    yPos -= 40;

    // Responses
    Object.entries(pillar.responses).forEach(([key, value]) => {
      if (!value) return;

      // Question/Key
      page.drawText(`Q: ${key}`, {
        x: 50,
        y: yPos,
        size: 11,
        color: accentColor,
      });

      yPos -= 20;

      // Answer/Value
      const lines = wrapText(value, 80);
      lines.forEach((line) => {
        if (yPos < 50) {
          page = pdfDoc.addPage([612, 792]);
          yPos = height - 50;
        }

        page.drawText(line, {
          x: 70,
          y: yPos,
          size: 10,
          color: textColor,
          maxWidth: width - 120,
        });

        yPos -= 16;
      });

      yPos -= 10;
    });

    // Add footer
    page.drawText(`© Level Up: The Enlightened Edge | Page ${pdfDoc.getPageCount()}`, {
      x: 50,
      y: 20,
      size: 9,
      color: rgb(150 / 255, 150 / 255, 150 / 255),
    });
  });

  // Summary Page
  page = pdfDoc.addPage([612, 792]);
  page.drawText('Your Personal Brand Summary', {
    x: 50,
    y: height - 50,
    size: 20,
    color: primaryColor,
  });

  let summaryY = height - 120;
  page.drawText('Next Steps:', {
    x: 50,
    y: summaryY,
    size: 14,
    color: accentColor,
  });

  summaryY -= 40;

  const nextSteps = [
    '1. Review your responses and identify key themes and patterns',
    '2. Refine your personal brand statement based on your answers',
    '3. Create or update your LinkedIn profile with your insights',
    '4. Share your brand story with your network and audience',
    '5. Revisit this workbook quarterly to track your growth',
  ];

  nextSteps.forEach((step) => {
    page.drawText(step, {
      x: 70,
      y: summaryY,
      size: 11,
      color: textColor,
      maxWidth: width - 120,
      lineHeight: 18,
    });
    summaryY -= 28;
  });

  summaryY -= 20;
  page.drawText('Connect with Jessica:', {
    x: 50,
    y: summaryY,
    size: 12,
    color: accentColor,
  });

  summaryY -= 25;
  page.drawText('LinkedIn: linkedin.com/in/jessicageniusbutler/', {
    x: 70,
    y: summaryY,
    size: 10,
    color: textColor,
  });

  summaryY -= 20;
  page.drawText('Substack: freethinkinggenius.substack.com', {
    x: 70,
    y: summaryY,
    size: 10,
    color: textColor,
  });

  // Generate PDF
  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes as any], { type: 'application/pdf' });
}

/**
 * Helper function to wrap text to fit within a specified character width
 */
function wrapText(text: string, charWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    if ((currentLine + word).length > charWidth) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += (currentLine ? ' ' : '') + word;
    }
  });

  if (currentLine) lines.push(currentLine.trim());
  return lines;
}
