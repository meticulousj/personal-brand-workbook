import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Save } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { Streamdown } from 'streamdown';
import { useEffect, useState } from "react";
import { useWorkbookProgressContext } from "@/contexts/WorkbookProgressContext";
import { toast } from "sonner";

const pillarContent: Record<number, { title: string; subtitle: string; content: string; exercises: string[] }> = {
  1: {
    title: "Who Are You?",
    subtitle: "Define Your Identity Beyond Your Job Title",
    content: `Your identity is the bedrock of your personal brand. It encompasses your core essence, distinct from any professional role or title you may hold. Defining this identity requires introspection and an honest assessment of your innate abilities and preferred ways of operating. It's about understanding what makes you, *you*.

## Understanding Your "Super Skills"

To uncover your identity, begin by identifying your **"super skills"** – those strengths that others consistently acknowledge in you, the roles you naturally gravitate towards in team settings, and the inherent abilities you leverage to overcome significant obstacles. These are not merely learned competencies but often intrinsic talents that energize you.`,
    exercises: [
      "Document your strengths acknowledged by others",
      "Identify roles you naturally seek in team settings",
      "Reflect on your go-to skills for overcoming obstacles",
      "Describe your most successful project",
      "Recall your most important team role"
    ]
  },
  2: {
    title: "What Do You Stand For?",
    subtitle: "Clarify Your Core Beliefs, Causes You Align With, and Values",
    content: `Your values are the fundamental principles and beliefs that guide your decisions and behaviors. They act as your **"north star"**, providing direction and shaping your personal and professional compass. Understanding and articulating your core values is crucial for building an authentic personal brand that resonates with both yourself and your audience.

## Identifying Your Top Values

Many values can influence an individual, but identifying your top five provides a clear framework for decision-making and alignment. This process involves introspection and prioritization.`,
    exercises: [
      "Review and select values that resonate with you",
      "Rank your top five values",
      "Define what each value means to you personally",
      "Rate your alignment with each value (1-5 scale)",
      "Identify one value to focus on for the next 21 days"
    ]
  },
  3: {
    title: "What Is Your Personality?",
    subtitle: "How You Express Yourself, Your Tone, Style, and Vibe",
    content: `Your personality is the unique set of characteristics that define how you interact with the world. In personal branding, it translates into your **brand personality**, which humanizes your brand and dictates how you express yourself, your tone, style, and overall vibe. A well-defined brand personality ensures consistency and authenticity in all your communications.

## Understanding Brand Voice, Tone, and Personality

While often used interchangeably, brand voice, tone, and personality have distinct meanings:

- **Brand Personality:** The human characteristics and qualities that define your brand.
- **Brand Voice:** The consistent way you communicate with your audience.
- **Brand Tone:** The attitude or emotion conveyed in your communication.`,
    exercises: [
      "Rate your comfort with being yourself in all situations",
      "Assess your ability to express ideas in groups",
      "Evaluate your professional presence and appearance",
      "Identify two areas for improvement",
      "Create an improvement plan with practice opportunities"
    ]
  },
  4: {
    title: "What Do You Focus On?",
    subtitle: "Identify Your Niche or Area of Expertise",
    content: `Identifying your niche or area of expertise is about pinpointing where your unique skills, passions, and values intersect with a specific market need. This focus allows you to become a recognized authority, attract your ideal audience, and deliver specialized value. It's about defining your **"X Factor"** – that unique combination of attributes that sets you apart.

## Discovering Your "X Factor"

Your "X Factor" is not just a single skill but often a synergistic blend of your strengths, experiences, and interests. It's what makes you uniquely qualified to address particular challenges or serve a specific segment.`,
    exercises: [
      "Identify specific problems you enjoy solving",
      "List topics you could discuss for hours",
      "Find where your skills and interests overlap",
      "Define your unique perspective or approach",
      "Connect your passions with your expertise"
    ]
  },
  5: {
    title: "Who Are You Speaking To?",
    subtitle: "Know Your Ideal Audience or Community",
    content: `Understanding your ideal audience or community is paramount to effective personal branding. Just as a business tailors its products and messaging to its target market, you must understand who you aim to influence, serve, or connect with. This clarity ensures that your brand message is relevant, resonant, and impactful.

## Identifying Your "Brand Community"

Your "brand community" consists of the individuals or groups whose opinions, decisions, or needs are most relevant to your personal and professional goals. These could be potential employers, clients, collaborators, mentors, or peers.`,
    exercises: [
      "Define your ideal audience demographics",
      "Identify their primary challenges and pain points",
      "Determine where they seek information",
      "Understand what communication style resonates with them",
      "Tailor your value offer to their specific needs"
    ]
  },
  6: {
    title: "What Makes You Different?",
    subtitle: "Highlight Your Unique Strengths and Perspective",
    content: `In a competitive landscape, distinguishing yourself is vital. Your **differentiation** is what sets you apart from others who may possess similar skills or work in the same field. It's about highlighting your unique strengths and perspective in a way that is compelling and memorable. This often crystallizes into your **"Unique Promise of Value"**.

## Crafting Your Unique Promise of Value

Your Unique Promise of Value is a concise statement that articulates the specific benefits you offer, combining your strengths, values, and passions. It answers the question: "Why should someone choose you over others?"`,
    exercises: [
      "Identify the specific problems you solve",
      "Define how your unique strengths enable you to solve them",
      "Articulate your core values in your approach",
      "Draft your Unique Promise of Value statement",
      "Refine your elevator pitch"
    ]
  },
  7: {
    title: "What Value Do You Offer?",
    subtitle: "Explain How You Help Others or Create Impact",
    content: `Your **value offer** is the tangible and intangible benefits you provide to your audience. It's the answer to the question, "What's in it for them?" This pillar moves beyond simply stating your skills to articulating the positive outcomes and impact you create for others. A clear value offer is essential for attracting opportunities and building meaningful connections.

## Demonstrating Impact Through "Giving Back"

One powerful way to articulate your value offer is through your contributions to others and the community. "Giving back" is an outward expression of your values and purpose, and it provides concrete examples of your "super skills" in action.`,
    exercises: [
      "Identify which super skills you want to showcase",
      "Align your contributions with your core values",
      "Integrate your passions into giving-back opportunities",
      "Draft your branded bio (3-5 sentences)",
      "Describe the benefits others experience from working with you"
    ]
  },
  8: {
    title: "How Are You Perceived?",
    subtitle: "Shape the Impression You Leave Behind",
    content: `Perception is a critical component of your personal brand. It's not just about who you are, but how others interpret and remember you. Shaping this impression involves intentional effort in your interactions, communications, and overall demeanor. This pillar focuses on eliminating the **"Zzz Factor"** – anything that makes you forgettable or inconsistent – and ensuring you leave a positive, lasting impact.

## Eliminating the "Zzz Factor" and Building Consistency

The "Zzz Factor" refers to elements that detract from your professional presence or create an inconsistent brand image. These can range from minor inconsistencies in communication to a lack of follow-through on commitments.`,
    exercises: [
      "Rate your consistency in following through on promises",
      "Assess your punctuality and reliability",
      "Evaluate your professional communication habits",
      "Review your online and offline presence",
      "Create an impression management audit"
    ]
  },
  9: {
    title: "What's Your Story?",
    subtitle: "Share the Journey That Shaped Your Identity",
    content: `Your **story** is the narrative that weaves together your experiences, challenges, triumphs, and lessons learned. It's the journey that shaped your identity, values, and purpose. A compelling personal story is not just a recounting of events; it's a powerful tool for connection, demonstrating authenticity, and making your brand memorable.

## The Power of Narrative in Personal Branding

Humans are wired for stories. A well-told story can evoke emotion, build rapport, and make complex ideas relatable. In personal branding, your story provides context for your expertise, illustrates your values in action, and reveals the authentic person behind the professional facade.`,
    exercises: [
      "Reflect on your life journey over the past 10 years",
      "Identify your greatest achievements and accomplishments",
      "Describe challenges you've overcome",
      "Craft your personal narrative in first person",
      "Prepare stories for common interview questions"
    ]
  }
};

