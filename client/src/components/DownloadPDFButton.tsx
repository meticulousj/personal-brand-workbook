import { Button } from "@/components/ui/button";
import { downloadPDF } from "@/lib/generatePDF";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DownloadPDFButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      await downloadPDF();
      toast.success("Workbook downloaded successfully!");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download workbook. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          Download Workbook PDF
        </>
      )}
    </Button>
  );
}
