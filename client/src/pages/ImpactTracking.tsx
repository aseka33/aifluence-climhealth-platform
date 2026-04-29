// ImpactTracking.tsx — AIfluence Climate-Health Intelligence Platform

import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Heart, ShieldCheck, Activity } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, AreaChart, Area,
} from "recharts";
import { COUNTRIES } from "@/lib/data";

const IMPACT_STATS = [
  { label: "Lives Protected", value: "2.1M", sub: "Under active surveillance", icon: Heart, color: "text-red-500", bg: "bg-red-50", border: "border-l-red-500" },
  { label: "CHWs Empowered", value: "2,250", sub: "Across 5 countries", icon: Users, color: "text-primary", bg: "bg-primary/10", border: "border-l-primary" },
  { label: "Households Covered", value: "99,453", sub: "Under active monitoring", icon: ShieldCheck, color: "text-green-500", bg: "bg-green-50", border: "border-l-green-500" },
  { label: "ROI per $1 Invested", value: "$12.50", sub: "Economic return", icon: DollarSign, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-l-yellow-500" },
  { label: "Prediction Accuracy", value: "87.8%", sub: "7-day malaria forecast", icon: Activity, color: "text-teal-500", bg: "bg-teal-50", border: "border-l-teal-500" },
  { label: "Advance Warning", value: "7–30 days", sub: "Before outbreak peaks", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-50", border: "border-l-orange-500" },
];

const COUNTRY_IMPACT = COUNTRIES.map((c, i) => ({
  country: c.name,
  chws: [450, 380, 520, 410, 490][i],
  households: [21000, 18500, 24000, 19000, 17000][i],
  facilities: [35, 28, 42, 31, 31][i],
  alertsIssued: [12, 8, 15, 10, 11][i],
}));

const MONTHLY_IMPACT = [
  { month: "Oct", alertsIssued: 4, outbreaksPrevented: 2, casesAverted: 1200 },
  { month: "Nov", alertsIssued: 6, outbreaksPrevented: 3, casesAverted: 1800 },
  { month: "Dec", alertsIssued: 9, outbreaksPrevented: 5, casesAverted: 3100 },
  { month: "Jan", alertsIssued: 11, outbreaksPrevented: 6, casesAverted: 4200 },
  { month: "Feb", alertsIssued: 8, outbreaksPrevented: 4, casesAverted: 2900 },
  { month: "Mar", alertsIssued: 14, outbreaksPrevented: 8, casesAverted: 5800 },
  { month: "Apr", alertsIssued: 12, outbreaksPrevented: 7, casesAverted: 4900 },
];

const ROI_DATA = [
  { category: "Early Warning Alerts", benefit: 2800000, cost: 120000 },
  { category: "CHW Decision Support", benefit: 1900000, cost: 85000 },
  { category: "Supply Chain Optimisation", benefit: 1400000, cost: 60000 },
  { category: "Policy Intelligence", benefit: 900000, cost: 35000 },
];

export default function ImpactTracking() {
  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div>
          <h1 className="text-2xl font-bold">Impact Tracking</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Measuring health, economic, and social outcomes · Platform inception to date
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {IMPACT_STATS.map((item, i) => (
            <Card key={i} className={`stat-card border-l-4 ${item.border}`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{item.label}</p>
                    <p className="text-2xl font-bold mt-1">{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
                  </div>
                  <div className={`h-9 w-9 rounded-lg ${item.bg} flex items-center justify-center`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly outcomes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Monthly Outcomes — Oct 2025 to Apr 2026</CardTitle>
            <CardDescription className="text-xs">Alerts issued, outbreaks prevented, and estimated cases averted</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={MONTHLY_IMPACT} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar yAxisId="left" dataKey="alertsIssued" fill="oklch(0.42 0.10 195)" radius={[3, 3, 0, 0]} name="Alerts Issued" />
                <Bar yAxisId="left" dataKey="outbreaksPrevented" fill="oklch(0.62 0.16 155)" radius={[3, 3, 0, 0]} name="Outbreaks Prevented" />
                <Line yAxisId="right" type="monotone" dataKey="casesAverted" stroke="oklch(0.58 0.22 25)" strokeWidth={2.5} dot={false} name="Cases Averted" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Country breakdown */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Country-Level Impact Summary</CardTitle>
            <CardDescription className="text-xs">CHWs, households, facilities, and alerts by country</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    {["Country", "CHWs", "Households", "Facilities", "Alerts Issued"].map((h) => (
                      <th key={h} className="text-left py-2 pr-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COUNTRY_IMPACT.map((row) => (
                    <tr key={row.country} className="border-b last:border-0 hover:bg-muted/20">
                      <td className="py-3 pr-4 font-medium">{row.country}</td>
                      <td className="py-3 pr-4">{row.chws.toLocaleString()}</td>
                      <td className="py-3 pr-4">{row.households.toLocaleString()}</td>
                      <td className="py-3 pr-4">{row.facilities}</td>
                      <td className="py-3">{row.alertsIssued}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* ROI */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Economic Return on Investment</CardTitle>
            <CardDescription className="text-xs">Estimated benefit vs. cost by platform module · $12.50 ROI per $1 invested</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ROI_DATA} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10 }} tickLine={false} tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 10 }} tickLine={false} width={160} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} formatter={(v: number) => [`$${(v / 1000).toFixed(0)}k`, ""]} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="benefit" fill="oklch(0.62 0.16 155)" radius={[0, 3, 3, 0]} name="Estimated Benefit" />
                <Bar dataKey="cost" fill="oklch(0.42 0.10 195)" radius={[0, 3, 3, 0]} name="Platform Cost" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
