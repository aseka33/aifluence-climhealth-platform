// Maps.tsx — AIfluence Climate-Health Intelligence Platform
// Interactive risk maps with Google Maps and county-level overlays

import { useState, useCallback } from "react";
import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapView } from "@/components/Map";
import { KENYA_COUNTIES, HEALTH_FACILITIES, ACTIVE_ALERTS } from "@/lib/data";

const RISK_COLORS: Record<string, string> = {
  very_high: "#dc2626",
  high: "#ea580c",
  moderate: "#ca8a04",
  low: "#16a34a",
};

export default function Maps() {
  const [mapLayer, setMapLayer] = useState("risk");
  const [selectedCounty, setSelectedCounty] = useState<typeof KENYA_COUNTIES[0] | null>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  const handleMapReady = useCallback((map: google.maps.Map) => {
    setMapInstance(map);

    // Center on Kenya
    map.setCenter({ lat: 0.5, lng: 37.5 });
    map.setZoom(6);

    const newMarkers: google.maps.Marker[] = [];

    if (mapLayer === "risk" || mapLayer === "all") {
      KENYA_COUNTIES.forEach((county) => {
        const marker = new google.maps.Marker({
          position: { lat: county.lat, lng: county.lng },
          map,
          title: county.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: Math.max(8, Math.min(20, county.cases / 12000)),
            fillColor: RISK_COLORS[county.riskLevel] || "#6b7280",
            fillOpacity: 0.85,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="font-family: 'DM Sans', sans-serif; padding: 8px; min-width: 180px;">
              <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px;">${county.name} County</div>
              <div style="font-size: 12px; color: #6b7280; margin-bottom: 6px;">${county.zone}</div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 11px;">
                <div><span style="color: #9ca3af;">Cases:</span> <strong>${county.cases.toLocaleString()}</strong></div>
                <div><span style="color: #9ca3af;">Prevalence:</span> <strong>${county.prevalence}%</strong></div>
                <div><span style="color: #9ca3af;">Population:</span> <strong>${(county.population / 1000).toFixed(0)}k</strong></div>
                <div><span style="color: ${RISK_COLORS[county.riskLevel]};">Risk: <strong>${county.riskLevel.replace("_", " ").toUpperCase()}</strong></span></div>
              </div>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
          setSelectedCounty(county);
        });

        newMarkers.push(marker);
      });
    }

    if (mapLayer === "facilities" || mapLayer === "all") {
      HEALTH_FACILITIES.forEach((facility) => {
        const marker = new google.maps.Marker({
          position: { lat: facility.lat, lng: facility.lng },
          map,
          title: facility.name,
          icon: {
            path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
            scale: 5,
            fillColor: facility.isOperational ? "#0d6e6e" : "#9ca3af",
            fillOpacity: 0.9,
            strokeColor: "#ffffff",
            strokeWeight: 1.5,
          },
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="font-family: 'DM Sans', sans-serif; padding: 8px; min-width: 200px;">
              <div style="font-weight: 700; font-size: 13px; margin-bottom: 2px;">${facility.name}</div>
              <div style="font-size: 11px; color: #6b7280; margin-bottom: 6px;">${facility.type} · ${facility.subCounty}</div>
              <div style="font-size: 11px;">
                <div>Readiness: <strong>${facility.readinessScore}/100</strong></div>
                <div>RDT: ${facility.hasRdt ? "✅" : "❌"} · ACT: ${facility.hasAct ? "✅" : "❌"}</div>
                <div>Status: <strong style="color: ${facility.isOperational ? "#16a34a" : "#dc2626"}">${facility.isOperational ? "Operational" : "Non-operational"}</strong></div>
              </div>
            </div>
          `,
        });

        marker.addListener("click", () => infoWindow.open(map, marker));
        newMarkers.push(marker);
      });
    }

    if (mapLayer === "alerts" || mapLayer === "all") {
      ACTIVE_ALERTS.forEach((alert) => {
        const county = KENYA_COUNTIES.find((c) => c.name === alert.county);
        if (!county) return;
        const marker = new google.maps.Marker({
          position: { lat: county.lat, lng: county.lng },
          map,
          title: alert.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 14,
            fillColor: alert.severity === "critical" ? "#dc2626" : "#ea580c",
            fillOpacity: 0.9,
            strokeColor: "#ffffff",
            strokeWeight: 3,
          },
          label: { text: "!", color: "#ffffff", fontWeight: "bold", fontSize: "12px" },
          zIndex: 1000,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="font-family: 'DM Sans', sans-serif; padding: 8px; min-width: 220px;">
              <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px;">${alert.title}</div>
              <div style="font-size: 11px; color: #6b7280; margin-bottom: 6px;">${alert.disease} · ${alert.severity.toUpperCase()}</div>
              <div style="font-size: 11px;">
                <div>Confidence: <strong>${alert.confidence}%</strong></div>
                <div>Predicted cases: <strong>${alert.predictedCases.toLocaleString()}</strong></div>
                <div>Under-5 at risk: <strong style="color: #ea580c">${alert.under5Affected.toLocaleString()}</strong></div>
              </div>
            </div>
          `,
        });

        marker.addListener("click", () => infoWindow.open(map, marker));
        newMarkers.push(marker);
      });
    }

    setMarkers(newMarkers);
  }, [mapLayer]);

  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Risk Maps</h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Geospatial risk visualisation · County-level granularity · Kenya focus
            </p>
          </div>
          <Select value={mapLayer} onValueChange={setMapLayer}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="risk">Disease Risk Layer</SelectItem>
              <SelectItem value="facilities">Health Facilities</SelectItem>
              <SelectItem value="alerts">Active Alerts</SelectItem>
              <SelectItem value="all">All Layers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid lg:grid-cols-4 gap-5">
          {/* Map */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <div className="h-[520px]">
                <MapView onMapReady={handleMapReady} />
              </div>
            </Card>
          </div>

          {/* Legend + county detail */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Risk Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(RISK_COLORS).map(([level, color]) => (
                  <div key={level} className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: color }} />
                    <span className="text-xs capitalize">{level.replace("_", " ")}</span>
                  </div>
                ))}
                <div className="pt-2 border-t mt-2">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full bg-primary border-2 border-white shadow-sm" />
                    <span className="text-xs">Health facility</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-4 w-4 rounded-full bg-red-600 border-2 border-white shadow-sm flex items-center justify-center">
                      <span className="text-[8px] text-white font-bold">!</span>
                    </div>
                    <span className="text-xs">Active alert</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {selectedCounty ? (
              <Card className="border-primary/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{selectedCounty.name} County</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Zone</span>
                    <span className="font-medium">{selectedCounty.zone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cases (2024)</span>
                    <span className="font-medium">{selectedCounty.cases.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prevalence</span>
                    <span className="font-medium">{selectedCounty.prevalence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Population</span>
                    <span className="font-medium">{(selectedCounty.population / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Risk Level</span>
                    <Badge className={`text-[10px] px-1.5 ${
                      selectedCounty.riskLevel === "very_high" ? "bg-red-100 text-red-700 border-red-200" :
                      selectedCounty.riskLevel === "high" ? "bg-orange-100 text-orange-700 border-orange-200" :
                      "bg-yellow-100 text-yellow-700 border-yellow-200"
                    }`}>
                      {selectedCounty.riskLevel.replace("_", " ").toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-muted/30">
                <CardContent className="py-6 text-center">
                  <p className="text-xs text-muted-foreground">Click a county marker to see details</p>
                </CardContent>
              </Card>
            )}

            {/* Top 5 counties */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Highest Burden Counties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {KENYA_COUNTIES.sort((a, b) => b.cases - a.cases).slice(0, 5).map((c, i) => (
                  <div key={c.id} className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground w-4">{i + 1}.</span>
                    <span className="text-xs flex-1 font-medium">{c.name}</span>
                    <span className="text-xs text-muted-foreground">{(c.cases / 1000).toFixed(0)}k</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
