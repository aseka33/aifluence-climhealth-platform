// ManagerDashboard.tsx — AIfluence Climate-Health Intelligence Platform
// Role-specific view for district/program health managers

import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Package, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { ACTIVE_ALERTS, HEALTH_FACILITIES, CHW_OBSERVATIONS, IMPACT_METRICS } from "@/lib/data";
import { Link } from "wouter";

const SUPPLY_STATUS = [
  { item: "Artemether-Lumefantrine (ACT)", stock: 23, threshold: 30, unit: "% capacity", status: "critical" },
  { item: "Rapid Diagnostic Tests (RDTs)", stock: 67, threshold: 30, unit: "% capacity", status: "ok" },
  { item: "Insecticide-Treated Nets (ITNs)", stock: 41, threshold: 30, unit: "% capacity", status: "ok" },
  { item: "Oral Rehydration Salts", stock: 18, threshold: 30, unit: "% capacity", status: "critical" },
  { item: "Vitamin A Supplements", stock: 55, threshold: 30, unit: "% capacity", status: "ok" },
];

export default function ManagerDashboard() {
  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">Program Manager View</Badge>
            </div>
            <h1 className="text-2xl font-bold">Operations Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Turkana County · Supply chain · CHW performance · Facility readiness</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active CHWs", value: "2,250", sub: "99,453 households", icon: Users },
            { label: "Facilities Operational", value: "9/10", sub: "1 non-operational", icon: CheckCircle2 },
            { label: "Pending Interventions", value: "3", sub: "Awaiting approval", icon: Clock },
            { label: "Active Alerts", value: ACTIVE_ALERTS.length.toString(), sub: "Require response", icon: AlertTriangle },
          ].map((item, i) => (
            <Card key={i} className="stat-card text-center">
              <CardContent className="pt-4 pb-4">
                <item.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-xs font-medium mt-0.5">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Supply chain */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                Supply Chain Status — Turkana
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {SUPPLY_STATUS.map((item) => (
                <div key={item.item}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{item.item}</span>
                    <span className={`font-bold ${item.status === "critical" ? "text-red-600" : "text-green-600"}`}>{item.stock}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.status === "critical" ? "bg-red-500" : "bg-green-500"}`} style={{ width: `${item.stock}%` }} />
                  </div>
                  {item.status === "critical" && <p className="text-[10px] text-red-600 mt-0.5">Below threshold — reorder required</p>}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* CHW observations */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Recent CHW Observations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {CHW_OBSERVATIONS.slice(0, 4).map((obs) => (
                <div key={obs.id} className={`p-2.5 rounded-lg border-l-4 ${obs.severity === "critical" ? "border-l-red-500 bg-red-50" : obs.severity === "high" ? "border-l-orange-500 bg-orange-50" : "border-l-yellow-500 bg-yellow-50"}`}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold">{obs.chwName}</span>
                    <span className="text-[10px] text-muted-foreground">{obs.subCounty}</span>
                    {obs.validated && <Badge className="text-[10px] px-1 bg-green-100 text-green-700 border-green-200">Validated</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{obs.description}</p>
                </div>
              ))}
              <Link href="/community-intelligence">
                <Button variant="outline" size="sm" className="w-full mt-1">View All Observations</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
