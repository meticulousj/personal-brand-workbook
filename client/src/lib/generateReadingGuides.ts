import { PDFDocument, rgb } from 'pdf-lib';

const primaryColor = rgb(79 / 255, 70 / 255, 229 / 255); // Indigo
const accentColor = rgb(217 / 255, 119 / 255, 6 / 255); // Amber
const textColor = rgb(15 / 255, 23 / 255, 42 / 255); // Slate
const darkGray = rgb(150 / 255, 150 / 255, 150 / 255);
const white = rgb(1, 1, 1);

export async function generateReadingListGuide(): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();

  let yPos = height - 50;

  // Header
  page.drawRectangle({
    x: 0,
    y: yPos - 40,
    width: width,
    height: 40,
    color: primaryColor,
  });

  page.drawText('Recommended Reading Guide', {
    x: 50,
    y: yPos - 25,
    size: 18,
    color: white,
  });

  yPos -= 80;

  const books = [
    {
      title: 'Reinventing You',
      author: 'Dorie Clark',
      category: 'Personal Branding',
      description: 'The essential guide to building and promoting your personal brand. Learn how to assess your current brand, identify your unique value, and create a strategic plan for your professional growth.',
      keyTakeaways: ['Define your brand identity', 'Build your online presence', 'Create a personal brand strategy'],
    },
    {
      title: 'The Brand Called You',
      author: 'Peter Montoya',
      category: 'Personal Branding',
      description: 'Master the art of personal branding and stand out in your field. Discover how to differentiate yourself, build credibility, and create a lasting impression.',
      keyTakeaways: ['Differentiate your unique value', 'Build credibility and authority', 'Create memorable brand experiences'],
    },
    {
      title: 'Dare to Lead',
      author: 'Brené Brown',
      category: 'Leadership',
      description: 'Build authentic leadership and courage in your personal brand. Learn how vulnerability and authenticity are strengths in leadership and personal branding.',
      keyTakeaways: ['Lead with authenticity', 'Embrace vulnerability as strength', 'Build courageous leadership'],
    },
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'Personal Development',
      description: 'Build consistent habits that strengthen your personal brand. Learn how small, incremental changes compound into significant personal and professional growth.',
      keyTakeaways: ['Build powerful habits', 'Create systems for success', 'Achieve consistent growth'],
    },
    {
      title: 'The Courage to Be Disliked',
      author: 'Ichiro Kishimi',
      category: 'Psychology',
      description: 'Explore Adlerian psychology to build authentic self-acceptance. Discover how to overcome past conditioning and create the life you truly want.',
      keyTakeaways: ['Achieve self-acceptance', 'Build authentic relationships', 'Create your own path'],
    },
    {
      title: 'Steal Like an Artist',
      author: 'Austin Kleon',
      category: 'Creativity',
      description: 'Develop your unique creative voice and personal style. Learn how to find inspiration, remix ideas, and create original work that reflects your authentic self.',
      keyTakeaways: ['Develop creative voice', 'Find authentic inspiration', 'Create original work'],
    },
  ];

  books.forEach((book, index) => {
    // Book title
    page.drawText(`${index + 1}. ${book.title}`, {
      x: 50,
      y: yPos,
      size: 12,
      color: primaryColor,
      maxWidth: width - 100,
    });

    yPos -= 18;

    // Author and category
    page.drawText(`By ${book.author} | ${book.category}`, {
      x: 50,
      y: yPos,
      size: 9,
      color: darkGray,
    });

    yPos -= 16;

    // Description
    const descriptionLines = wrapText(book.description, width - 100, 9);
    descriptionLines.forEach((line) => {
      page.drawText(line, {
        x: 50,
        y: yPos,
        size: 9,
        color: textColor,
      });
      yPos -= 12;
    });

    yPos -= 8;

    // Key takeaways
    page.drawText('Key Takeaways:', {
      x: 50,
      y: yPos,
      size: 9,
      color: accentColor,
    });

    yPos -= 12;

    book.keyTakeaways.forEach((takeaway) => {
      page.drawText(`• ${takeaway}`, {
        x: 60,
        y: yPos,
        size: 8,
        color: textColor,
      });
      yPos -= 10;
    });

    yPos -= 16;

    // Page break if needed
    if (yPos < 100) {
      const newPage = pdfDoc.addPage([612, 792]);
      page.drawRectangle({
        x: 0,
        y: 792 - 40,
        width: width,
        height: 40,
        color: primaryColor,
      });
      page.drawText('Recommended Reading Guide (continued)', {
        x: 50,
        y: 792 - 25,
        size: 14,
        color: white,
      });
      yPos = 792 - 80;
    }
  });

  // Footer
  page.drawText('© Level Up: The Enlightened Edge', {
    x: 50,
    y: 20,
    size: 9,
    color: darkGray,
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes as any], { type: 'application/pdf' });
}

