import { PDFDocument, PDFPage, rgb, PDFFont } from 'pdf-lib';

interface PillarData {
  id: number;
  title: string;
  subtitle: string;
  exercises: string[];
}

const pillars: PillarData[] = [
  {
    id: 1,
    title: "Who Are You?",
    subtitle: "Define Your Identity Beyond Your Job Title",
    exercises: [
      "Document your strengths acknowledged by others",
      "Identify roles you naturally seek in team settings",
      "Reflect on your go-to skills for overcoming obstacles",
      "Describe your most successful project",
      "Recall your most important team role"
    ]
  },
  {
    id: 2,
    title: "What Do You Stand For?",
    subtitle: "Clarify Your Core Beliefs, Causes You Align With, and Values",
    exercises: [
      "Review and select values that resonate with you",
      "Rank your top five values",
      "Define what each value means to you personally",
      "Rate your alignment with each value (1-5 scale)",
      "Identify one value to focus on for the next 21 days"
    ]
  },
  {
    id: 3,
    title: "What Is Your Personality?",
    subtitle: "How You Express Yourself, Your Tone, Style, and Vibe",
    exercises: [
      "Rate your comfort with being yourself in all situations",
      "Assess your ability to express ideas in groups",
      "Evaluate your professional presence and appearance",
      "Identify two areas for improvement",
      "Create an improvement plan with practice opportunities"
    ]
  },
  {
    id: 4,
    title: "What Do You Focus On?",
    subtitle: "Identify Your Niche or Area of Expertise",
    exercises: [
      "Identify specific problems you enjoy solving",
      "List topics you could discuss for hours",
      "Find where your skills and interests overlap",
      "Define your unique perspective or approach",
      "Connect your passions with your expertise"
    ]
  },
  {
    id: 5,
    title: "Who Are You Speaking To?",
    subtitle: "Know Your Ideal Audience or Community",
    exercises: [
      "Define your ideal audience demographics",
      "Identify their primary challenges and pain points",
      "Determine where they seek information",
      "Understand what communication style resonates with them",
      "Tailor your value offer to their specific needs"
    ]
  },
  {
    id: 6,
    title: "What Makes You Different?",
    subtitle: "Highlight Your Unique Strengths and Perspective",
    exercises: [
      "Identify the specific problems you solve",
      "Define how your unique strengths enable you to solve them",
      "Articulate your core values in your approach",
      "Draft your Unique Promise of Value statement",
      "Refine your elevator pitch"
    ]
  },
  {
    id: 7,
    title: "What Value Do You Offer?",
    subtitle: "Explain How You Help Others or Create Impact",
    exercises: [
      "Identify which super skills you want to showcase",
      "Align your contributions with your core values",
      "Integrate your passions into giving-back opportunities",
      "Draft your branded bio (3-5 sentences)",
      "Describe the benefits others experience from working with you"
    ]
  },
  {
    id: 8,
    title: "How Are You Perceived?",
    subtitle: "Shape the Impression You Leave Behind",
    exercises: [
      "Rate your consistency in following through on promises",
      "Assess your punctuality and reliability",
      "Evaluate your professional communication habits",
      "Review your online and offline presence",
      "Create an impression management audit"
    ]
  },
  {
    id: 9,
    title: "What's Your Story?",
    subtitle: "Share the Journey That Shaped Your Identity",
    exercises: [
      "Reflect on your life journey over the past 10 years",
      "Identify your greatest achievements and accomplishments",
      "Describe challenges you've overcome",
      "Craft your personal narrative in first person",
      "Prepare stories for common interview questions"
    ]
  }
];

