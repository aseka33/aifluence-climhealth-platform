// Alerts.tsx — AIfluence Climate-Health Intelligence Platform
// Early Warning Alerts: full detail view with severity, response tracking

import { useState } from "react";
import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Users, Clock, CheckCircle2, XCircle, MapPin, Activity, ArrowRight } from "lucide-react";
import { ACTIVE_ALERTS, COUNTRIES, DISEASES } from "@/lib/data";
import { Link } from "wouter";

const SEVERITY_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; icon: string }> = {
  critical: { label: "Critical", color: "text-red-700", bg: "bg-red-50", border: "border-red-200", icon: "🔴" },
  high: { label: "High", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", icon: "🟠" },
  medium: { label: "Medium", color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200", icon: "🟡" },
  low: { label: "Low", color: "text-green-700", bg: "bg-green-50", border: "border-green-200", icon: "🟢" },
};

export default function Alerts() {
  const [severityFilter, setSeverityFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");

  const filtered = ACTIVE_ALERTS.filter((a) => {
    if (severityFilter !== "all" && a.severity !== severityFilter) return false;
    if (countryFilter !== "all" && a.country !== countryFilter) return false;
    return true;
  });

  const countBySeverity = {
    critical: ACTIVE_ALERTS.filter((a) => a.severity === "critical").length,
    high: ACTIVE_ALERTS.filter((a) => a.severity === "high").length,
    medium: ACTIVE_ALERTS.filter((a) => a.severity === "medium").length,
    low: ACTIVE_ALERTS.filter((a) => a.severity === "low").length,
  };

  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Early Warning Alerts</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              AI-generated outbreak alerts · 7–30 day advance warning · Last updated: April 29, 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={countryFilter} onValueChange={setCountryFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="All countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="All severities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(countBySeverity).map(([severity, count]) => {
            const cfg = SEVERITY_CONFIG[severity];
            return (
              <Card
                key={severity}
                className={`stat-card cursor-pointer border ${cfg.border} ${severityFilter === severity ? cfg.bg : ""}`}
                onClick={() => setSeverityFilter(severityFilter === severity ? "all" : severity)}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{cfg.label}</p>
                      <p className={`text-3xl font-bold mt-1 ${cfg.color}`}>{count}</p>
                    </div>
                    <span className="text-2xl">{cfg.icon}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Alert cards */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle2 className="h-10 w-10 text-green-500 mx-auto mb-3" />
                <p className="text-muted-foreground">No alerts match the current filters.</p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((alert) => {
              const cfg = SEVERITY_CONFIG[alert.severity];
              return (
                <Card key={alert.id} className={`border-l-4 ${alert.severity === "critical" ? "border-l-red-500" : alert.severity === "high" ? "border-l-orange-500" : "border-l-yellow-500"}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Badge className={`${cfg.bg} ${cfg.color} border ${cfg.border} text-xs`}>
                            {cfg.icon} {cfg.label}
                          </Badge>
                          <Badge variant="outline" className="text-xs">{alert.disease}</Badge>
                          <Badge variant="outline" className="text-xs">
                            <MapPin className="h-2.5 w-2.5 mr-1" />
                            {alert.county}, {alert.country}
                          </Badge>
                          {alert.responseStartedAt ? (
                            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                              <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                              Response active
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
                              <XCircle className="h-2.5 w-2.5 mr-1" />
                              No response yet
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-base">{alert.title}</CardTitle>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold text-primary">{alert.confidence}%</div>
                        <div className="text-xs text-muted-foreground">confidence</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">{alert.description}</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                      <div className="bg-muted/40 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground">Predicted Cases</p>
                        <p className="text-lg font-bold">{alert.predictedCases.toLocaleString()}</p>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground">Affected Population</p>
                        <p className="text-lg font-bold">{alert.affectedPopulation.toLocaleString()}</p>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground">Under-5 at Risk</p>
                        <p className="text-lg font-bold text-orange-600">{alert.under5Affected.toLocaleString()}</p>
                      </div>
                      <div className="bg-muted/40 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground">Detected</p>
                        <p className="text-lg font-bold">{alert.detectedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link href="/forecasting">
                        <Button size="sm" className="gap-2">
                          <Activity className="h-3.5 w-3.5" />
                          View Forecast
                        </Button>
                      </Link>
                      <Link href="/interventions">
                        <Button size="sm" variant="outline" className="gap-2">
                          Plan Response
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Alert methodology note */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start gap-3">
              <Activity className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-primary mb-1">Alert Generation Methodology</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Alerts are generated by AIfluence's ensemble machine learning model, which combines CHIRPS satellite rainfall data, ERA5 temperature reanalysis, WHO disease surveillance feeds, and DHIS2 facility reports. Alerts are triggered when the predicted risk score exceeds county-specific thresholds validated against 10 years of historical outbreak data. All alerts are cross-validated against CHW field observations before escalation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
