// PHCWorkerDashboard.tsx — AIfluence Climate-Health Intelligence Platform
// Role-specific view for Primary Health Care workers at facility level

import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stethoscope, AlertTriangle, CheckCircle2, Package, Users, Thermometer } from "lucide-react";
import { ACTIVE_ALERTS, HEALTH_FACILITIES } from "@/lib/data";
import { Link } from "wouter";

const TODAYS_CASES = [
  { condition: "Malaria (confirmed RDT+)", count: 14, change: "+3 vs yesterday" },
  { condition: "Malaria (clinical)", count: 8, change: "+1 vs yesterday" },
  { condition: "Diarrhoeal disease", count: 6, change: "-2 vs yesterday" },
  { condition: "Respiratory infection", count: 11, change: "Same" },
  { condition: "Malnutrition (SAM)", count: 2, change: "+2 vs yesterday" },
];

const PROTOCOLS = [
  { title: "Malaria Case Management Protocol", updated: "Jan 2026", type: "Clinical" },
  { title: "Cholera Treatment Protocol", updated: "Mar 2026", type: "Clinical" },
  { title: "SAM Management — CMAM Protocol", updated: "Nov 2025", type: "Nutrition" },
  { title: "RVF Outbreak Response SOP", updated: "Oct 2025", type: "Emergency" },
];

export default function PHCWorkerDashboard() {
  const facility = HEALTH_FACILITIES[0];

  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-teal-100 text-teal-700 border-teal-200 text-xs">PHC Worker View</Badge>
          </div>
          <h1 className="text-2xl font-bold">{facility.name}</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{facility.subCounty} · {facility.type} · Readiness: {facility.readinessScore}/100</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Active alerts for this facility */}
        {ACTIVE_ALERTS.filter((a) => a.severity === "critical" || a.severity === "high").slice(0, 2).map((alert) => (
          <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${alert.severity === "critical" ? "border-l-red-500 bg-red-50" : "border-l-orange-500 bg-orange-50"}`}>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-bold">{alert.title}</span>
              <Badge className={`text-xs ml-auto ${alert.severity === "critical" ? "bg-red-200 text-red-800" : "bg-orange-200 text-orange-800"}`}>{alert.severity}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{alert.description}</p>
          </div>
        ))}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Today's cases */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-primary" />
                Today's Case Register
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {TODAYS_CASES.map((c, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm">{c.condition}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{c.change}</span>
                      <span className="text-lg font-bold text-primary">{c.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Facility status */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  Facility Readiness
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "RDTs Available", status: facility.hasRdt },
                  { label: "ACTs Available", status: facility.hasAct },
                  { label: "Operational", status: facility.isOperational },
                  { label: "Beds Available", status: true, value: `${facility.beds} beds` },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span>{item.label}</span>
                    {item.value ? (
                      <span className="text-xs font-semibold text-primary">{item.value}</span>
                    ) : (
                      item.status
                        ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                        : <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Clinical Protocols</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {PROTOCOLS.map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b last:border-0">
                    <div>
                      <p className="text-xs font-medium">{p.title}</p>
                      <p className="text-[10px] text-muted-foreground">Updated {p.updated}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{p.type}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/mobile-chw">
            <Button className="gap-2">
              <Users className="h-4 w-4" />
              Submit Field Observation
            </Button>
          </Link>
          <Link href="/alerts">
            <Button variant="outline" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              View All Alerts
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
