// MobileCHW.tsx — AIfluence Climate-Health Intelligence Platform
// Optimised CHW field interface

import { useState } from "react";
import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Smartphone, MapPin, Send, CheckCircle2, AlertTriangle, Wifi, WifiOff } from "lucide-react";
import { toast } from "sonner";
import { ACTIVE_ALERTS } from "@/lib/data";

export default function MobileCHW() {
  const [isOnline] = useState(true);
  const [form, setForm] = useState({ type: "", severity: "", description: "", location: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type || !form.severity || !form.description) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Observation submitted. AI validation in progress.");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">CHW Field Interface</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Submit observations · View local alerts · Offline-capable
            </p>
          </div>
          <Badge className={isOnline ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}>
            {isOnline ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Submit observation */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Send className="h-4 w-4 text-primary" />
                Submit Field Observation
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-green-700">Observation submitted</p>
                  <p className="text-xs text-muted-foreground mt-1">AI validation in progress. You will receive an SMS if escalation is needed.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Observation Type *</label>
                    <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mosquito_density">High Mosquito Density</SelectItem>
                        <SelectItem value="water_pooling">Stagnant Water / Pooling</SelectItem>
                        <SelectItem value="community_concern">Community Health Concern</SelectItem>
                        <SelectItem value="unusual_weather">Unusual Weather Pattern</SelectItem>
                        <SelectItem value="case_cluster">Suspected Case Cluster</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Severity *</label>
                    <Select value={form.severity} onValueChange={(v) => setForm({ ...form, severity: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low — Routine monitoring</SelectItem>
                        <SelectItem value="medium">Medium — Increased vigilance</SelectItem>
                        <SelectItem value="high">High — Immediate action needed</SelectItem>
                        <SelectItem value="critical">Critical — Emergency response</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        placeholder="Sub-county / village..."
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        className="pl-8"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Description *</label>
                    <textarea
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      rows={4}
                      placeholder="Describe what you observed..."
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    Submit Observation
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Local alerts */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  Active Alerts in Your Area
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {ACTIVE_ALERTS.slice(0, 3).map((alert) => (
                  <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${alert.severity === "critical" ? "border-l-red-500 bg-red-50" : "border-l-orange-500 bg-orange-50"}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold">{alert.title}</span>
                      <Badge className={`text-[10px] px-1 ${alert.severity === "critical" ? "bg-red-200 text-red-800" : "bg-orange-200 text-orange-800"}`}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.county} · {alert.disease}</p>
                    <p className="text-xs text-muted-foreground">Confidence: {alert.confidence}% · Under-5 at risk: {alert.under5Affected.toLocaleString()}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-4 pb-4">
                <div className="flex items-start gap-3">
                  <Smartphone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">No Smartphone? Use SMS</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Send observations via SMS to <strong>+254 700 000 000</strong> in the format:<br />
                      <code className="bg-primary/10 px-1 rounded text-primary">OBS [TYPE] [SEVERITY] [LOCATION] [DESCRIPTION]</code>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