export async function generatePersonalBrandingTipsGuide(): Promise<Blob> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();

  let yPos = height - 50;

  // Header
  page.drawRectangle({
    x: 0,
    y: yPos - 40,
    width: width,
    height: 40,
    color: primaryColor,
  });

  page.drawText('Personal Branding Tips & Strategies', {
    x: 50,
    y: yPos - 25,
    size: 18,
    color: white,
  });

  yPos -= 80;

  const tips = [
    {
      title: 'Define Your Unique Value Proposition',
      content: 'Clearly articulate what makes you different and the specific value you deliver. Your UVP should be memorable, authentic, and aligned with your target audience\'s needs.',
    },
    {
      title: 'Build Authentic Connections',
      content: 'Focus on genuine relationships rather than just accumulating followers. Engage meaningfully with your community, share valuable insights, and support others in their journey.',
    },
    {
      title: 'Create Consistent Content',
      content: 'Develop a content strategy that reflects your expertise and values. Whether through LinkedIn posts, articles, or videos, consistency builds recognition and authority.',
    },
    {
      title: 'Optimize Your Online Presence',
      content: 'Ensure your LinkedIn profile, website, and social media accounts are professional, complete, and aligned with your personal brand message. First impressions matter online.',
    },
    {
      title: 'Share Your Story',
      content: 'People connect with stories more than statistics. Share your journey, challenges overcome, and lessons learned. Vulnerability builds trust and authenticity.',
    },
    {
      title: 'Demonstrate Expertise',
      content: 'Share knowledge through articles, speaking engagements, or mentoring. Position yourself as a thought leader by consistently providing valuable insights to your community.',
    },
    {
      title: 'Stay True to Your Values',
      content: 'Your personal brand should reflect your core values and beliefs. Authenticity resonates more than trying to be someone you\'re not.',
    },
    {
      title: 'Engage with Your Community',
      content: 'Actively participate in conversations, respond to comments, and support others. Building a strong personal brand is about community, not just self-promotion.',
    },
  ];

  tips.forEach((tip, index) => {
    // Tip title
    page.drawText(`${index + 1}. ${tip.title}`, {
      x: 50,
      y: yPos,
      size: 11,
      color: primaryColor,
      maxWidth: width - 100,
    });

    yPos -= 16;

    // Tip content
    const contentLines = wrapText(tip.content, width - 100, 9);
    contentLines.forEach((line) => {
      page.drawText(line, {
        x: 50,
        y: yPos,
        size: 9,
        color: textColor,
      });
      yPos -= 12;
    });

    yPos -= 12;

    // Page break if needed
    if (yPos < 100) {
      const newPage = pdfDoc.addPage([612, 792]);
      page.drawRectangle({
        x: 0,
        y: 792 - 40,
        width: width,
        height: 40,
        color: primaryColor,
      });
      page.drawText('Personal Branding Tips & Strategies (continued)', {
        x: 50,
        y: 792 - 25,
        size: 14,
        color: white,
      });
      yPos = 792 - 80;
    }
  });

  // Footer
  page.drawText('© Level Up: The Enlightened Edge', {
    x: 50,
    y: 20,
    size: 9,
    color: darkGray,
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes as any], { type: 'application/pdf' });
}

function wrapText(text: string, maxWidth: number, fontSize: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    // Rough estimate: each character is about 0.5 * fontSize pixels wide
    if (testLine.length * (fontSize * 0.5) > maxWidth) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines;
}

export const readingGuides = {
  'reading-list': {
    name: 'Recommended Reading List',
    generator: generateReadingListGuide,
  },
  'branding-tips': {
    name: 'Personal Branding Tips & Strategies',
    generator: generatePersonalBrandingTipsGuide,
  },
};
