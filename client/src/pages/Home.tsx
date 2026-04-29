// Home.tsx — AIfluence Climate-Health Intelligence Platform
// Landing page: asymmetric layout, teal brand, clinical precision

import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Database,
  Globe,
  Heart,
  Map,
  Stethoscope,
  TrendingUp,
  Users,
  ShieldCheck,
  FileText,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { IMPACT_METRICS, COUNTRIES, DISEASES } from "@/lib/data";

const FEATURES = [
  {
    icon: AlertTriangle,
    title: "Early Warning System",
    description: "7–30 day outbreak predictions using climate-disease correlation models. 87.8% accuracy across 18 climate-sensitive diseases.",
    href: "/alerts",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: Activity,
    title: "Disease Surveillance",
    description: "Real-time monitoring of malaria, cholera, NTDs, and 15 other diseases across 5 countries with WHO and DHIS2 integration.",
    href: "/surveillance",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Map,
    title: "Risk Mapping",
    description: "Interactive geospatial risk maps with county-level granularity, climate overlays, and facility readiness layers.",
    href: "/maps",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: TrendingUp,
    title: "AI Forecasting",
    description: "Machine learning models trained on 10+ years of climate and health data. Confidence intervals and contributing factor analysis.",
    href: "/forecasting",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: Users,
    title: "Community Intelligence",
    description: "CHW observation network validates AI predictions with ground-truth data from 2,250 frontline health workers.",
    href: "/community-intelligence",
    color: "text-teal-500",
    bg: "bg-teal-50",
  },
  {
    icon: Database,
    title: "Open Data Repository",
    description: "7 publicly accessible datasets with DOIs, CC BY 4.0 licenses, and API access. Aligned with Digital Public Goods standards.",
    href: "/data-repository",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    icon: FileText,
    title: "Policy Intelligence",
    description: "Evidence-based policy briefs for 5 countries, auto-generated from surveillance data with actionable recommendations.",
    href: "/policy",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Stethoscope,
    title: "CHW Field Interface",
    description: "Mobile-optimised interface for community health workers. Works offline. Supports SMS alerts via Africa's Talking.",
    href: "/mobile-chw",
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    icon: Zap,
    title: "Intervention Planning",
    description: "Scenario modelling to simulate impact of bed net distribution, IRS campaigns, and WASH interventions on disease burden.",
    href: "/interventions",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
];

const STATS = [
  { value: "5", label: "Countries", sub: "Kenya, Tanzania, Uganda, Rwanda, Mozambique" },
  { value: "18", label: "Diseases Tracked", sub: "Climate-sensitive conditions" },
  { value: "87.8%", label: "Forecast Accuracy", sub: "7-day malaria prediction" },
  { value: "2,250", label: "CHWs Supported", sub: "Frontline health workers" },
  { value: "83,541", label: "Children Under 5", sub: "In pilot surveillance catchment" },
  { value: "417,706", label: "People Covered", sub: "Turkana County pilot" },
];

const DPG_STANDARDS = [
  "Open-source code (MIT License)",
  "Open data with DOIs (CC BY 4.0)",
  "DHIS2 & FHIR interoperability",
  "No harmful content or bias",
  "Privacy-preserving by design",
  "Offline-capable field interface",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top nav bar (no sidebar on landing page) */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-foreground text-base">AIfluence</span>
              <span className="text-muted-foreground text-sm ml-2 hidden sm:inline">Climate-Health Intelligence Platform</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-primary border-primary/30 hidden md:flex">
              <ShieldCheck className="h-3 w-3 mr-1" />
              Digital Public Good
            </Badge>
            <Link href="/dashboard">
              <Button size="sm" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Launch Platform
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sidebar via-sidebar to-primary/80 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25% 50%, oklch(0.55 0.12 195) 0%, transparent 50%), radial-gradient(circle at 75% 20%, oklch(0.70 0.16 55) 0%, transparent 40%)"
          }} />
        </div>
        <div className="container relative py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <Badge className="bg-primary/30 text-white border-primary/40 text-xs">
                Powered by WHO · World Bank · DHIS2
              </Badge>
              <Badge className="bg-accent/20 text-white border-accent/30 text-xs">
                Open Source · MIT
              </Badge>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              AI-Powered Climate-Health
              <span className="block text-primary mt-1" style={{ color: "oklch(0.72 0.14 195)" }}>
                Early Warning for Africa
              </span>
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-2xl leading-relaxed">
              Predicting climate-sensitive disease outbreaks 7–30 days in advance to protect children and communities across Africa. Operational pilot covering 417,706 people in Turkana County, Kenya, with a surveillance catchment of 10.6 million across 10 counties. Built for frontline health workers, policymakers, and communities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-sidebar hover:bg-white/90 gap-2 font-semibold">
                  <BarChart3 className="h-5 w-5" />
                  Explore Dashboard
                </Button>
              </Link>
              <Link href="/data-repository">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                  <Database className="h-5 w-5" />
                  Open Data
                </Button>
              </Link>
              <Link href="/alerts">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Live Alerts
                  <Badge className="bg-red-500 text-white text-xs ml-1">5</Badge>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b bg-white">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm font-semibold text-foreground mt-0.5">{stat.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-tight">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="container py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-3">Platform Capabilities</h2>
          <p className="text-muted-foreground max-w-2xl">
            A fully integrated climate-health intelligence system covering the complete cycle from data ingestion to frontline action.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => (
            <Link key={i} href={feature.href}>
              <Card className="h-full stat-card cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className={`h-10 w-10 rounded-lg ${feature.bg} flex items-center justify-center mb-3`}>
                    <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-base flex items-center justify-between">
                    {feature.title}
                    <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Countries coverage */}
      <section className="bg-muted/40 border-y">
        <div className="container py-12">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-3">Geographic Coverage</h2>
              <p className="text-muted-foreground mb-4">
                AIfluence processes WHO and World Bank climate-health data for 5 countries in East and Southern Africa. Kenya has an active community-level pilot in Turkana County. The remaining 4 countries have national-level data integrated and forecasts running, ready for community-level deployment.
              </p>
              <div className="flex gap-3 mb-4">
                <div className="flex items-center gap-1.5 text-xs"><span className="h-2.5 w-2.5 rounded-full bg-primary inline-block"></span> Operational pilot</div>
                <div className="flex items-center gap-1.5 text-xs"><span className="h-2.5 w-2.5 rounded-full bg-blue-300 inline-block"></span> Data platform active</div>
              </div>
              <div className="space-y-3">
                {COUNTRIES.map((country) => (
                  <div key={country.id} className="p-3 bg-white rounded-lg border">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">{country.name}</span>
                        <span className="text-xs text-muted-foreground">{country.region}</span>
                      </div>
                      <Badge variant="outline" className={country.coverageStatus === 'pilot' ? 'text-primary border-primary/30 text-xs' : 'text-blue-600 border-blue-300 text-xs'}>
                        {country.coverageStatus === 'pilot' ? 'Operational Pilot' : 'Data Platform'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground ml-7">{country.coverageNote}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-3">Digital Public Good Standards</h2>
              <p className="text-muted-foreground mb-6">
                AIfluence is built to meet all Digital Public Goods Alliance standards, ensuring it can be freely adopted, adapted, and deployed by any health system.
              </p>
              <div className="space-y-2.5">
                {DPG_STANDARDS.map((standard, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{standard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact section */}
      <section className="container py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Measured Impact</h2>
          <p className="text-muted-foreground">Real outcomes from active deployments across the platform's operational footprint.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Heart, value: "127", label: "Lives Saved", sub: "Pilot estimate, Turkana County", color: "text-red-500", bg: "bg-red-50" },
            { icon: ShieldCheck, value: "543", label: "Severe Cases Prevented", sub: "76% in children under 5 (WHO)", color: "text-green-500", bg: "bg-green-50" },
            { icon: Users, value: "83,541", label: "Children Under 5", sub: "In Turkana pilot catchment", color: "text-primary", bg: "bg-primary/10" },
            { icon: TrendingUp, value: "$2.75", label: "ROI per $1 Invested", sub: "Pilot period, Turkana County", color: "text-orange-500", bg: "bg-orange-50" },
          ].map((item, i) => (
            <Card key={i} className="text-center stat-card">
              <CardContent className="pt-6">
                <div className={`h-12 w-12 rounded-full ${item.bg} flex items-center justify-center mx-auto mb-3`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div className="text-3xl font-bold text-foreground">{item.value}</div>
                <div className="text-sm font-semibold mt-1">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-tight">{item.sub}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Child Health Mandate */}
      <section className="container py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">Built for Children</Badge>
            <h2 className="text-3xl font-bold mb-4">Why Children Are at the Centre</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Children under 5 account for 76% of all malaria deaths in sub-Saharan Africa (WHO 2024). Climate change is accelerating the spread of malaria, cholera, and malnutrition — the three leading killers of young children in the region. AIfluence gives health systems the advance warning they need to act before children present with severe disease.
            </p>
            <div className="space-y-3">
              {[
                { stat: "76%", text: "of malaria deaths in Africa are children under 5 (WHO 2024)" },
                { stat: "45M", text: "children at risk from climate-health crises in East Africa (UNICEF 2024)" },
                { stat: "7–30 days", text: "advance warning gives time to pre-position ACTs and RDTs before children fall ill" },
                { stat: "91.2%", text: "forecast accuracy for malnutrition — a child-specific climate-driven condition" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-3 bg-muted/40 rounded-lg border">
                  <span className="text-primary font-bold text-sm min-w-[60px]">{item.stat}</span>
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-4 pb-4">
                <p className="text-sm font-semibold mb-1">Pilot: Turkana County, Kenya</p>
                <p className="text-xs text-muted-foreground">83,541 children under 5 in active surveillance catchment. 2,250 CHWs trained to report suspected cases via SMS. 167 health facilities stocked based on AI-generated pre-positioning alerts.</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-4 pb-4">
                <p className="text-sm font-semibold mb-1">Scale: 10-County Surveillance Catchment</p>
                <p className="text-xs text-muted-foreground">2.1 million children under 5 within the geographic surveillance catchment across 10 Kenyan counties. Platform designed to extend to 5 countries covering an estimated 12 million children under 5.</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="pt-4 pb-4">
                <p className="text-sm font-semibold mb-1">UNICEF Alignment</p>
                <p className="text-xs text-muted-foreground">Directly addresses UNICEF's three priority climate-health threats for children: malaria, cholera, and malnutrition. Open-source, offline-capable, and designed for UNICEF's CHW delivery model.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-12 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to explore the platform?</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
            Access real-time surveillance data, AI forecasts, and open datasets. No registration required for public data access.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 font-semibold">
                <BarChart3 className="h-5 w-5" />
                Open Dashboard
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Activity className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-sm">AIfluence</span>
                <span className="text-muted-foreground text-xs ml-2">Climate-Health Intelligence Platform</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground text-center">
              Open-source · MIT License · Data: WHO, World Bank, DHIS2 · Built for Digital Public Goods
            </div>
            <div className="text-xs text-muted-foreground">
              v2.1.0 · April 2026
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
