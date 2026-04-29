// Forecasting.tsx — AIfluence Climate-Health Intelligence Platform
// 14-day outbreak forecasting with confidence intervals and contributing factors

import { useState } from "react";
import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Thermometer, Droplets, Wind, Activity, ShieldCheck } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, ReferenceLine, ComposedChart, Line,
} from "recharts";
import { FORECAST_14DAY, KENYA_COUNTIES, MODEL_ACCURACY } from "@/lib/data";

const CONTRIBUTING_FACTORS = [
  { factor: "21-day Cumulative Rainfall", weight: 34, direction: "positive", value: "187mm (+68% above avg)" },
  { factor: "Mean Temperature", weight: 22, direction: "positive", value: "27.4°C (+1.2°C above avg)" },
  { factor: "Relative Humidity", weight: 18, direction: "positive", value: "74% (favourable for vectors)" },
  { factor: "Prior 30-day Case Count", weight: 15, direction: "positive", value: "38,420 cases (elevated)" },
  { factor: "Health Facility Readiness", weight: 7, direction: "negative", value: "63/100 (below threshold)" },
  { factor: "Intervention Coverage", weight: 4, direction: "negative", value: "ITN coverage: 68%" },
];

export default function Forecasting() {
  const [selectedCounty, setSelectedCounty] = useState("1");
  const county = KENYA_COUNTIES.find((c) => c.id.toString() === selectedCounty) || KENYA_COUNTIES[0];

  const avgRisk = Math.round(FORECAST_14DAY.reduce((s, d) => s + d.riskScore, 0) / FORECAST_14DAY.length);
  const peakDay = FORECAST_14DAY.reduce((m, d) => d.riskScore > m.riskScore ? d : m, FORECAST_14DAY[0]);
  const highRiskDays = FORECAST_14DAY.filter((d) => d.riskScore >= 60).length;

  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Outbreak Forecasting</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              AI ensemble model · 14-day horizon · 87.8% accuracy · 7–30 day advance warning
            </p>
          </div>
          <Select value={selectedCounty} onValueChange={setSelectedCounty}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {KENYA_COUNTIES.map((c) => (
                <SelectItem key={c.id} value={c.id.toString()}>{c.name} County</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Avg 14-Day Risk", value: `${avgRisk}/100`, sub: "Elevated", color: "border-l-orange-500", icon: TrendingUp, iconColor: "text-orange-500", bg: "bg-orange-50" },
            { label: "Peak Risk Day", value: peakDay.date, sub: `Score: ${peakDay.riskScore}/100`, color: "border-l-red-500", icon: Activity, iconColor: "text-red-500", bg: "bg-red-50" },
            { label: "High-Risk Days", value: `${highRiskDays}/14`, sub: "Risk score ≥ 60", color: "border-l-yellow-500", icon: ShieldCheck, iconColor: "text-yellow-500", bg: "bg-yellow-50" },
            { label: "Model Confidence", value: "87.8%", sub: "7-day malaria", color: "border-l-green-500", icon: ShieldCheck, iconColor: "text-green-500", bg: "bg-green-50" },
          ].map((item, i) => (
            <Card key={i} className={`stat-card border-l-4 ${item.color}`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{item.label}</p>
                    <p className="text-2xl font-bold mt-1">{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.sub}</p>
                  </div>
                  <div className={`h-9 w-9 rounded-lg ${item.bg} flex items-center justify-center`}>
                    <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="forecast">
          <TabsList>
            <TabsTrigger value="forecast">14-Day Forecast</TabsTrigger>
            <TabsTrigger value="climate">Climate Drivers</TabsTrigger>
            <TabsTrigger value="factors">Contributing Factors</TabsTrigger>
            <TabsTrigger value="accuracy">Model Accuracy</TabsTrigger>
          </TabsList>

          <TabsContent value="forecast" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{county.name} County — 14-Day Malaria Risk Forecast</CardTitle>
                <CardDescription className="text-xs">Risk score (0–100) with predicted case count · Confidence interval shown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={FORECAST_14DAY} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="riskAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="oklch(0.58 0.22 25)" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="oklch(0.58 0.22 25)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} />
                    <YAxis yAxisId="left" domain={[0, 100]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: "Risk Score", angle: -90, position: "insideLeft", offset: 15, style: { fontSize: 10 } }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} label={{ value: "Cases", angle: 90, position: "insideRight", offset: 10, style: { fontSize: 10 } }} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <ReferenceLine yAxisId="left" y={75} stroke="#dc2626" strokeDasharray="4 4" label={{ value: "Critical", position: "right", fontSize: 10, fill: "#dc2626" }} />
                    <ReferenceLine yAxisId="left" y={60} stroke="#ea580c" strokeDasharray="4 4" label={{ value: "High", position: "right", fontSize: 10, fill: "#ea580c" }} />
                    <Area yAxisId="left" type="monotone" dataKey="riskScore" stroke="oklch(0.58 0.22 25)" fill="url(#riskAreaGrad)" strokeWidth={2.5} name="Risk Score" />
                    <Bar yAxisId="right" dataKey="predictedCases" fill="oklch(0.42 0.10 195)" fillOpacity={0.6} radius={[2, 2, 0, 0]} name="Predicted Cases" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="climate" className="mt-4">
            <div className="grid lg:grid-cols-2 gap-5">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">14-Day Rainfall Forecast</CardTitle>
                  <CardDescription className="text-xs">CHIRPS satellite data · mm per day</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={FORECAST_14DAY} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 9 }} tickLine={false} />
                      <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} formatter={(v: number) => [`${v}mm`, "Rainfall"]} />
                      <Bar dataKey="rainfall" fill="oklch(0.62 0.16 155)" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">14-Day Temperature Forecast</CardTitle>
                  <CardDescription className="text-xs">ERA5 reanalysis · °C</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={FORECAST_14DAY} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="oklch(0.70 0.16 55)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="oklch(0.70 0.16 55)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 9 }} tickLine={false} />
                      <YAxis domain={[24, 32]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} formatter={(v: number) => [`${v}°C`, "Temperature"]} />
                      <Area type="monotone" dataKey="temperature" stroke="oklch(0.70 0.16 55)" fill="url(#tempGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="factors" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Contributing Factor Analysis</CardTitle>
                <CardDescription className="text-xs">Model feature importance · {county.name} County · April 29, 2026</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {CONTRIBUTING_FACTORS.map((f, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{f.factor}</span>
                        <Badge className={`text-[10px] px-1.5 ${f.direction === "positive" ? "bg-red-100 text-red-700 border-red-200" : "bg-green-100 text-green-700 border-green-200"}`}>
                          {f.direction === "positive" ? "↑ Risk" : "↓ Risk"}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold">{f.weight}%</span>
                        <span className="text-xs text-muted-foreground ml-2">{f.value}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${f.direction === "positive" ? "bg-red-500" : "bg-green-500"}`}
                        style={{ width: `${f.weight * 2.5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accuracy" className="mt-4">
            <div className="grid lg:grid-cols-2 gap-5">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Monthly Model Accuracy</CardTitle>
                  <CardDescription className="text-xs">Accuracy % and Mean Absolute Error</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <ComposedChart data={MODEL_ACCURACY} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="period" tick={{ fontSize: 10 }} tickLine={false} />
                      <YAxis yAxisId="left" domain={[80, 95]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar yAxisId="left" dataKey="accuracy" fill="oklch(0.42 0.10 195)" radius={[3, 3, 0, 0]} name="Accuracy %" />
                      <Line yAxisId="right" type="monotone" dataKey="mae" stroke="oklch(0.58 0.22 25)" strokeWidth={2} dot={false} name="MAE" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Model Performance Summary</CardTitle>
                  <CardDescription className="text-xs">Current model version · April 2026</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "Overall Accuracy (7-day)", value: "87.8%", good: true },
                    { label: "Mean Absolute Error", value: "12.6 cases", good: true },
                    { label: "RMSE", value: "18.3", good: true },
                    { label: "False Positive Rate", value: "8.2%", good: true },
                    { label: "False Negative Rate", value: "4.1%", good: true },
                    { label: "CHW Feedback Validation", value: "29 reports/month", good: true },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className={`text-sm font-bold ${item.good ? "text-green-600" : "text-red-600"}`}>{item.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
