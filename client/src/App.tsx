import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Surveillance from "./pages/Surveillance";
import Maps from "./pages/Maps";
import Forecasting from "./pages/Forecasting";
import Alerts from "./pages/Alerts";
import CommunityIntelligence from "./pages/CommunityIntelligence";
import MobileCHW from "./pages/MobileCHW";
import Facilities from "./pages/Facilities";
import ImpactTracking from "./pages/ImpactTracking";
import InterventionPlanning from "./pages/InterventionPlanning";
import Policy from "./pages/Policy";
import DataRepository from "./pages/DataRepository";
import DataSources from "./pages/DataSources";
import Reports from "./pages/Reports";
import About from "./pages/About";
import ModelAccuracy from "./pages/ModelAccuracy";
import PolicymakerDashboard from "./pages/PolicymakerDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import PHCWorkerDashboard from "./pages/PHCWorkerDashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/surveillance" component={Surveillance} />
      <Route path="/maps" component={Maps} />
      <Route path="/forecasting" component={Forecasting} />
      <Route path="/alerts" component={Alerts} />
      <Route path="/community-intelligence" component={CommunityIntelligence} />
      <Route path="/mobile-chw" component={MobileCHW} />
      <Route path="/facilities" component={Facilities} />
      <Route path="/impact" component={ImpactTracking} />
      <Route path="/interventions" component={InterventionPlanning} />
      <Route path="/policy" component={Policy} />
      <Route path="/data-repository" component={DataRepository} />
      <Route path="/data-sources" component={DataSources} />
      <Route path="/reports" component={Reports} />
      <Route path="/about" component={About} />
      <Route path="/model-accuracy" component={ModelAccuracy} />
      <Route path="/policymaker" component={PolicymakerDashboard} />
      <Route path="/manager" component={ManagerDashboard} />
      <Route path="/phc-worker" component={PHCWorkerDashboard} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
