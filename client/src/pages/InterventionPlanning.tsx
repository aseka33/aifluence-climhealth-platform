// InterventionPlanning.tsx — AIfluence Climate-Health Intelligence Platform

import { useState } from "react";
import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Clock, AlertTriangle, TrendingUp, Package, Users } from "lucide-react";
import { toast } from "sonner";
import { KENYA_COUNTIES } from "@/lib/data";

const INTERVENTIONS = [
  {
    id: 1,
    title: "Emergency ITN Distribution — Turkana County",
    type: "Vector Control",
    priority: "critical",
    county: "Turkana",
    targetHouseholds: 8400,
    estimatedCost: 126000,
    timeframe: "7 days",
    status: "recommended",
    rationale: "Risk score 89/100. 21-day cumulative rainfall 187mm (+68%). Predicted malaria cases: 4,200 in next 14 days.",
  },
  {
    id: 2,
    title: "IRS Campaign — Kisumu & Siaya",
    type: "Vector Control",
    priority: "high",
    county: "Kisumu",
    targetHouseholds: 12000,
    estimatedCost: 240000,
    timeframe: "14 days",
    status: "recommended",
    rationale: "Seasonal peak approaching. Historical data shows 40% case reduction with timely IRS.",
  },
  {
    id: 3,
    title: "ACT Stockpile Replenishment — Turkana Facilities",
    type: "Supply Chain",
    priority: "high",
    county: "Turkana",
    targetHouseholds: 0,
    estimatedCost: 45000,
    timeframe: "3 days",
    status: "recommended",
    rationale: "Current ACT stock at 23% capacity. Predicted surge will exhaust supplies within 8 days.",
  },
  {
    id: 4,
    title: "CHW Malaria Response Training — Turkana",
    type: "Capacity Building",
    priority: "medium",
    county: "Turkana",
    targetHouseholds: 0,
    estimatedCost: 12000,
    timeframe: "5 days",
    status: "planned",
    rationale: "CHW case management scores below threshold in 3 sub-counties.",
  },
  {
    id: 5,
    title: "Cholera WASH Intervention — Mombasa",
    type: "WASH",
    priority: "medium",
    county: "Mombasa",
    targetHouseholds: 3200,
    estimatedCost: 38000,
    timeframe: "10 days",
    status: "planned",
    rationale: "Cholera risk elevated post-flooding. 3 suspected cases reported by CHWs.",
  },
];

const PRIORITY_COLORS: Record<string, string> = {
  critical: "border-l-red-500",
  high: "border-l-orange-500",
  medium: "border-l-yellow-500",
};

const PRIORITY_BADGE: Record<string, string> = {
  critical: "bg-red-100 text-red-700 border-red-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
};

export default function InterventionPlanning() {
  const [filter, setFilter] = useState("all");

  const filtered = INTERVENTIONS.filter((i) => filter === "all" || i.priority === filter);

  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Intervention Planning</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              AI-recommended interventions · Prioritised by risk score · Cost estimates included
            </p>
          </div>
          <div className="flex gap-2">
            {["all", "critical", "high", "medium"].map((f) => (
              <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} className="capitalize">{f === "all" ? "All" : f}</Button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Estimated Cost", value: `$${(INTERVENTIONS.reduce((s, i) => s + i.estimatedCost, 0) / 1000).toFixed(0)}k`, icon: Package },
            { label: "Households Targeted", value: INTERVENTIONS.reduce((s, i) => s + i.targetHouseholds, 0).toLocaleString(), icon: Users },
            { label: "Critical Actions", value: INTERVENTIONS.filter((i) => i.priority === "critical").length.toString(), icon: AlertTriangle },
          ].map((item, i) => (
            <Card key={i} className="stat-card text-center">
              <CardContent className="pt-4 pb-4">
                <item.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interventions */}
        <div className="space-y-4">
          {filtered.map((intervention) => (
            <Card key={intervention.id} className={`stat-card border-l-4 ${PRIORITY_COLORS[intervention.priority]}`}>
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <Badge className={`text-xs ${PRIORITY_BADGE[intervention.priority]}`}>{intervention.priority}</Badge>
                      <Badge variant="outline" className="text-xs">{intervention.type}</Badge>
                      <Badge variant="outline" className="text-xs">{intervention.county}</Badge>
                      <Badge className={`text-xs ${intervention.status === "recommended" ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-muted text-muted-foreground"}`}>
                        {intervention.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-semibold mb-1">{intervention.title}</p>
                    <p className="text-xs text-muted-foreground mb-3">{intervention.rationale}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{intervention.timeframe}</span>
                      {intervention.targetHouseholds > 0 && <span className="flex items-center gap-1"><Users className="h-3 w-3" />{intervention.targetHouseholds.toLocaleString()} households</span>}
                      <span className="flex items-center gap-1"><Package className="h-3 w-3" />${intervention.estimatedCost.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <Button size="sm" className="text-xs gap-1.5" onClick={() => toast.success(`${intervention.title} approved and queued.`)}>
                      <CheckCircle2 className="h-3 w-3" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs" onClick={() => toast.info("Escalated to district health officer.")}>
                      Escalate
                    </Button>
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