export default function PillarPage() {
  const params = useParams();
  const [, navigate] = useLocation();
  const pillarId = parseInt(params.id || "1");
  const pillar = pillarContent[pillarId];
  const { saveResponse, getResponses, setCurrentPillar, isPillarCompleted } = useWorkbookProgressContext();
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isSaved, setIsSaved] = useState(false);

  // Load saved responses on mount or when pillar changes
  useEffect(() => {
    const savedResponses = getResponses(pillarId);
    setResponses(savedResponses);
    setCurrentPillar(pillarId);
    setIsSaved(true);
  }, [pillarId, getResponses, setCurrentPillar]);

  // Auto-save responses with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(responses).length > 0) {
        saveResponse(pillarId, responses);
        setIsSaved(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [responses, pillarId, saveResponse]);

  const handleResponseChange = (key: string, value: string) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
    setIsSaved(false);
  };

  const handleManualSave = () => {
    saveResponse(pillarId, responses);
    setIsSaved(true);
    toast.success('Progress saved successfully!');
  };

  if (!pillar) {
    return <div>Pillar not found</div>;
  }

  const handleNext = () => {
    if (pillarId < 9) {
      handleManualSave();
      navigate(`/pillar/${pillarId + 1}`);
    }
  };

  const handlePrev = () => {
    if (pillarId > 1) {
      handleManualSave();
      navigate(`/pillar/${pillarId - 1}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-amber-500 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Pillar {pillarId} of 9</span>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-border">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
          style={{ width: `${(pillarId / 9) * 100}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Pillar Header */}
        <div className="mb-12">
          <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent/30 mb-6">
            <span className="text-sm font-medium text-accent-foreground">Pillar {pillarId}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            {pillar.title}
          </h1>
          <p className="text-xl text-muted-foreground">{pillar.subtitle}</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <Streamdown>{pillar.content}</Streamdown>
        </div>

        {/* Exercises Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-display font-bold text-foreground mb-6">Exercises & Reflections</h2>
          <div className="space-y-4">
            {pillar.exercises.map((exercise, index) => (
              <Card key={index} className="p-6 border border-border hover:border-primary/30 transition">
                <div className="flex gap-4 flex-col">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{exercise}</p>
                    </div>
                  </div>
                  <textarea
                    value={responses[`exercise_${index}`] || ''}
                    onChange={(e) => handleResponseChange(`exercise_${index}`, e.target.value)}
                    placeholder="Write your response here..."
                    className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    rows={3}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={pillarId === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous Pillar
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleManualSave}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Progress
            </Button>
            {isSaved && (
              <span className="text-sm text-green-600 font-medium">✓ Saved</span>
            )}
          </div>
          <Button
            onClick={handleNext}
            disabled={pillarId === 9}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Next Pillar
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12 mt-16">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            You're on Pillar {pillarId} of 9. Keep going!
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            Back to Home
          </Button>
        </div>
      </footer>
    </div>
  );
}
