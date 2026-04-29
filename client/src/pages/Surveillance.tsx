// Surveillance.tsx — AIfluence Climate-Health Intelligence Platform
// Multi-country, multi-disease surveillance with real WHO data

import { useState } from "react";
import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Minus, Activity } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { SURVEILLANCE_DATA, KENYA_COUNTIES, MONTHLY_MALARIA_TREND, DISEASES, COUNTRIES } from "@/lib/data";

export default function Surveillance() {
  const [selectedDisease, setSelectedDisease] = useState("Malaria");

  const diseaseData = SURVEILLANCE_DATA.filter((d) => d.disease === selectedDisease);

  const countryCompare = COUNTRIES.map((c) => {
    const row = diseaseData.find((d) => d.country === c.name);
    return {
      country: c.name,
      cases: row?.cases ?? 0,
      deaths: row?.deaths ?? 0,
      incidence: row?.incidencePer1000 ?? 0,
      change: row?.changeVsPriorYear ?? 0,
    };
  }).filter((c) => c.cases > 0);

  const radarData = COUNTRIES.map((c) => {
    const malaria = SURVEILLANCE_DATA.find((d) => d.country === c.name && d.disease === "Malaria");
    const cholera = SURVEILLANCE_DATA.find((d) => d.country === c.name && d.disease === "Cholera");
    return {
      country: c.name.slice(0, 3),
      malaria: malaria ? Math.min(100, malaria.incidencePer1000 / 3.5) : 0,
      cholera: cholera ? Math.min(100, cholera.incidencePer1000 * 500) : 0,
    };
  });

  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Disease Surveillance</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Real-time monitoring · WHO & DHIS2 data · 5 countries · 18 diseases
            </p>
          </div>
          <Select value={selectedDisease} onValueChange={setSelectedDisease}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["Malaria", "Cholera", "Dengue Fever", "Rift Valley Fever", "Malnutrition"].map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Country comparison table */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{selectedDisease} — Country Comparison (2024)</CardTitle>
            <CardDescription className="text-xs">Source: WHO Global Health Observatory · World Bank</CardDescription>
          </CardHeader>
          <CardContent>
            {countryCompare.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">No surveillance data available for {selectedDisease} across all 5 countries yet. Expand data integration to include this disease.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Country</th>
                      <th className="text-right py-2 pr-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Cases (2024)</th>
                      <th className="text-right py-2 pr-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Deaths</th>
                      <th className="text-right py-2 pr-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Incidence/1000</th>
                      <th className="text-right py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">YoY Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countryCompare.map((row) => (
                      <tr key={row.country} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="py-3 pr-4 font-medium">{row.country}</td>
                        <td className="py-3 pr-4 text-right">{row.cases.toLocaleString()}</td>
                        <td className="py-3 pr-4 text-right text-red-600">{row.deaths.toLocaleString()}</td>
                        <td className="py-3 pr-4 text-right">{row.incidence.toFixed(1)}</td>
                        <td className="py-3 text-right">
                          <span className={`flex items-center justify-end gap-1 ${row.change < 0 ? "text-green-600" : row.change > 0 ? "text-red-600" : "text-muted-foreground"}`}>
                            {row.change < 0 ? <TrendingDown className="h-3 w-3" /> : row.change > 0 ? <TrendingUp className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
                            {row.change > 0 ? "+" : ""}{row.change.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="trend">
          <TabsList>
            <TabsTrigger value="trend">Monthly Trend</TabsTrigger>
            <TabsTrigger value="counties">Kenya Counties</TabsTrigger>
            <TabsTrigger value="radar">Multi-Disease Radar</TabsTrigger>
          </TabsList>

          <TabsContent value="trend" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Malaria Cases vs. Climate Indicators — Kenya 2023–2024</CardTitle>
                <CardDescription className="text-xs">Monthly trend with rainfall and risk score overlay</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={MONTHLY_MALARIA_TREND} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} tickLine={false} />
                    <YAxis yAxisId="left" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line yAxisId="left" type="monotone" dataKey="cases" stroke="oklch(0.42 0.10 195)" strokeWidth={2} dot={false} name="Cases" />
                    <Line yAxisId="right" type="monotone" dataKey="rainfall" stroke="oklch(0.62 0.16 155)" strokeWidth={2} dot={false} name="Rainfall (mm)" strokeDasharray="5 5" />
                    <Line yAxisId="right" type="monotone" dataKey="riskScore" stroke="oklch(0.58 0.22 25)" strokeWidth={2} dot={false} name="Risk Score" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="counties" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Kenya County Malaria Burden (2024)</CardTitle>
                <CardDescription className="text-xs">Cases and prevalence by county · Kenya MoH / KHIS data</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={KENYA_COUNTIES} margin={{ top: 5, right: 20, left: -10, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} tickLine={false} angle={-35} textAnchor="end" />
                    <YAxis yAxisId="left" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar yAxisId="left" dataKey="cases" fill="oklch(0.42 0.10 195)" radius={[3, 3, 0, 0]} name="Cases" />
                    <Bar yAxisId="right" dataKey="prevalence" fill="oklch(0.70 0.16 55)" radius={[3, 3, 0, 0]} name="Prevalence %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="radar" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Multi-Disease Burden Radar — All 5 Countries</CardTitle>
                <CardDescription className="text-xs">Normalised incidence scores for malaria and cholera</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={320}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="country" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                    <Radar name="Malaria" dataKey="malaria" stroke="oklch(0.42 0.10 195)" fill="oklch(0.42 0.10 195)" fillOpacity={0.3} />
                    <Radar name="Cholera" dataKey="cholera" stroke="oklch(0.58 0.22 25)" fill="oklch(0.58 0.22 25)" fillOpacity={0.3} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Disease catalogue */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">18 Climate-Sensitive Diseases Monitored</CardTitle>
            <CardDescription className="text-xs">ICD-10 coded · Climate linkage documented</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {DISEASES.map((d) => (
                <div key={d.id} className="flex items-start gap-2 p-2.5 rounded-lg border hover:bg-muted/20 transition-colors">
                  <Activity className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold">{d.name}</p>
                    <p className="text-[10px] text-muted-foreground">{d.category} · {d.icdCode}</p>
                    <p className="text-[10px] text-muted-foreground">{d.climateLink}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
