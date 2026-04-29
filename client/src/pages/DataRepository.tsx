// DataRepository.tsx — AIfluence Climate-Health Intelligence Platform
// Open data repository with real DOIs, CC BY 4.0 licenses, DPG-aligned

import { useState } from "react";
import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Download, ExternalLink, Search, CheckCircle2, Globe, FileText } from "lucide-react";
import { DATASETS } from "@/lib/data";

const TYPE_COLORS: Record<string, string> = {
  health: "bg-blue-100 text-blue-700 border-blue-200",
  climate: "bg-green-100 text-green-700 border-green-200",
  environmental: "bg-teal-100 text-teal-700 border-teal-200",
  derived: "bg-purple-100 text-purple-700 border-purple-200",
};

export default function DataRepository() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = DATASETS.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.source.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || d.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const totalDownloads = DATASETS.reduce((s, d) => s + d.downloads, 0);

  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Open Data Repository</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              {DATASETS.length} datasets · Real DOIs · CC BY 4.0 · Digital Public Goods aligned
            </p>
          </div>
          <Badge className="bg-green-100 text-green-700 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            DPG Standard Compliant
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Datasets", value: DATASETS.length.toString(), sub: "Publicly accessible" },
            { label: "Total Downloads", value: totalDownloads.toLocaleString(), sub: "Across all datasets" },
            { label: "Countries Covered", value: "5", sub: "Eastern & Southern Africa" },
            { label: "License", value: "CC BY 4.0", sub: "Free to use & adapt" },
          ].map((item, i) => (
            <Card key={i} className="text-center stat-card">
              <CardContent className="pt-4 pb-4">
                <p className="text-2xl font-bold text-primary">{item.value}</p>
                <p className="text-sm font-semibold mt-0.5">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and filter */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search datasets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="climate">Climate</SelectItem>
              <SelectItem value="environmental">Environmental</SelectItem>
              <SelectItem value="derived">Derived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Dataset cards */}
        <div className="space-y-4">
          {filtered.map((dataset) => (
            <Card key={dataset.id} className="stat-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <Badge className={`text-xs ${TYPE_COLORS[dataset.type] || "bg-muted text-muted-foreground"}`}>
                        {dataset.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{dataset.format}</Badge>
                      <Badge variant="outline" className="text-xs">{dataset.license}</Badge>
                      <span className="text-xs text-muted-foreground">{dataset.source}</span>
                    </div>
                    <CardTitle className="text-base leading-snug">{dataset.title}</CardTitle>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-lg font-bold text-primary">{dataset.downloads.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">downloads</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{dataset.description}</p>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Globe className="h-3 w-3" />
                    {dataset.countries.join(", ")}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FileText className="h-3 w-3" />
                    {(dataset.sizeKb / 1024).toFixed(1)} MB
                  </div>
                  <div className="text-xs text-muted-foreground">Published: {dataset.published}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="gap-1.5 text-xs" asChild>
                    <a href={`https://doi.org/${dataset.doi}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-3 w-3" />
                      DOI: {dataset.doi}
                    </a>
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                    <Download className="h-3 w-3" />
                    Download
                  </Button>
                  <Button size="sm" variant="ghost" className="gap-1.5 text-xs">
                    API Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* DPG compliance note */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-800 mb-1">Digital Public Goods Alignment</p>
                <p className="text-xs text-green-700 leading-relaxed">
                  All datasets in this repository are published under open licenses (CC BY 4.0 or MIT), include persistent identifiers (DOIs), and are freely accessible without registration. This repository is designed to meet the Digital Public Goods Alliance standard for open data, ensuring that health systems, researchers, and policymakers across Africa can freely access, use, and adapt this data.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
