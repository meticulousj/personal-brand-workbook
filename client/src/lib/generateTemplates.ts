import { PDFDocument, PDFPage, rgb } from 'pdf-lib';

const primaryColor = rgb(79 / 255, 70 / 255, 229 / 255); // Indigo
const accentColor = rgb(217 / 255, 119 / 255, 6 / 255); // Amber
const textColor = rgb(15 / 255, 23 / 255, 42 / 255); // Slate
const lightGray = rgb(226 / 255, 232 / 255, 240 / 255); // Light slate

interface TemplateConfig {
  title: string;
  subtitle: string;
  sections: TemplateSection[];
}

interface TemplateSection {
  heading: string;
  instructions?: string;
  fields?: string[];
  responseHeight?: number;
}

export async function generatePersonalBrandStatementTemplate(): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([612, 792]);
  const { height, width } = page.getSize();
  let yPos = height - 50;

  // Header
  page.drawRectangle({
    x: 0,
    y: yPos - 40,
    width: width,
    height: 40,
    color: primaryColor,
  });

  page.drawText('Personal Brand Statement Template', {
    x: 50,
    y: yPos - 25,
    size: 18,
    color: rgb(255, 255, 255),
  });

  yPos -= 80;

  // Instructions
  page.drawText('Instructions:', {
    x: 50,
    y: yPos,
    size: 12,
    color: accentColor,
  });

  yPos -= 20;

  const instructions = [
    'Craft a compelling 3-5 sentence statement that captures your unique value proposition.',
    'Include: who you are, what you do, who you serve, and the impact you create.',
    'Make it authentic, memorable, and easy to understand.',
  ];

  instructions.forEach((instruction) => {
    page.drawText(`• ${instruction}`, {
      x: 70,
      y: yPos,
      size: 10,
      color: textColor,
      maxWidth: width - 120,
      lineHeight: 14,
    });
    yPos -= 20;
  });

  yPos -= 20;

  // Response area
  page.drawText('Your Personal Brand Statement:', {
    x: 50,
    y: yPos,
    size: 12,
    color: textColor,
  });

  yPos -= 20;

  // Draw lines for writing
  for (let i = 0; i < 6; i++) {
    page.drawLine({
      start: { x: 50, y: yPos },
      end: { x: width - 50, y: yPos },
      color: lightGray,
      thickness: 1,
    });
    yPos -= 30;
  }

  // Footer
  page.drawText('© Level Up: The Enlightened Edge', {
    x: 50,
    y: 20,
    size: 9,
    color: rgb(150, 150, 150),
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function generateLinkedInChecklistTemplate(): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([612, 792]);
  const { height, width } = page.getSize();
  let yPos = height - 50;

  // Header
  page.drawRectangle({
    x: 0,
    y: yPos - 40,
    width: width,
    height: 40,
    color: primaryColor,
  });

  page.drawText('LinkedIn Profile Optimization Checklist', {
    x: 50,
    y: yPos - 25,
    size: 18,
    color: rgb(255, 255, 255),
  });

  yPos -= 80;

  const sections = [
    {
      title: 'Profile Photo & Banner',
      items: ['Professional headshot with clear face', 'Custom banner image aligned with brand', 'Consistent branding across all elements'],
    },
    {
      title: 'Headline & About',
      items: ['Compelling headline (120 characters max)', 'Clear, authentic About section', 'Include keywords relevant to your niche'],
    },
    {
      title: 'Experience & Skills',
      items: ['Complete work history with descriptions', 'Relevant skills listed and endorsed', 'Accomplishments highlighted with metrics'],
    },
    {
      title: 'Engagement & Content',
      items: ['Regular posts sharing insights', 'Engage with your network\'s content', 'Share articles and thought leadership'],
    },
  ];

  sections.forEach((section) => {
    page.drawText(section.title, {
      x: 50,
      y: yPos,
      size: 12,
      color: accentColor,
    });

    yPos -= 20;

    section.items.forEach((item) => {
      page.drawText(`☐ ${item}`, {
        x: 70,
        y: yPos,
        size: 10,
        color: textColor,
        maxWidth: width - 120,
      });
      yPos -= 18;
    });

    yPos -= 10;
  });

  // Footer
  page.drawText('© Level Up: The Enlightened Edge', {
    x: 50,
    y: 20,
    size: 9,
    color: rgb(150, 150, 150),
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function generateValuesWorksheetTemplate(): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([612, 792]);
  const { height, width } = page.getSize();
  let yPos = height - 50;

  // Header
  page.drawRectangle({
    x: 0,
    y: yPos - 40,
    width: width,
    height: 40,
    color: primaryColor,
  });

  page.drawText('Brand Values Prioritization Worksheet', {
    x: 50,
    y: yPos - 25,
    size: 18,
    color: rgb(255, 255, 255),
  });

  yPos -= 80;

  page.drawText('Step 1: List Your Core Values', {
    x: 50,
    y: yPos,
    size: 12,
    color: accentColor,
  });

  yPos -= 20;

  page.drawText('Write down 8-10 values that are important to you:', {
    x: 50,
    y: yPos,
    size: 10,
    color: textColor,
  });

  yPos -= 25;

  for (let i = 1; i <= 10; i++) {
    page.drawText(`${i}.`, {
      x: 70,
      y: yPos,
      size: 10,
      color: textColor,
    });

    page.drawLine({
      start: { x: 95, y: yPos + 5 },
      end: { x: width - 50, y: yPos + 5 },
      color: lightGray,
      thickness: 1,
    });

    yPos -= 25;
  }

  yPos -= 15;

  page.drawText('Step 2: Rank Your Top 5 Values', {
    x: 50,
    y: yPos,
    size: 12,
    color: accentColor,
  });

  yPos -= 20;

  page.drawText('Prioritize your values from most to least important:', {
    x: 50,
    y: yPos,
    size: 10,
    color: textColor,
  });

  yPos -= 25;

  for (let i = 1; i <= 5; i++) {
    page.drawText(`${i}. `, {
      x: 70,
      y: yPos,
      size: 10,
      color: textColor,
    });

    page.drawLine({
      start: { x: 95, y: yPos + 5 },
      end: { x: width - 50, y: yPos + 5 },
      color: lightGray,
      thickness: 1,
    });

    yPos -= 25;
  }

  // Footer
  page.drawText('© Level Up: The Enlightened Edge', {
    x: 50,
    y: 20,
    size: 9,
    color: rgb(150, 150, 150),
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function generateAudienceCanvasTemplate(): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([612, 792]);
  const { height, width } = page.getSize();
  let yPos = height - 50;

  // Header
  page.drawRectangle({
    x: 0,
    y: yPos - 40,
    width: width,
    height: 40,
    color: primaryColor,
  });

  page.drawText('Audience Analysis Canvas', {
    x: 50,
    y: yPos - 25,
    size: 18,
    color: rgb(255, 255, 255),
  });

  yPos -= 80;

  const sections = [
    { label: 'Who is your ideal audience?', height: 60 },
    { label: 'What are their main challenges?', height: 60 },
    { label: 'What are their goals and aspirations?', height: 60 },
    { label: 'Where do they spend time online?', height: 60 },
    { label: 'What content resonates with them?', height: 60 },
  ];

  sections.forEach((section) => {
    page.drawText(section.label, {
      x: 50,
      y: yPos,
      size: 11,
      color: accentColor,
    });

    yPos -= 20;

    // Draw response box
    page.drawRectangle({
      x: 50,
      y: yPos - section.height,
      width: width - 100,
      height: section.height,
      color: lightGray,
      borderColor: primaryColor,
      borderWidth: 1,
    });

    yPos -= section.height + 20;
  });

  // Footer
  page.drawText('© Level Up: The Enlightened Edge', {
    x: 50,
    y: 20,
    size: 9,
    color: rgb(150, 150, 150),
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function generateUVPWorksheetTemplate(): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([612, 792]);
  const { height, width } = page.getSize();
  let yPos = height - 50;

  // Header
  page.drawRectangle({
    x: 0,
    y: yPos - 40,
    width: width,
    height: 40,
    color: primaryColor,
  });

  page.drawText('Unique Value Proposition Worksheet', {
    x: 50,
    y: yPos - 25,
    size: 18,
    color: rgb(255, 255, 255),
  });

  yPos -= 80;

  const prompts = [
    'What specific skills or expertise do you have?',
    'What problems do you solve for your audience?',
    'What makes your approach different from others?',
    'What results or outcomes do you deliver?',
    'Why should someone choose you over alternatives?',
  ];

  prompts.forEach((prompt, index) => {
    page.drawText(`${index + 1}. ${prompt}`, {
      x: 50,
      y: yPos,
      size: 11,
      color: textColor,
      maxWidth: width - 100,
    });

    yPos -= 25;

    // Draw lines for response
    for (let i = 0; i < 3; i++) {
      page.drawLine({
        start: { x: 70, y: yPos },
        end: { x: width - 50, y: yPos },
        color: lightGray,
        thickness: 1,
      });
      yPos -= 20;
    }

    yPos -= 15;
  });

  // Footer
  page.drawText('© Level Up: The Enlightened Edge', {
    x: 50,
    y: 20,
    size: 9,
    color: rgb(150, 150, 150),
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export async function generateStoryFrameworkTemplate(): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([612, 792]);
  const { height, width } = page.getSize();
  let yPos = height - 50;

  // Header
  page.drawRectangle({
    x: 0,
    y: yPos - 40,
    width: width,
    height: 40,
    color: primaryColor,
  });

  page.drawText('Personal Brand Story Framework', {
    x: 50,
    y: yPos - 25,
    size: 18,
    color: rgb(255, 255, 255),
  });

  yPos -= 80;

  page.drawText('The Hero\'s Journey Narrative', {
    x: 50,
    y: yPos,
    size: 12,
    color: accentColor,
  });

  yPos -= 25;

  const storyElements = [
    { title: 'The Beginning', subtitle: 'Where did you start? What was your initial situation?' },
    { title: 'The Challenge', subtitle: 'What obstacle or challenge did you face?' },
    { title: 'The Transformation', subtitle: 'How did you overcome it? What did you learn?' },
    { title: 'The Insight', subtitle: 'What valuable lesson emerged from this experience?' },
    { title: 'The Impact', subtitle: 'How has this shaped who you are today?' },
    { title: 'The Message', subtitle: 'What do you want others to know about your journey?' },
  ];

  storyElements.forEach((element) => {
    page.drawText(element.title, {
      x: 50,
      y: yPos,
      size: 11,
      color: primaryColor,
    });

    yPos -= 18;

    page.drawText(element.subtitle, {
      x: 70,
      y: yPos,
      size: 9,
      color: rgb(100, 100, 100),
    });

    yPos -= 18;

    // Draw response lines
    for (let i = 0; i < 2; i++) {
      page.drawLine({
        start: { x: 70, y: yPos },
        end: { x: width - 50, y: yPos },
        color: lightGray,
        thickness: 1,
      });
      yPos -= 18;
    }

    yPos -= 10;
  });

  // Footer
  page.drawText('© Level Up: The Enlightened Edge', {
    x: 50,
    y: 20,
    size: 9,
    color: rgb(150, 150, 150),
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export const templates = {
  'personal-brand-statement': {
    name: 'Personal Brand Statement Template',
    generator: generatePersonalBrandStatementTemplate,
  },
  'linkedin-checklist': {
    name: 'LinkedIn Profile Optimization Checklist',
    generator: generateLinkedInChecklistTemplate,
  },
  'values-worksheet': {
    name: 'Brand Values Prioritization Worksheet',
    generator: generateValuesWorksheetTemplate,
  },
  'audience-canvas': {
    name: 'Audience Analysis Canvas',
    generator: generateAudienceCanvasTemplate,
  },
  'uvp-worksheet': {
    name: 'Unique Value Proposition Worksheet',
    generator: generateUVPWorksheetTemplate,
  },
  'story-framework': {
    name: 'Personal Brand Story Framework',
    generator: generateStoryFrameworkTemplate,
  },
};
