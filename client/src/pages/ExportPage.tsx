import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import ExportSummary from "@/components/ExportSummary";

export default function ExportPage() {
  const [, navigate] = useLocation();

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
              Export Your Workbook
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Your Personal Brand Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Review your progress and export your completed workbook as a personalized PDF with all
            your responses. This document is perfect for sharing with mentors, coaches, or keeping
            as a personal reference guide.
          </p>
        </div>

        <ExportSummary />

        {/* Footer CTA */}
        <div className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
          <h3 className="text-lg font-display font-bold text-foreground mb-3">
            Ready to Share Your Brand?
          </h3>
          <p className="text-muted-foreground mb-6">
            Once you've exported your workbook, share it with your network on LinkedIn or connect
            with Jessica for personalized feedback on your personal brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.linkedin.com/in/jessicageniusbutler/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.604h3.554v1.328c.43-.645 1.189-1.543 2.898-1.543 2.117 0 3.704 1.385 3.704 4.362v5.457zM5.337 9.433c-1.144 0-1.915-.758-1.915-1.707 0-.951.77-1.708 1.915-1.708 1.144 0 1.915.757 1.915 1.708 0 .949-.771 1.707-1.915 1.707zm1.575 10.019H3.762V9.829h3.15v9.623zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
              Connect on LinkedIn
            </a>
            <a
              href="https://freethinkinggenius.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-amber-600 text-amber-600 hover:bg-amber-50 font-semibold rounded-lg transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.539 8.242H1.46V4.556h21.079v3.686zM1.46 10.886v10.236h21.079V10.886H1.46zm2.204 2.884h4.155v4.936H3.664v-4.936zm5.313 0h4.154v4.936H8.977v-4.936zm5.314 0h4.155v4.936h-4.155v-4.936z" />
              </svg>
              Subscribe on Substack
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
