import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WorkbookProgressProvider } from "./contexts/WorkbookProgressContext";
import Home from "./pages/Home";
import PillarPage from "./pages/PillarPage";
import ExportPage from "./pages/ExportPage";
import ResourcesPage from "./pages/ResourcesPage";
import PricingPage from "./pages/PricingPage";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pillar/:id" component={PillarPage} />
      <Route path="/export" component={ExportPage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <WorkbookProgressProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </WorkbookProgressProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
