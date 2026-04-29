// CommunityIntelligence.tsx — AIfluence Climate-Health Intelligence Platform
// CHW observation network: ground-truth validation of AI predictions

import { useState } from "react";
import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Clock, Users, Activity, MapPin, MessageSquare, Smartphone } from "lucide-react";
import { CHW_OBSERVATIONS, IMPACT_METRICS } from "@/lib/data";

const OBSERVATION_TYPE_LABELS: Record<string, string> = {
  mosquito_density: "Mosquito Density",
  water_pooling: "Water Pooling",
  community_concern: "Community Report",
  unusual_weather: "Unusual Weather",
};

export default function CommunityIntelligence() {
  const [filter, setFilter] = useState("all");

  const filtered = CHW_OBSERVATIONS.filter((o) => filter === "all" || o.severity === filter);
  const validated = CHW_OBSERVATIONS.filter((o) => o.validated).length;

  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div>
          <h1 className="text-2xl font-bold">Community Intelligence</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            CHW observation network · Ground-truth validation of AI predictions · 2,250 frontline workers
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active CHWs", value: "2,250", sub: "Across 5 countries", icon: Users, color: "text-primary", bg: "bg-primary/10" },
            { label: "Households Covered", value: "99,453", sub: "Under active surveillance", icon: MapPin, color: "text-green-500", bg: "bg-green-50" },
            { label: "Observations (30d)", value: "847", sub: `${validated} validated`, icon: MessageSquare, color: "text-orange-500", bg: "bg-orange-50" },
            { label: "AI-CHW Agreement", value: "91%", sub: "Prediction alignment", icon: CheckCircle2, color: "text-teal-500", bg: "bg-teal-50" },
          ].map((item, i) => (
            <Card key={i} className="stat-card">
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

        <Tabs defaultValue="observations">
          <TabsList>
            <TabsTrigger value="observations">Field Observations</TabsTrigger>
            <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Interface</TabsTrigger>
          </TabsList>

          <TabsContent value="observations" className="mt-4">
            <div className="flex gap-2 mb-4">
              {["all", "critical", "high", "medium"].map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={filter === f ? "default" : "outline"}
                  onClick={() => setFilter(f)}
                  className="capitalize"
                >
                  {f === "all" ? "All" : f}
                </Button>
              ))}
            </div>
            <div className="space-y-3">
              {filtered.map((obs) => (
                <Card key={obs.id} className={`border-l-4 ${obs.severity === "critical" ? "border-l-red-500" : obs.severity === "high" ? "border-l-orange-500" : "border-l-yellow-500"}`}>
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{obs.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-sm font-semibold">{obs.chwName}</span>
                          <Badge variant="outline" className="text-xs">{obs.subCounty}</Badge>
                          <Badge className={`text-[10px] px-1.5 ${
                            obs.severity === "critical" ? "bg-red-100 text-red-700 border-red-200" :
                            obs.severity === "high" ? "bg-orange-100 text-orange-700 border-orange-200" :
                            "bg-yellow-100 text-yellow-700 border-yellow-200"
                          }`}>
                            {obs.severity}
                          </Badge>
                          <Badge variant="outline" className="text-xs">{OBSERVATION_TYPE_LABELS[obs.type] || obs.type}</Badge>
                          {obs.validated ? (
                            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                              <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                              AI-validated
                            </Badge>
                          ) : (
                            <Badge className="bg-muted text-muted-foreground text-xs">
                              <Clock className="h-2.5 w-2.5 mr-1" />
                              Pending validation
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{obs.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{obs.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="how-it-works" className="mt-4">
            <div className="grid lg:grid-cols-2 gap-5">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">The Community Intelligence Loop</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { step: "1", title: "CHW Observation", desc: "Community health workers submit field observations via the mobile interface — mosquito density, water pooling, unusual weather, or community concerns.", icon: "📱" },
                    { step: "2", title: "AI Cross-Validation", desc: "The AIfluence model compares CHW observations against satellite climate data and disease surveillance feeds. Observations that align with AI predictions are flagged as validated.", icon: "🤖" },
                    { step: "3", title: "Alert Escalation", desc: "Validated observations that exceed risk thresholds trigger alerts to district health officers and national surveillance teams within 24 hours.", icon: "🚨" },
                    { step: "4", title: "Model Feedback", desc: "CHW observations are used as ground-truth data to continuously retrain and improve the AI model, improving accuracy over time.", icon: "🔄" },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.icon} {item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Indigenous Knowledge Integration</CardTitle>
                  <CardDescription className="text-xs">Validating traditional ecological knowledge against satellite data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The Community Intelligence Module is designed to capture and validate traditional ecological knowledge held by community health workers and community elders. When a CHW reports that "this rainfall pattern is similar to the 2019 outbreak season," the AI model cross-references this against historical climate-disease data to assess the validity of the observation.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This bidirectional validation — AI informing CHWs and CHWs informing AI — is a core differentiator of the AIfluence platform and a key factor in its 87.8% prediction accuracy.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {[
                      { label: "CHW Observations Validated by AI", value: "91%" },
                      { label: "AI Predictions Confirmed by CHWs", value: "88%" },
                      { label: "Avg Time to Validate", value: "4.2 hrs" },
                      { label: "False Positives Caught by CHWs", value: "23" },
                    ].map((item, i) => (
                      <div key={i} className="bg-muted/40 rounded-lg p-3 text-center">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-lg font-bold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mobile" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">CHW Mobile Interface</CardTitle>
                <CardDescription className="text-xs">Optimised for low-bandwidth environments · Offline-capable · SMS fallback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-5">
                  {[
                    { icon: Smartphone, title: "Offline-First Design", desc: "The CHW interface works fully offline and syncs when connectivity is available. Designed for 2G/3G networks in remote areas.", color: "text-primary", bg: "bg-primary/10" },
                    { icon: MessageSquare, title: "SMS Fallback", desc: "CHWs without smartphones can submit observations via SMS using Africa's Talking API. All data is automatically parsed and integrated.", color: "text-green-500", bg: "bg-green-50" },
                    { icon: Activity, title: "Real-Time Alerts", desc: "CHWs receive push notifications and SMS alerts when the AI model detects elevated risk in their catchment area.", color: "text-orange-500", bg: "bg-orange-50" },
                  ].map((item, i) => (
                    <div key={i} className="p-4 rounded-lg border">
                      <div className={`h-10 w-10 rounded-lg ${item.bg} flex items-center justify-center mb-3`}>
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <p className="text-sm font-semibold mb-1">{item.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold text-primary mb-2">Access the CHW Field Interface</p>
                  <p className="text-xs text-muted-foreground mb-3">The full CHW mobile interface is available as a separate optimised view designed for field use.</p>
                  <Button size="sm" className="gap-2" onClick={() => window.location.href = "/mobile-chw"}>
                    <Smartphone className="h-3.5 w-3.5" />
                    Open CHW Interface
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
