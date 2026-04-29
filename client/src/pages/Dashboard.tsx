// Dashboard.tsx — AIfluence Climate-Health Intelligence Platform
// Main operational dashboard: KPIs, charts, alerts, forecast summary

import { useState } from "react";
import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import {
  AlertTriangle,
  Activity,
  TrendingUp,
  Users,
  Heart,
  Building2,
  ArrowRight,
  Droplets,
  Thermometer,
  Wind,
  ShieldCheck,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  COUNTRIES,
  MONTHLY_MALARIA_TREND,
  ACTIVE_ALERTS,
  IMPACT_METRICS,
  KENYA_COUNTIES,
  FORECAST_14DAY,
} from "@/lib/data";

const SEVERITY_COLORS: Record<string, string> = {
  critical: "bg-red-100 text-red-800 border-red-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
};

export default function Dashboard() {
  const [selectedCountry, setSelectedCountry] = useState("1");

  const country = COUNTRIES.find((c) => c.id.toString() === selectedCountry) || COUNTRIES[0];
  const criticalAlerts = ACTIVE_ALERTS.filter((a) => a.severity === "critical").length;
  const highAlerts = ACTIVE_ALERTS.filter((a) => a.severity === "high").length;

  // Recent 8 months for chart
  const chartData = MONTHLY_MALARIA_TREND.slice(-8);

  // Top 5 counties by cases for bar chart
  const countyBarData = KENYA_COUNTIES.slice(0, 6).map((c) => ({
    name: c.name.length > 8 ? c.name.slice(0, 8) : c.name,
    cases: Math.round(c.cases / 1000),
    risk: c.prevalence,
  }));

  // Next 7 days forecast
  const forecastSummary = FORECAST_14DAY.slice(0, 7);
  const avgForecastRisk = Math.round(forecastSummary.reduce((s, d) => s + d.riskScore, 0) / forecastSummary.length);

  return (
    <PageLayout>
      {/* Page header */}
      <div className="border-b bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Operational Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Real-time climate-health surveillance · Last updated: April 29, 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-44">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c.id} value={c.id.toString()}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Link href="/alerts">
              <Button variant="destructive" size="sm" className="gap-2">
                <AlertTriangle className="h-4 w-4" />
                {criticalAlerts + highAlerts} Active Alerts
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="stat-card border-l-4 border-l-red-500">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Active Alerts</p>
                  <p className="text-3xl font-bold mt-1">{ACTIVE_ALERTS.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">{criticalAlerts} critical · {highAlerts} high</p>
                </div>
                <div className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card border-l-4 border-l-primary">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">7-Day Forecast Risk</p>
                  <p className="text-3xl font-bold mt-1">{avgForecastRisk}<span className="text-lg font-normal text-muted-foreground">/100</span></p>
                  <p className="text-xs text-muted-foreground mt-1">Turkana County · High risk</p>
                </div>
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card border-l-4 border-l-green-500">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Model Accuracy</p>
                  <p className="text-3xl font-bold mt-1">87.8<span className="text-lg font-normal text-muted-foreground">%</span></p>
                  <p className="text-xs text-muted-foreground mt-1">7-day malaria prediction</p>
                </div>
                <div className="h-9 w-9 rounded-lg bg-green-50 flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card border-l-4 border-l-orange-500">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">CHWs Active</p>
                  <p className="text-3xl font-bold mt-1">2,250</p>
                  <p className="text-xs text-muted-foreground mt-1">99,453 households covered</p>
                </div>
                <div className="h-9 w-9 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Users className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Climate conditions row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Thermometer, label: "Temperature", value: "27.4°C", sub: "+1.2°C above avg", color: "text-orange-500", bg: "bg-orange-50" },
            { icon: Droplets, label: "Rainfall (21-day)", value: "187mm", sub: "168% of seasonal avg", color: "text-blue-500", bg: "bg-blue-50" },
            { icon: Wind, label: "Humidity", value: "74%", sub: "Favourable for vectors", color: "text-teal-500", bg: "bg-teal-50" },
            { icon: Activity, label: "Outbreak Risk Index", value: "HIGH", sub: "Score: 78/100", color: "text-red-500", bg: "bg-red-50" },
          ].map((item, i) => (
            <Card key={i} className="stat-card">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-bold text-sm">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main charts row */}
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Malaria trend chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Malaria Cases vs. Climate Indicators</CardTitle>
                  <CardDescription className="text-xs">Kenya · Monthly trend 2023–2024</CardDescription>
                </div>
                <Link href="/surveillance">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    Full view <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="casesGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.42 0.10 195)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.42 0.10 195)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="rainfallGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.62 0.16 155)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.62 0.16 155)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 6 }}
                    formatter={(value: number, name: string) => [
                      name === "cases" ? value.toLocaleString() : value,
                      name === "cases" ? "Cases" : name === "rainfall" ? "Rainfall (mm)" : "Risk Score"
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area yAxisId="left" type="monotone" dataKey="cases" stroke="oklch(0.42 0.10 195)" fill="url(#casesGrad)" strokeWidth={2} name="cases" />
                  <Area yAxisId="right" type="monotone" dataKey="rainfall" stroke="oklch(0.62 0.16 155)" fill="url(#rainfallGrad)" strokeWidth={2} name="rainfall" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* County risk bar chart */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">County Risk Ranking</CardTitle>
                  <CardDescription className="text-xs">Cases (thousands) · Kenya 2024</CardDescription>
                </div>
                <Link href="/maps">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    Map <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={countyBarData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 10 }} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={55} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} formatter={(v: number) => [`${v}k cases`]} />
                  <Bar dataKey="cases" fill="oklch(0.42 0.10 195)" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Active alerts + 7-day forecast */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Active alerts */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Active Alerts</CardTitle>
                <Link href="/alerts">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    All alerts <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {ACTIVE_ALERTS.slice(0, 4).map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                  <AlertTriangle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                    alert.severity === "critical" ? "text-red-500" :
                    alert.severity === "high" ? "text-orange-500" : "text-yellow-500"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold truncate">{alert.county}, {alert.country}</span>
                      <Badge className={`text-[10px] px-1.5 py-0 ${SEVERITY_COLORS[alert.severity]}`}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{alert.description}</p>
                    <p className="text-xs text-primary mt-1">{alert.disease} · {alert.confidence}% confidence</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 7-day forecast */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">7-Day Risk Forecast</CardTitle>
                  <CardDescription className="text-xs">Turkana County · Malaria risk score</CardDescription>
                </div>
                <Link href="/forecasting">
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    Full forecast <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={160}>
                <AreaChart data={forecastSummary} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.58 0.22 25)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.58 0.22 25)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} formatter={(v: number) => [`${v}/100`, "Risk Score"]} />
                  <Area type="monotone" dataKey="riskScore" stroke="oklch(0.58 0.22 25)" fill="url(#riskGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-3 mt-3">
                {[
                  { label: "Avg Risk", value: `${avgForecastRisk}/100` },
                  { label: "Peak Day", value: forecastSummary.reduce((m, d) => d.riskScore > m.riskScore ? d : m, forecastSummary[0]).date },
                  { label: "High-Risk Days", value: `${forecastSummary.filter((d) => d.riskScore >= 60).length}/7` },
                ].map((item, i) => (
                  <div key={i} className="text-center p-2 bg-muted/40 rounded-lg">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom row: facilities + impact */}
        <div className="grid lg:grid-cols-3 gap-5">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Health System Readiness</CardTitle>
              <CardDescription className="text-xs">Turkana County facilities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Facilities Operational", value: "167/186", pct: 90 },
                { label: "RDT Stock Available", value: "142/167", pct: 85 },
                { label: "ACT Stock Available", value: "118/167", pct: 71 },
                { label: "Avg Readiness Score", value: "63/100", pct: 63 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
              <Link href="/facilities">
                <Button variant="outline" size="sm" className="w-full mt-2 gap-2 text-xs">
                  <Building2 className="h-3 w-3" />
                  View All Facilities
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Platform Impact</CardTitle>
              <CardDescription className="text-xs">Cumulative outcomes 2025–2026</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: Heart, label: "Lives Saved (Pilot)", value: "127", color: "text-red-500" },
                { icon: ShieldCheck, label: "Severe Cases Prevented", value: "543", color: "text-green-500" },
                { icon: Users, label: "Children Under 5 (Pilot)", value: "83,541", color: "text-primary" },
                { icon: Building2, label: "Facilities Monitored", value: "167", color: "text-orange-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold">{item.value}</span>
                </div>
              ))}
              <Link href="/impact">
                <Button variant="outline" size="sm" className="w-full mt-2 gap-2 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  Full Impact Report
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">7-1-7 Compliance</CardTitle>
              <CardDescription className="text-xs">WHO framework: Detect · Report · Respond</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Detect within 7 days", value: "94%", pct: 94, color: "bg-green-500" },
                { label: "Report within 1 day", value: "88%", pct: 88, color: "bg-primary" },
                { label: "Respond within 7 days", value: "76%", pct: 76, color: "bg-orange-500" },
                { label: "Full 7-1-7 Compliant", value: "71%", pct: 71, color: "bg-purple-500" },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color} transition-all`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
              <Link href="/alerts">
                <Button variant="outline" size="sm" className="w-full mt-2 gap-2 text-xs">
                  <Activity className="h-3 w-3" />
                  View Alert History
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