export async function generateWorkbookPDF(): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  
  // Set up the document
  const pageWidth = 612; // 8.5 inches
  const pageHeight = 792; // 11 inches
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  
  // Add title page
  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let yPosition = pageHeight - margin;
  
  // Title Page
  page.drawText("PERSONAL BRAND WORKBOOK", {
    x: margin,
    y: yPosition,
    size: 36,
    color: rgb(0.15, 0.25, 0.6), // Indigo
    maxWidth: contentWidth,
  });
  
  yPosition -= 60;
  page.drawText("Build Your Brand From Within", {
    x: margin,
    y: yPosition,
    size: 24,
    color: rgb(0.7, 0.5, 0.2), // Amber
    maxWidth: contentWidth,
  });
  
  yPosition -= 80;
  page.drawText("A Comprehensive Guide to Defining Your Identity, Clarifying Your Values, and Communicating Your Unique Value Proposition", {
    x: margin,
    y: yPosition,
    size: 14,
    color: rgb(0.3, 0.3, 0.3),
    maxWidth: contentWidth,
  });
  
  yPosition -= 120;
  page.drawText("The 9 Pillars of Personal Branding", {
    x: margin,
    y: yPosition,
    size: 16,
    color: rgb(0.15, 0.25, 0.6),
    maxWidth: contentWidth,
  });
  
  yPosition -= 30;
  const pillarList = pillars.map((p) => `${p.id}. ${p.title}`).join("\n");
  page.drawText(pillarList, {
    x: margin,
    y: yPosition,
    size: 11,
    color: rgb(0.4, 0.4, 0.4),
    maxWidth: contentWidth,
    lineHeight: 18,
  });
  
  // Add a page for each pillar
  for (const pillar of pillars) {
    page = pdfDoc.addPage([pageWidth, pageHeight]);
    yPosition = pageHeight - margin;
    
    // Pillar number and title
    page.drawText(`PILLAR ${pillar.id}`, {
      x: margin,
      y: yPosition,
      size: 12,
      color: rgb(0.7, 0.5, 0.2), // Amber
    });
    
    yPosition -= 25;
    page.drawText(pillar.title, {
      x: margin,
      y: yPosition,
      size: 24,
      color: rgb(0.15, 0.25, 0.6), // Indigo
      maxWidth: contentWidth,
    });
    
    yPosition -= 35;
    page.drawText(pillar.subtitle, {
      x: margin,
      y: yPosition,
      size: 12,
      color: rgb(0.5, 0.5, 0.5),
      maxWidth: contentWidth,
    });
    
    yPosition -= 40;
    page.drawText("Exercises & Reflections", {
      x: margin,
      y: yPosition,
      size: 14,
      color: rgb(0.15, 0.25, 0.6),
    });
    
    yPosition -= 25;
    
    // Add exercises with space for responses
    for (let i = 0; i < pillar.exercises.length; i++) {
      const exercise = pillar.exercises[i];
      
      // Exercise number and text
      page.drawText(`${i + 1}. ${exercise}`, {
        x: margin,
        y: yPosition,
        size: 11,
        color: rgb(0.2, 0.2, 0.2),
        maxWidth: contentWidth - 20,
      });
      
      yPosition -= 22;
      
      // Response box
      page.drawRectangle({
        x: margin,
        y: yPosition - 60,
        width: contentWidth,
        height: 60,
        borderColor: rgb(0.85, 0.85, 0.85),
        borderWidth: 1,
      });
      
      yPosition -= 80;
      
      // Check if we need a new page
      if (yPosition < margin + 100) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        yPosition = pageHeight - margin;
      }
    }
    
    // Add reflection space at the end of each pillar
    yPosition -= 10;
    page.drawText("Additional Reflections & Notes", {
      x: margin,
      y: yPosition,
      size: 12,
      color: rgb(0.15, 0.25, 0.6),
    });
    
    yPosition -= 20;
    page.drawRectangle({
      x: margin,
      y: yPosition - 80,
      width: contentWidth,
      height: 80,
      borderColor: rgb(0.85, 0.85, 0.85),
      borderWidth: 1,
    });
  }
  
  // Add final summary page
  page = pdfDoc.addPage([pageWidth, pageHeight]);
  yPosition = pageHeight - margin;
  
  page.drawText("Your Personal Brand Summary", {
    x: margin,
    y: yPosition,
    size: 24,
    color: rgb(0.15, 0.25, 0.6),
    maxWidth: contentWidth,
  });
  
  yPosition -= 40;
  page.drawText("After completing all 9 pillars, use this page to synthesize your findings into a cohesive personal brand statement.", {
    x: margin,
    y: yPosition,
    size: 11,
    color: rgb(0.5, 0.5, 0.5),
    maxWidth: contentWidth,
  });
  
  yPosition -= 40;
  page.drawText("My Personal Brand Statement:", {
    x: margin,
    y: yPosition,
    size: 12,
    color: rgb(0.15, 0.25, 0.6),
  });
  
  yPosition -= 20;
  page.drawRectangle({
    x: margin,
    y: yPosition - 150,
    width: contentWidth,
    height: 150,
    borderColor: rgb(0.85, 0.85, 0.85),
    borderWidth: 1,
  });
  
  yPosition -= 170;
  page.drawText("Key Takeaways:", {
    x: margin,
    y: yPosition,
    size: 12,
    color: rgb(0.15, 0.25, 0.6),
  });
  
  yPosition -= 20;
  page.drawRectangle({
    x: margin,
    y: yPosition - 120,
    width: contentWidth,
    height: 120,
    borderColor: rgb(0.85, 0.85, 0.85),
    borderWidth: 1,
  });
  
  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();
  
  // Convert to Blob
  return new Blob([pdfBytes as any], { type: 'application/pdf' });
}

export async function downloadPDF(): Promise<void> {
  try {
    const pdfBlob = await generateWorkbookPDF();
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Personal-Brand-Workbook.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}
