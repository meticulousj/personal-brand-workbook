import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Lightbulb, Target, Users, Zap } from "lucide-react";
import { useLocation } from "wouter";
import DownloadPDFButton from "@/components/DownloadPDFButton";

const pillars = [
  {
    id: 1,
    title: "Who Are You?",
    subtitle: "Define Your Identity Beyond Your Job Title",
    description: "Discover your core essence and innate abilities that make you unique.",
    icon: "👤",
    color: "from-indigo-50 to-indigo-100",
  },
  {
    id: 2,
    title: "What Do You Stand For?",
    subtitle: "Clarify Your Core Beliefs and Values",
    description: "Identify the fundamental principles that guide your decisions and behaviors.",
    icon: "⭐",
    color: "from-amber-50 to-amber-100",
  },
  {
    id: 3,
    title: "What Is Your Personality?",
    subtitle: "How You Express Yourself, Your Tone, Style, and Vibe",
    description: "Define how you interact with the world and communicate authentically.",
    icon: "✨",
    color: "from-rose-50 to-rose-100",
  },
  {
    id: 4,
    title: "What Do You Focus On?",
    subtitle: "Identify Your Niche or Area of Expertise",
    description: "Pinpoint where your unique skills and passions intersect with market needs.",
    icon: "🎯",
    color: "from-emerald-50 to-emerald-100",
  },
  {
    id: 5,
    title: "Who Are You Speaking To?",
    subtitle: "Know Your Ideal Audience or Community",
    description: "Understand who you aim to influence, serve, or connect with.",
    icon: "👥",
    color: "from-cyan-50 to-cyan-100",
  },
  {
    id: 6,
    title: "What Makes You Different?",
    subtitle: "Highlight Your Unique Strengths and Perspective",
    description: "Articulate your Unique Promise of Value and differentiation.",
    icon: "💎",
    color: "from-violet-50 to-violet-100",
  },
  {
    id: 7,
    title: "What Value Do You Offer?",
    subtitle: "Explain How You Help Others or Create Impact",
    description: "Articulate the tangible and intangible benefits you provide.",
    icon: "🌟",
    color: "from-orange-50 to-orange-100",
  },
  {
    id: 8,
    title: "How Are You Perceived?",
    subtitle: "Shape the Impression You Leave Behind",
    description: "Manage your professional presence and consistency.",
    icon: "🔮",
    color: "from-pink-50 to-pink-100",
  },
  {
    id: 9,
    title: "What's Your Story?",
    subtitle: "Share the Journey That Shaped Your Identity",
    description: "Articulate your narrative and the experiences that define you.",
    icon: "📖",
    color: "from-teal-50 to-teal-100",
  },
];

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-amber-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-display font-bold text-foreground">Personal Brand</h1>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">About</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Workbook</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">Resources</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663432075032/ijkVXvgPD66gUXauQQ4X3q/hero-personal-brand-PocVabtP5jwZTJwkbrcVAf.webp"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <div className="inline-block mb-6 px-4 py-2 bg-accent/20 rounded-full border border-accent/30">
              <span className="text-sm font-medium text-accent-foreground">Your Personal Brand Journey</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
              Build Your Brand From Within
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              A comprehensive workbook to help you define your identity, clarify your values, and communicate your unique value proposition to the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => document.getElementById("pillars")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <DownloadPDFButton />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">Clarity</h3>
                <p className="text-muted-foreground">Understand who you are beyond your job title and what truly drives you.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">Authenticity</h3>
                <p className="text-muted-foreground">Express your genuine personality and values in everything you do.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">Connection</h3>
                <p className="text-muted-foreground">Build meaningful relationships by communicating your unique value.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section id="pillars" className="py-16 md:py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              The 9 Pillars of Personal Branding
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive framework to help you define, articulate, and amplify your unique professional identity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <Card
                key={pillar.id}
                className={`bg-gradient-to-br ${pillar.color} border-0 hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden`}
                onClick={() => navigate(`/pillar/${pillar.id}`)}
              >
                <div className="p-8 relative">
                  <div className="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-30 transition">
                    {pillar.icon}
                  </div>
                  <div className="mb-4">
                    <div className="inline-block px-3 py-1 bg-white/40 rounded-full mb-3">
                      <span className="text-xs font-semibold text-foreground">Pillar {pillar.id}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground mb-4">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    {pillar.description}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 to-accent/5 border-y border-border">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <Lightbulb className="w-12 h-12 mx-auto mb-6 text-accent" />
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Ready to Build Your Personal Brand?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start with the first pillar and work through each section at your own pace. Each pillar includes exercises, self-assessments, and actionable insights to guide your journey. You can also download the entire workbook as a PDF to complete offline.
          </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/pillar/1")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Begin with Pillar 1 <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                onClick={() => navigate("/export")}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                View Your Progress <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <DownloadPDFButton />
            </div>
        </div>
      </section>

      {/* LinkedIn CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-indigo-50 via-background to-rose-50 border-y border-border">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-border">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Level Up: The Enlightened Edge
              </h2>
              <p className="text-lg text-primary font-semibold mb-4">@freethinkinggenius</p>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Ready to take your personal brand to the next level? Connect with Jessica on LinkedIn to explore advanced strategies, share your journey, and join a community of enlightened thinkers building authentic personal brands.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.linkedin.com/in/jessicageniusbutler/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.604h3.554v1.328c.43-.645 1.189-1.543 2.898-1.543 2.117 0 3.704 1.385 3.704 4.362v5.457zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.707 0-.951.77-1.708 1.915-1.708 1.144 0 1.915.757 1.915 1.708 0 .949-.771 1.707-1.915 1.707zm1.575 10.019H3.762V9.829h3.15v9.623zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
                Connect on LinkedIn
              </a>
              <a
                href="https://www.linkedin.com/in/jessicageniusbutler/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold rounded-lg transition-all duration-300"
              >
                View Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Substack CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-amber-50 to-orange-50 border-y border-border">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-border">
            <div className="text-center">
              <div className="inline-block px-4 py-2 bg-amber-100 rounded-full border border-amber-200 mb-6">
                <span className="text-sm font-semibold text-amber-900">Newsletter</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Deep Dives & Enlightened Insights
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Subscribe to the Substack newsletter for exclusive essays, personal branding strategies, and enlightened perspectives delivered directly to your inbox.
              </p>
              <a
                href="https://freethinkinggenius.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V4.556h21.079v3.686zM1.46 10.886v10.236h21.079V10.886H1.46zm2.204 2.884h4.155v4.936H3.664v-4.936zm5.313 0h4.154v4.936H8.977v-4.936zm5.314 0h4.155v4.936h-4.155v-4.936z"/>
                </svg>
                Subscribe on Substack
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-display font-bold text-foreground mb-4">Personal Brand</h4>
              <p className="text-sm text-muted-foreground">A comprehensive workbook for building your authentic personal brand.</p>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Pillars</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Identity</a></li>
                <li><a href="#" className="hover:text-foreground transition">Values</a></li>
                <li><a href="#" className="hover:text-foreground transition">Personality</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Resources</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Guide</a></li>
                <li><a href="#" className="hover:text-foreground transition">Exercises</a></li>
                <li><a href="#" className="hover:text-foreground transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground mb-4">Connect</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://www.linkedin.com/in/jessicageniusbutler/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">LinkedIn</a></li>
                <li><a href="#" className="hover:text-foreground transition">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
            <p>&copy; Level Up: The Enlightened Edge. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition">Privacy</a>
              <a href="#" className="hover:text-foreground transition">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}