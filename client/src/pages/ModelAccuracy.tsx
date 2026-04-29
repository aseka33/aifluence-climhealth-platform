// ModelAccuracy.tsx — AIfluence Climate-Health Intelligence Platform

import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ReferenceLine } from "recharts";
import { MODEL_ACCURACY, MONTHLY_MALARIA_TREND } from "@/lib/data";
import { ShieldCheck, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";

const VALIDATION_RESULTS = [
  { disease: "Malaria", country: "Kenya", accuracy: 87.8, mae: 12.6, rmse: 18.3, leadTimeDays: 14, sampleSize: 847 },
  { disease: "Malaria", country: "Tanzania", accuracy: 84.2, mae: 15.1, rmse: 21.7, leadTimeDays: 14, sampleSize: 612 },
  { disease: "Cholera", country: "Tanzania", accuracy: 81.4, mae: 18.3, rmse: 26.4, leadTimeDays: 7, sampleSize: 234 },
  { disease: "Malnutrition", country: "Kenya", accuracy: 91.2, mae: 8.7, rmse: 12.1, leadTimeDays: 30, sampleSize: 189 },
  { disease: "Rift Valley Fever", country: "Uganda", accuracy: 78.9, mae: 22.4, rmse: 31.8, leadTimeDays: 14, sampleSize: 87 },
  { disease: "Dengue Fever", country: "Rwanda", accuracy: 76.3, mae: 24.1, rmse: 34.2, leadTimeDays: 10, sampleSize: 64 },
];

const MODEL_INPUTS = [
  { name: "21-day Cumulative Rainfall", importance: 34, source: "CHIRPS v2.0" },
  { name: "Mean Temperature (7-day)", importance: 22, source: "ERA5" },
  { name: "NDVI (Vegetation Index)", importance: 14, source: "MODIS" },
  { name: "Prior Season Case Count", importance: 12, source: "DHIS2" },
  { name: "CHW Mosquito Reports", importance: 8, source: "AIfluence CHW Network" },
  { name: "Humidity (Relative)", importance: 6, source: "ERA5" },
  { name: "Water Body Extent", importance: 4, source: "JRC Surface Water" },
];

export default function ModelAccuracy() {
  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div>
          <h1 className="text-2xl font-bold">Model Accuracy & Validation</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Continuous performance monitoring · Cross-validated against DHIS2 ground truth
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Overall Accuracy", value: "87.8%", sub: "7-day malaria forecast", icon: ShieldCheck, color: "text-green-500" },
            { label: "Mean Abs Error", value: "12.6", sub: "cases per 1,000", icon: TrendingUp, color: "text-blue-500" },
            { label: "Lead Time", value: "7–30d", sub: "advance warning", icon: CheckCircle2, color: "text-primary" },
            { label: "Validation Events", value: "847", sub: "confirmed outbreaks", icon: AlertTriangle, color: "text-orange-500" },
          ].map((item, i) => (
            <Card key={i} className="stat-card text-center">
              <CardContent className="pt-4 pb-4">
                <item.icon className={`h-6 w-6 mx-auto mb-2 ${item.color}`} />
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Accuracy trend */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Monthly Accuracy Trend — 2026</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={MODEL_ACCURACY}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="period" tick={{ fontSize: 11 }} />
                  <YAxis domain={[80, 95]} tick={{ fontSize: 11 }} unit="%" />
                  <Tooltip formatter={(v: number) => [`${v}%`, "Accuracy"]} />
                  <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="4 4" label={{ value: "Min threshold", fontSize: 10 }} />
                  <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Feature importance */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Feature Importance (Malaria Model)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5">
                {MODEL_INPUTS.map((f) => (
                  <div key={f.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">{f.name}</span>
                      <span className="text-muted-foreground">{f.importance}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${f.importance * 2.5}%` }} />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Source: {f.source}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Validation by disease */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Validation Results by Disease & Country</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    {["Disease", "Country", "Accuracy", "MAE", "RMSE", "Lead Time", "Sample Size", "Status"].map((h) => (
                      <th key={h} className="text-left py-2 pr-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {VALIDATION_RESULTS.map((r, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/20">
                      <td className="py-2.5 pr-4 font-semibold text-xs">{r.disease}</td>
                      <td className="py-2.5 pr-4 text-xs">{r.country}</td>
                      <td className="py-2.5 pr-4">
                        <span className={`text-xs font-bold ${r.accuracy >= 85 ? "text-green-600" : r.accuracy >= 75 ? "text-orange-600" : "text-red-600"}`}>{r.accuracy}%</span>
                      </td>
                      <td className="py-2.5 pr-4 text-xs">{r.mae}</td>
                      <td className="py-2.5 pr-4 text-xs">{r.rmse}</td>
                      <td className="py-2.5 pr-4 text-xs">{r.leadTimeDays} days</td>
                      <td className="py-2.5 pr-4 text-xs">{r.sampleSize.toLocaleString()}</td>
                      <td className="py-2.5">
                        <Badge className={`text-[10px] px-1.5 ${r.accuracy >= 80 ? "bg-green-100 text-green-700 border-green-200" : "bg-yellow-100 text-yellow-700 border-yellow-200"}`}>
                          {r.accuracy >= 80 ? "Validated" : "Improving"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
