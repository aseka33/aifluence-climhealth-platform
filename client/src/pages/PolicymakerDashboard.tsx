// PolicymakerDashboard.tsx — AIfluence Climate-Health Intelligence Platform
// Role-specific view for national/county policymakers

import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Globe, TrendingDown, AlertTriangle, FileText, Download } from "lucide-react";
import { SURVEILLANCE_DATA, IMPACT_METRICS, POLICY_BRIEFS } from "@/lib/data";
import { Link } from "wouter";

const COUNTRY_SUMMARY = [
  { country: "Kenya", malariaCases: 5_447_220, riskLevel: "High", alertCount: 3, trend: -3.2 },
  { country: "Tanzania", malariaCases: 7_230_000, riskLevel: "High", alertCount: 2, trend: -1.8 },
  { country: "Uganda", malariaCases: 12_400_000, riskLevel: "Critical", alertCount: 4, trend: 2.1 },
  { country: "Rwanda", malariaCases: 1_890_000, riskLevel: "Moderate", alertCount: 1, trend: -8.4 },
  { country: "Mozambique", malariaCases: 10_100_000, riskLevel: "Critical", alertCount: 3, trend: 1.4 },
];

export default function PolicymakerDashboard() {
  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">Policymaker View</Badge>
            </div>
            <h1 className="text-2xl font-bold">Regional Policy Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5">5-country overview · Evidence for health financing decisions</p>
          </div>
          <Button size="sm" variant="outline" className="gap-2">
            <Download className="h-3.5 w-3.5" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Regional KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Malaria Cases (2024)", value: "37.1M", sub: "Across 5 countries", color: "text-red-500" },
            { label: "Cost Avoidance (2025)", value: "$2.45M", sub: "Through early warning", color: "text-green-500" },
            { label: "Children Under 5 (Catchment)", value: "2.1M", sub: "10-county surveillance area", color: "text-primary" },
            { label: "Avg Response Time", value: "4.2 days", sub: "Alert to intervention", color: "text-orange-500" },
          ].map((item, i) => (
            <Card key={i} className="stat-card text-center">
              <CardContent className="pt-4 pb-4">
                <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-xs font-medium mt-0.5">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Country comparison */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Country Risk Status — April 2026</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {COUNTRY_SUMMARY.map((c) => (
                <div key={c.country} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/20">
                  <div className="w-24 font-semibold text-sm">{c.country}</div>
                  <Badge className={`text-xs w-20 justify-center ${c.riskLevel === "Critical" ? "bg-red-100 text-red-700 border-red-200" : c.riskLevel === "High" ? "bg-orange-100 text-orange-700 border-orange-200" : "bg-yellow-100 text-yellow-700 border-yellow-200"}`}>{c.riskLevel}</Badge>
                  <div className="flex-1 text-xs text-muted-foreground">{c.malariaCases.toLocaleString()} malaria cases</div>
                  <div className={`text-xs font-semibold ${c.trend < 0 ? "text-green-600" : "text-red-600"}`}>{c.trend > 0 ? "+" : ""}{c.trend}% YoY</div>
                  <Badge variant="outline" className="text-xs">{c.alertCount} active alerts</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Policy briefs */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Latest Policy Briefs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {POLICY_BRIEFS.slice(0, 3).map((brief) => (
              <div key={brief.id} className="p-3 rounded-lg border hover:bg-muted/20">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">{brief.country}</Badge>
                  <Badge variant="outline" className="text-xs">{brief.disease}</Badge>
                  <span className="text-xs text-muted-foreground ml-auto">{brief.date}</span>
                </div>
                <p className="text-sm font-semibold">{brief.title}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{brief.summary}</p>
              </div>
            ))}
            <Link href="/policy">
              <Button variant="outline" size="sm" className="w-full">View All Policy Briefs</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
