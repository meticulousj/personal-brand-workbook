import { useEffect, useState } from 'react';

export interface PillarResponse {
  pillarId: number;
  responses: Record<string, string>;
  completedAt?: string;
}

export interface WorkbookProgress {
  currentPillar: number;
  pillars: PillarResponse[];
  lastUpdated: string;
}

const STORAGE_KEY = 'workbook_progress';

/**
 * Custom hook to manage workbook progress with local storage persistence
 * Automatically saves and retrieves user responses and progress
 */
export function useWorkbookProgress() {
  const [progress, setProgress] = useState<WorkbookProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProgress(parsed);
      } else {
        // Initialize with default progress
        setProgress({
          currentPillar: 1,
          pillars: [],
          lastUpdated: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Failed to load workbook progress:', error);
      setProgress({
        currentPillar: 1,
        pillars: [],
        lastUpdated: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save progress to local storage whenever it changes
  useEffect(() => {
    if (progress && !isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error('Failed to save workbook progress:', error);
      }
    }
  }, [progress, isLoading]);

  /**
   * Save response for a specific pillar
   */
  const saveResponse = (pillarId: number, responses: Record<string, string>) => {
    setProgress((prev) => {
      if (!prev) return prev;

      const updatedPillars = [...prev.pillars];
      const existingIndex = updatedPillars.findIndex((p) => p.pillarId === pillarId);

      if (existingIndex >= 0) {
        updatedPillars[existingIndex] = {
          ...updatedPillars[existingIndex],
          responses,
          completedAt: new Date().toISOString(),
        };
      } else {
        updatedPillars.push({
          pillarId,
          responses,
          completedAt: new Date().toISOString(),
        });
      }

      return {
        ...prev,
        pillars: updatedPillars,
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  /**
   * Get responses for a specific pillar
   */
  const getResponses = (pillarId: number): Record<string, string> => {
    if (!progress) return {};
    const pillar = progress.pillars.find((p) => p.pillarId === pillarId);
    return pillar?.responses || {};
  };

  /**
   * Update current pillar
   */
  const setCurrentPillar = (pillarId: number) => {
    setProgress((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        currentPillar: pillarId,
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  /**
   * Get completion percentage
   */
  const getCompletionPercentage = (totalPillars: number): number => {
    if (!progress || totalPillars === 0) return 0;
    return Math.round((progress.pillars.length / totalPillars) * 100);
  };

  /**
   * Check if a pillar has been completed
   */
  const isPillarCompleted = (pillarId: number): boolean => {
    if (!progress) return false;
    return progress.pillars.some((p) => p.pillarId === pillarId);
  };

  /**
   * Clear all progress
   */
  const clearProgress = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setProgress({
        currentPillar: 1,
        pillars: [],
        lastUpdated: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to clear workbook progress:', error);
    }
  };

  /**
   * Export progress as JSON
   */
  const exportProgress = (): string => {
    if (!progress) return '';
    return JSON.stringify(progress, null, 2);
  };

  /**
   * Import progress from JSON
   */
  const importProgress = (jsonString: string): boolean => {
    try {
      const imported = JSON.parse(jsonString);
      if (imported.currentPillar && imported.pillars && imported.lastUpdated) {
        setProgress(imported);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to import workbook progress:', error);
      return false;
    }
  };

  return {
    progress,
    isLoading,
    saveResponse,
    getResponses,
    setCurrentPillar,
    getCompletionPercentage,
    isPillarCompleted,
    clearProgress,
    exportProgress,
    importProgress,
  };
}
