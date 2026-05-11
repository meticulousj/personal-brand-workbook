import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Lightbulb,
  Link as LinkIcon,
  ArrowLeft,
} from "lucide-react";
import { useLocation } from "wouter";
import { useState } from "react";
import { toast } from "sonner";
import { templates } from "@/lib/generateTemplates";
import { readingGuides } from "@/lib/generateReadingGuides";

interface Resource {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  items: ResourceItem[];
}

interface ResourceItem {
  name: string;
  description: string;
  url?: string;
  category?: string;
  templateId?: string;
}

const resources: Resource[] = [
  {
    id: "templates",
    title: "Templates & Worksheets",
    description: "Ready-to-use templates to accelerate your personal branding journey",
    icon: <FileText className="w-6 h-6" />,
    items: [
      {
        name: "Personal Brand Statement Template",
        description:
          "A structured template to craft your unique personal brand statement in 3-5 sentences",
        category: "Template",
        templateId: "personal-brand-statement",
      },
      {
        name: "LinkedIn Profile Optimization Checklist",
        description:
          "Step-by-step guide to optimize every section of your LinkedIn profile for maximum impact",
        category: "Checklist",
        templateId: "linkedin-checklist",
      },
      {
        name: "Brand Values Prioritization Worksheet",
        description:
          "Interactive worksheet to identify and prioritize your top 5 core values and beliefs",
        category: "Worksheet",
        templateId: "values-worksheet",
      },
      {
        name: "Audience Analysis Canvas",
        description:
          "Visual template to define and understand your ideal audience, their needs, and pain points",
        category: "Canvas",
        templateId: "audience-canvas",
      },
      {
        name: "Unique Value Proposition Worksheet",
        description:
          "Structured exercise to articulate what makes you different and the value you deliver",
        category: "Worksheet",
        templateId: "uvp-worksheet",
      },
      {
        name: "Personal Brand Story Framework",
        description:
          "Template to structure your personal story using the hero's journey narrative arc",
        category: "Framework",
        templateId: "story-framework",
      },
    ],
  },
  {
    id: "books",
    title: "Recommended Reading",
    description: "Essential books on personal branding, self-discovery, and professional growth",
    icon: <BookOpen className="w-6 h-6" />,
    items: [
      {
        name: "Recommended Reading List Guide",
        description: "Comprehensive guide with summaries of 8 essential personal branding books and key takeaways from each",
        category: "Guide",
        templateId: "reading-list",
      },
      {
        name: "Personal Branding Tips & Strategies",
        description: "8 actionable tips and strategies for building an authentic personal brand that stands out",
        category: "Guide",
        templateId: "branding-tips",
      },
      {
        name: "Reinventing You",
        description: "By Dorie Clark - The essential guide to building and promoting your personal brand",
        category: "Personal Branding",
      },
      {
        name: "The Brand Called You",
        description: "By Peter Montoya - Master the art of personal branding and stand out in your field",
        category: "Personal Branding",
      },
      {
        name: "Dare to Lead",
        description: "By Brené Brown - Build authentic leadership and courage in your personal brand",
        category: "Leadership",
      },
      {
        name: "Atomic Habits",
        description: "By James Clear - Build consistent habits that strengthen your personal brand",
        category: "Personal Development",
      },
      {
        name: "The Courage to Be Disliked",
        description:
          "By Ichiro Kishimi - Explore Adlerian psychology to build authentic self-acceptance",
        category: "Psychology",
      },
      {
        name: "Steal Like an Artist",
        description: "By Austin Kleon - Develop your unique creative voice and personal style",
        category: "Creativity",
      },
      {
        name: "Man's Search for Meaning",
        description: "By Viktor Frankl - Discover purpose and meaning to fuel your personal brand",
        category: "Philosophy",
      },
      {
        name: "The Gifts of Imperfection",
        description: "By Brené Brown - Embrace vulnerability as a strength in your personal brand",
        category: "Personal Development",
      },
    ],
  },
  {
    id: "tools",
    title: "Personal Branding Tools",
    description: "Recommended platforms and tools to build, manage, and amplify your personal brand",
    icon: <Lightbulb className="w-6 h-6" />,
    items: [
      {
        name: "LinkedIn",
        description: "Professional networking platform to showcase your expertise and build your brand",
        url: "https://www.linkedin.com",
        category: "Networking",
      },
      {
        name: "Substack",
        description: "Create and grow your personal newsletter to share insights and build an audience",
        url: "https://substack.com",
        category: "Content",
      },
      {
        name: "Medium",
        description: "Publish long-form articles and establish thought leadership in your niche",
        url: "https://medium.com",
        category: "Content",
      },
      {
        name: "Twitter/X",
        description: "Share daily insights, engage with your community, and build real-time visibility",
        url: "https://twitter.com",
        category: "Social Media",
      },
      {
        name: "Canva",
        description: "Create professional graphics and visual content for your personal brand",
        url: "https://www.canva.com",
        category: "Design",
      },
      {
        name: "Linktree",
        description: "Centralize all your links in one bio to drive traffic across all platforms",
        url: "https://linktr.ee",
        category: "Tools",
      },
      {
        name: "Calendly",
        description: "Streamline scheduling for consultations, interviews, and networking calls",
        url: "https://calendly.com",
        category: "Tools",
      },
      {
        name: "Grammarly",
        description: "Ensure professional writing across all your personal brand communications",
        url: "https://www.grammarly.com",
        category: "Writing",
      },
      {
        name: "Adobe Express",
        description: "Create branded templates and professional visual content quickly",
        url: "https://www.adobe.com/express/",
        category: "Design",
      },
      {
        name: "Descript",
        description: "Edit video and audio content to repurpose your content across platforms",
        url: "https://www.descript.com",
        category: "Video",
      },
    ],
  },
  {
    id: "articles",
    title: "Articles & Guides",
    description: "In-depth guides and articles on personal branding strategies and best practices",
    icon: <LinkIcon className="w-6 h-6" />,
    items: [
      {
        name: "How to Build Your Personal Brand on LinkedIn",
        description:
          "Comprehensive guide to leveraging LinkedIn as your primary personal branding platform",
        url: "https://www.linkedin.com/pulse/",
        category: "LinkedIn",
      },
      {
        name: "The Complete Guide to Personal Branding",
        description: "In-depth resource covering all aspects of building an authentic personal brand",
        url: "https://blog.hubspot.com/",
        category: "General",
      },
      {
        name: "Personal Branding for Professionals",
        description: "Strategic insights on positioning yourself as an expert in your field",
        url: "https://www.forbes.com/",
        category: "Professional",
      },
      {
        name: "Authenticity in Personal Branding",
        description:
          "Explore how to build a personal brand that reflects your true values and personality",
        url: "https://www.entrepreneur.com/",
        category: "Authenticity",
      },
      {
        name: "Personal Brand Storytelling Techniques",
        description: "Master the art of telling your story to create emotional connections",
        url: "https://www.inc.com/",
        category: "Storytelling",
      },
    ],
  },
];

