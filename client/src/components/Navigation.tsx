// Navigation.tsx — AIfluence Climate-Health Intelligence Platform
// Design: Dark sidebar, teal brand, clinical precision aesthetic

import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  BookOpen,
  Building2,
  Database,
  Globe,
  Heart,
  Home,
  Map,
  Settings,
  Stethoscope,
  TrendingUp,
  Users,
  Zap,
  ShieldCheck,
  FileText,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { href: "/", icon: Home, title: "Home" },
      { href: "/dashboard", icon: BarChart3, title: "Dashboard" },
    ],
  },
  {
    label: "Surveillance & Alerts",
    items: [
      { href: "/alerts", icon: AlertTriangle, title: "Early Warning Alerts", badge: "5" },
      { href: "/surveillance", icon: Activity, title: "Disease Surveillance" },
      { href: "/maps", icon: Map, title: "Risk Maps" },
    ],
  },
  {
    label: "Forecasting & AI",
    items: [
      { href: "/forecasting", icon: TrendingUp, title: "Outbreak Forecasting" },
      { href: "/model-accuracy", icon: ShieldCheck, title: "Model Accuracy" },
      { href: "/community-intelligence", icon: Users, title: "Community Intelligence" },
    ],
  },
  {
    label: "Health Systems",
    items: [
      { href: "/facilities", icon: Building2, title: "Health Facilities" },
      { href: "/mobile-chw", icon: Stethoscope, title: "CHW Field Interface" },
      { href: "/interventions", icon: Zap, title: "Intervention Planning" },
      { href: "/impact", icon: Heart, title: "Impact Tracking" },
    ],
  },
  {
    label: "Knowledge & Data",
    items: [
      { href: "/policy", icon: FileText, title: "Policy Briefs" },
      { href: "/data-repository", icon: Database, title: "Open Data Repository" },
      { href: "/data-sources", icon: Layers, title: "Data Sources" },
      { href: "/reports", icon: BookOpen, title: "Reports" },
    ],
  },
  {
    label: "Role Dashboards",
    items: [
      { href: "/policymaker", icon: Globe, title: "Policymaker View" },
      { href: "/manager", icon: Settings, title: "Program Manager" },
      { href: "/phc-worker", icon: Stethoscope, title: "PHC Worker" },
    ],
  },
];

export function Navigation() {
  const [location] = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col z-40 overflow-y-auto">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-sidebar-border flex-shrink-0">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sidebar-foreground font-bold text-base leading-tight">AIfluence</div>
              <div className="text-sidebar-foreground/50 text-xs leading-tight">Climate-Health Intelligence</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 px-3 py-4 space-y-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/35">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={cn(
                        "nav-item",
                        isActive ? "nav-item-active" : "nav-item-inactive"
                      )}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="flex-1 text-sm">{item.title}</span>
                      {item.badge && (
                        <Badge className="h-4 min-w-4 px-1 text-[10px] bg-destructive text-destructive-foreground">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-sidebar-border flex-shrink-0">
        <div className="text-[10px] text-sidebar-foreground/35 leading-relaxed">
          <div className="font-medium text-sidebar-foreground/50 mb-0.5">AIfluence v2.1.0</div>
          <div>Open-source · MIT License</div>
          <div>Data: WHO · World Bank · DHIS2</div>
        </div>
      </div>
    </aside>
  );
}

// Layout wrapper for pages with sidebar
export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 ml-64 min-h-screen bg-background">
        {children}
      </main>
    </div>
  );
}
