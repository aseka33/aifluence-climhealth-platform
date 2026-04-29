// Facilities.tsx — AIfluence Climate-Health Intelligence Platform

import { useState } from "react";
import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2, Search, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { HEALTH_FACILITIES } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Facilities() {
  const [search, setSearch] = useState("");
  const filtered = HEALTH_FACILITIES.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.subCounty.toLowerCase().includes(search.toLowerCase()) ||
    f.type.toLowerCase().includes(search.toLowerCase())
  );

  const avgReadiness = Math.round(HEALTH_FACILITIES.reduce((s, f) => s + f.readinessScore, 0) / HEALTH_FACILITIES.length);
  const operational = HEALTH_FACILITIES.filter((f) => f.isOperational).length;
  const hasRdt = HEALTH_FACILITIES.filter((f) => f.hasRdt).length;
  const hasAct = HEALTH_FACILITIES.filter((f) => f.hasAct).length;

  const readinessData = HEALTH_FACILITIES.map((f) => ({
    name: f.name.split(" ")[0],
    score: f.readinessScore,
  }));

  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Health Facilities</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Turkana County · {HEALTH_FACILITIES.length} facilities · Readiness monitoring
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Operational", value: `${operational}/${HEALTH_FACILITIES.length}`, color: "text-green-600" },
            { label: "Avg Readiness", value: `${avgReadiness}/100`, color: "text-primary" },
            { label: "RDT Available", value: `${hasRdt}/${HEALTH_FACILITIES.length}`, color: "text-blue-600" },
            { label: "ACT Available", value: `${hasAct}/${HEALTH_FACILITIES.length}`, color: "text-orange-600" },
          ].map((item, i) => (
            <Card key={i} className="stat-card text-center">
              <CardContent className="pt-4 pb-4">
                <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Facility Readiness Scores</CardTitle>
            <CardDescription className="text-xs">Score out of 100 · Threshold: 70</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={readinessData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} formatter={(v: number) => [`${v}/100`, "Readiness"]} />
                <Bar dataKey="score" fill="oklch(0.42 0.10 195)" radius={[3, 3, 0, 0]}
                  label={{ position: "top", fontSize: 9 }} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search facilities..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>

        <div className="space-y-3">
          {filtered.map((facility) => (
            <Card key={facility.id} className={`stat-card border-l-4 ${facility.isOperational ? "border-l-green-500" : "border-l-red-500"}`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-semibold">{facility.name}</span>
                      {facility.isOperational ? (
                        <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                          <CheckCircle2 className="h-2.5 w-2.5 mr-1" />Operational
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
                          <XCircle className="h-2.5 w-2.5 mr-1" />Non-operational
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{facility.type} · {facility.subCounty} · {facility.beds} beds · {facility.staff} staff</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs">{facility.hasRdt ? "✅" : "❌"} RDT</span>
                      <span className="text-xs">{facility.hasAct ? "✅" : "❌"} ACT</span>
                      {facility.readinessScore < 60 && (
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200 text-xs">
                          <AlertTriangle className="h-2.5 w-2.5 mr-1" />Below threshold
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`text-2xl font-bold ${facility.readinessScore >= 70 ? "text-green-600" : facility.readinessScore >= 50 ? "text-orange-600" : "text-red-600"}`}>
                      {facility.readinessScore}
                    </div>
                    <div className="text-xs text-muted-foreground">readiness</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
