// Policy.tsx — AIfluence Climate-Health Intelligence Platform
// Evidence-based policy briefs auto-generated from surveillance data

import { useState } from "react";
import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, Globe } from "lucide-react";
import { POLICY_BRIEFS, COUNTRIES } from "@/lib/data";

export default function Policy() {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [countryFilter, setCountryFilter] = useState("all");

  const filtered = POLICY_BRIEFS.filter((b) => countryFilter === "all" || b.country === countryFilter);

  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Policy Intelligence</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Evidence-based policy briefs · Auto-generated from surveillance data · 5 countries
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant={countryFilter === "all" ? "default" : "outline"}
              onClick={() => setCountryFilter("all")}
            >
              All
            </Button>
            {COUNTRIES.map((c) => (
              <Button
                key={c.id}
                size="sm"
                variant={countryFilter === c.name ? "default" : "outline"}
                onClick={() => setCountryFilter(c.name)}
              >
                {c.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Published Briefs", value: POLICY_BRIEFS.length.toString(), sub: "Across 5 countries" },
            { label: "Diseases Covered", value: "5", sub: "Climate-sensitive conditions" },
            { label: "Recommendations", value: `${POLICY_BRIEFS.reduce((s, b) => s + b.recommendations.length, 0)}`, sub: "Actionable policy items" },
          ].map((item, i) => (
            <Card key={i} className="text-center">
              <CardContent className="pt-4 pb-4">
                <p className="text-2xl font-bold text-primary">{item.value}</p>
                <p className="text-sm font-semibold mt-0.5">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.map((brief) => (
          <Card key={brief.id} className="overflow-hidden">
            <CardHeader className="pb-3 cursor-pointer" onClick={() => setExpandedId(expandedId === brief.id ? null : brief.id)}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <Badge variant="outline" className="text-xs">
                      <Globe className="h-2.5 w-2.5 mr-1" />
                      {brief.country}
                    </Badge>
                    <Badge variant="outline" className="text-xs">{brief.disease}</Badge>
                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Published</Badge>
                    <span className="text-xs text-muted-foreground">{brief.date} · {brief.pages} pages</span>
                  </div>
                  <CardTitle className="text-base leading-snug">{brief.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs" onClick={(e) => e.stopPropagation()}>
                    <Download className="h-3 w-3" />
                    PDF
                  </Button>
                  {expandedId === brief.id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardHeader>

            {expandedId === brief.id && (
              <CardContent className="pt-0 border-t">
                <div className="grid lg:grid-cols-2 gap-6 pt-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Summary
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{brief.summary}</p>

                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      Key Findings
                    </h4>
                    <ul className="space-y-1.5">
                      {brief.keyFindings.map((finding, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-orange-500 font-bold mt-0.5 flex-shrink-0">→</span>
                          <span className="text-muted-foreground">{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Policy Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {brief.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-green-50 border border-green-100">
                          <span className="text-green-600 font-bold text-sm flex-shrink-0">{i + 1}.</span>
                          <span className="text-sm text-green-800">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}

        {/* Methodology note */}
        <Card className="bg-primary/5 border-primary/20 mt-6">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-primary mb-1">Policy Brief Generation Methodology</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Policy briefs are auto-generated from AIfluence's surveillance and forecasting data using a structured evidence synthesis framework. Each brief is reviewed by a public health specialist before publication. Data sources include WHO Global Health Observatory, World Bank Climate Change Knowledge Portal, national DHIS2 systems, and AIfluence's own climate-health correlation analysis. All briefs are published under CC BY 4.0 and can be freely adapted.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
