import React, { createContext, useContext } from 'react';
import { useWorkbookProgress, WorkbookProgress } from '@/hooks/useWorkbookProgress';

interface WorkbookProgressContextType {
  progress: WorkbookProgress | null;
  isLoading: boolean;
  saveResponse: (pillarId: number, responses: Record<string, string>) => void;
  getResponses: (pillarId: number) => Record<string, string>;
  setCurrentPillar: (pillarId: number) => void;
  getCompletionPercentage: (totalPillars: number) => number;
  isPillarCompleted: (pillarId: number) => boolean;
  clearProgress: () => void;
  exportProgress: () => string;
  importProgress: (jsonString: string) => boolean;
}

const WorkbookProgressContext = createContext<WorkbookProgressContextType | undefined>(undefined);

export function WorkbookProgressProvider({ children }: { children: React.ReactNode }) {
  const workbookProgress = useWorkbookProgress();

  return (
    <WorkbookProgressContext.Provider value={workbookProgress}>
      {children}
    </WorkbookProgressContext.Provider>
  );
}

export function useWorkbookProgressContext() {
  const context = useContext(WorkbookProgressContext);
  if (!context) {
    throw new Error('useWorkbookProgressContext must be used within WorkbookProgressProvider');
  }
  return context;
}
