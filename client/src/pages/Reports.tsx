// Reports.tsx — AIfluence Climate-Health Intelligence Platform

import { useState } from "react";
import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Globe, Filter } from "lucide-react";
import { COUNTRIES } from "@/lib/data";

const REPORTS = [
  { id: 1, title: "Kenya Malaria Early Warning Bulletin — April 2026", type: "Bulletin", country: "Kenya", date: "Apr 29, 2026", pages: 8, format: "PDF", status: "published" },
  { id: 2, title: "East Africa Climate-Health Quarterly Review Q1 2026", type: "Quarterly Review", country: "Regional", date: "Apr 15, 2026", pages: 24, format: "PDF", status: "published" },
  { id: 3, title: "Tanzania Cholera Risk Assessment — March 2026", type: "Risk Assessment", country: "Tanzania", date: "Mar 31, 2026", pages: 12, format: "PDF", status: "published" },
  { id: 4, title: "Uganda Rift Valley Fever Surveillance Report — March 2026", type: "Surveillance Report", country: "Uganda", date: "Mar 25, 2026", pages: 10, format: "PDF", status: "published" },
  { id: 5, title: "AIfluence Platform Technical Documentation v2.1", type: "Technical Doc", country: "All", date: "Mar 10, 2026", pages: 48, format: "PDF", status: "published" },
  { id: 6, title: "Rwanda Malnutrition-Climate Correlation Study", type: "Research Brief", country: "Rwanda", date: "Feb 28, 2026", pages: 16, format: "PDF", status: "published" },
  { id: 7, title: "Mozambique Dengue Fever Seasonal Forecast 2026", type: "Forecast Report", country: "Mozambique", date: "Feb 14, 2026", pages: 9, format: "PDF", status: "published" },
  { id: 8, title: "CHW Network Performance Review — H2 2025", type: "Performance Review", country: "All", date: "Jan 31, 2026", pages: 20, format: "PDF", status: "published" },
  { id: 9, title: "AIfluence Model Validation Report — 2025", type: "Validation Report", country: "All", date: "Jan 15, 2026", pages: 32, format: "PDF", status: "published" },
  { id: 10, title: "Kenya County Malaria Burden Analysis 2024", type: "Analysis", country: "Kenya", date: "Dec 20, 2025", pages: 28, format: "PDF", status: "published" },
];

const TYPE_COLORS: Record<string, string> = {
  "Bulletin": "bg-blue-100 text-blue-700 border-blue-200",
  "Quarterly Review": "bg-purple-100 text-purple-700 border-purple-200",
  "Risk Assessment": "bg-red-100 text-red-700 border-red-200",
  "Surveillance Report": "bg-orange-100 text-orange-700 border-orange-200",
  "Technical Doc": "bg-gray-100 text-gray-700 border-gray-200",
  "Research Brief": "bg-teal-100 text-teal-700 border-teal-200",
  "Forecast Report": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Performance Review": "bg-green-100 text-green-700 border-green-200",
  "Validation Report": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Analysis": "bg-pink-100 text-pink-700 border-pink-200",
};

export default function Reports() {
  const [countryFilter, setCountryFilter] = useState("all");

  const filtered = REPORTS.filter((r) => countryFilter === "all" || r.country === countryFilter || r.country === "All");

  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Reports & Publications</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {REPORTS.length} reports · Bulletins, risk assessments, research briefs
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant={countryFilter === "all" ? "default" : "outline"} onClick={() => setCountryFilter("all")}>All</Button>
            {COUNTRIES.map((c) => (
              <Button key={c.id} size="sm" variant={countryFilter === c.name ? "default" : "outline"} onClick={() => setCountryFilter(c.name)}>{c.name}</Button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3">
        {filtered.map((report) => (
          <Card key={report.id} className="stat-card">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge className={`text-[10px] px-1.5 ${TYPE_COLORS[report.type] || "bg-muted text-muted-foreground"}`}>{report.type}</Badge>
                    <Badge variant="outline" className="text-xs">
                      <Globe className="h-2.5 w-2.5 mr-1" />
                      {report.country}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-2.5 w-2.5" />
                      {report.date}
                    </span>
                    <span className="text-xs text-muted-foreground">{report.pages} pages · {report.format}</span>
                  </div>
                  <p className="text-sm font-semibold">{report.title}</p>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs flex-shrink-0">
                  <Download className="h-3 w-3" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}