export default function ResourcesPage() {
  const [, navigate] = useLocation();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleGuideDownload = async (guideId: string, guideName: string) => {
    setDownloadingId(guideId);
    try {
      const guide = readingGuides[guideId as keyof typeof readingGuides];
      if (!guide) {
        toast.error("Guide not found");
        return;
      }

      const pdfBlob = await guide.generator();
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${guideId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`${guideName} downloaded successfully!`);
    } catch (error) {
      console.error("Failed to download guide:", error);
      toast.error("Failed to download guide. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  const handleTemplateDownload = async (templateId: string, templateName: string) => {
    setDownloadingId(templateId);
    try {
      const template = templates[templateId as keyof typeof templates];
      if (!template) {
        toast.error("Template not found");
        return;
      }

      const pdfBlob = await template.generator();
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${templateId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success(`${templateName} downloaded successfully!`);
    } catch (error) {
      console.error("Failed to download template:", error);
      toast.error("Failed to download template. Please try again.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-xl font-display font-bold text-foreground">
              Resources & Tools
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Personal Branding Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Curated collection of templates, books, tools, and guides to help you build, refine,
            and amplify your personal brand. Whether you're just starting or looking to level up,
            these resources will accelerate your journey.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="space-y-12">
          {resources.map((resource) => (
            <section key={resource.id}>
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  {resource.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-foreground">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground">{resource.description}</p>
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {resource.items.map((item, index) => (
                  <Card
                    key={index}
                    className="p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-foreground text-lg flex-1 pr-2">
                        {item.name}
                      </h4>
                      {item.category && (
                        <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full whitespace-nowrap">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {item.description}
                    </p>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                      >
                        Visit Resource <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : item.templateId ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-center gap-2"
                        onClick={() => handleTemplateDownload(item.templateId!, item.name)}
                        disabled={downloadingId === item.templateId}
                      >
                        <Download className="w-4 h-4" />
                        {downloadingId === item.templateId ? "Downloading..." : "Download PDF"}
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
          <h3 className="text-2xl font-display font-bold text-foreground mb-4">
            Ready to Deepen Your Personal Brand?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Use these resources alongside the Personal Brand Workbook to create a comprehensive
            strategy. Start with the templates, read the recommended books, and leverage the tools
            to bring your brand to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => navigate("/pillar/1")}
              className="bg-primary hover:bg-primary/90 text-white"
              size="lg"
            >
              Return to Workbook
            </Button>
            <a
              href="https://www.linkedin.com/in/jessicageniusbutler/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-primary text-primary hover:bg-primary/5 font-semibold rounded-lg transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.604h3.554v1.328c.43-.645 1.189-1.543 2.898-1.543 2.117 0 3.704 1.385 3.704 4.362v5.457zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.707 0-.951.77-1.708 1.915-1.708 1.144 0 1.915.757 1.915 1.708 0 .949-.771 1.707-1.915 1.707zm1.575 10.019H3.762V9.829h3.15v9.623zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
              Connect with Jessica
            </a>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-secondary/30 border-secondary">
            <h4 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="text-2xl">📚</span> Start with Templates
            </h4>
            <p className="text-sm text-muted-foreground">
              Use the templates to structure your thinking and accelerate your personal branding
              process.
            </p>
          </Card>
          <Card className="p-6 bg-secondary/30 border-secondary">
            <h4 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="text-2xl">📖</span> Read & Learn
            </h4>
            <p className="text-sm text-muted-foreground">
              Invest time in reading the recommended books to deepen your understanding of
              personal branding.
            </p>
          </Card>
          <Card className="p-6 bg-secondary/30 border-secondary">
            <h4 className="font-display font-bold text-foreground mb-3 flex items-center gap-2">
              <span className="text-2xl">🛠️</span> Use the Tools
            </h4>
            <p className="text-sm text-muted-foreground">
              Implement your brand strategy using the recommended tools and platforms to reach
              your audience.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
