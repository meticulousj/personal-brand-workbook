import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { generatePersonalizedPDF } from "@/lib/generatePersonalizedPDF";
import { useWorkbookProgressContext } from "@/contexts/WorkbookProgressContext";

const pillarContent: Record<number, { title: string; subtitle: string }> = {
  1: { title: "Who Are You?", subtitle: "Define Your Identity Beyond Your Job Title" },
  2: { title: "What Do You Stand For?", subtitle: "Clarify Your Core Beliefs and Values" },
  3: { title: "What Is Your Personality?", subtitle: "How You Express Yourself, Your Tone, Style, and Vibe" },
  4: { title: "What Do You Focus On?", subtitle: "Identify Your Niche or Area of Expertise" },
  5: { title: "Who Are You Speaking To?", subtitle: "Know Your Ideal Audience or Community" },
  6: { title: "What Makes You Different?", subtitle: "Highlight Your Unique Strengths and Perspective" },
  7: { title: "What Value Do You Offer?", subtitle: "Explain How You Help Others or Create Impact" },
  8: { title: "How Are You Perceived?", subtitle: "Shape the Impression You Leave Behind" },
  9: { title: "What's Your Story?", subtitle: "Share the Journey That Shaped Your Identity" },
};

export default function ExportSummary() {
  const { progress, getResponses } = useWorkbookProgressContext();
  const [isExporting, setIsExporting] = useState(false);

  const completedPillars = progress?.pillars || [];
  const completionPercentage = Math.round((completedPillars.length / 9) * 100);
  const isFullyCompleted = completedPillars.length === 9;

  const handleExportPDF = async () => {
    if (completedPillars.length === 0) {
      toast.error("Please complete at least one pillar before exporting");
      return;
    }

    setIsExporting(true);
    try {
      // Prepare pillar data with responses
      const pillarsData = completedPillars.map((pillar) => ({
        id: pillar.pillarId,
        title: pillarContent[pillar.pillarId]?.title || "Pillar",
        subtitle: pillarContent[pillar.pillarId]?.subtitle || "",
        responses: pillar.responses || {},
      }));

      // Generate PDF
      const pdfBlob = await generatePersonalizedPDF(pillarsData);

      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Personal-Brand-Workbook-${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Your personalized workbook has been downloaded!");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="p-8 bg-gradient-to-br from-indigo-50 to-amber-50 border-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Your Progress
            </h2>
            <p className="text-muted-foreground">
              {completedPillars.length} of 9 pillars completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-primary">{completionPercentage}%</div>
            <p className="text-sm text-muted-foreground">Complete</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </Card>

      {/* Completed Pillars */}
      <div>
        <h3 className="text-lg font-display font-bold text-foreground mb-4">
          Completed Pillars
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Array.from({ length: 9 }).map((_, index) => {
            const pillarId = index + 1;
            const isCompleted = completedPillars.some((p) => p.pillarId === pillarId);
            const pillar = pillarContent[pillarId];

            return (
              <Card
                key={pillarId}
                className={`p-4 flex items-start gap-4 ${
                  isCompleted
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm">
                    Pillar {pillarId}: {pillar?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isCompleted ? "✓ Completed" : "Not started"}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Export Section */}
      <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-start gap-4 mb-6">
          <Download className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-display font-bold text-foreground mb-2">
              Export Your Workbook
            </h3>
            <p className="text-muted-foreground text-sm">
              Download your personalized workbook as a PDF with all your responses. Perfect for
              sharing with mentors, coaches, or keeping as a reference guide.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {completedPillars.length === 0 ? (
            <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
              Complete at least one pillar to export your workbook.
            </p>
          ) : (
            <>
              {!isFullyCompleted && (
                <p className="text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">
                  You can export your workbook now with {completedPillars.length} completed
                  pillar{completedPillars.length !== 1 ? "s" : ""}. Complete all 9 pillars for
                  the full experience.
                </p>
              )}
              <Button
                onClick={handleExportPDF}
                disabled={isExporting || completedPillars.length === 0}
                className="w-full bg-primary hover:bg-primary/90 text-white"
                size="lg"
              >
                <Download className="mr-2 w-4 h-4" />
                {isExporting ? "Generating PDF..." : "Download Personalized PDF"}
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Tips Section */}
      <Card className="p-6 bg-secondary/30 border-secondary">
        <h4 className="font-display font-bold text-foreground mb-3">Tips for Using Your Workbook</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Share your workbook with a mentor or coach for personalized feedback</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Use your responses to update your LinkedIn profile and resume</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Revisit this workbook quarterly to track your personal brand evolution</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Print and keep a physical copy as a reference guide</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
