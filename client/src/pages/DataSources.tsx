// DataSources.tsx — AIfluence Climate-Health Intelligence Platform

import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, RefreshCw, Clock, Database } from "lucide-react";

const DATA_SOURCES = [
  {
    category: "Climate & Weather",
    color: "bg-green-50 border-green-200",
    badgeColor: "bg-green-100 text-green-700 border-green-200",
    sources: [
      { name: "CHIRPS v2.0", provider: "UCSB Climate Hazards Group", type: "Rainfall", frequency: "Daily", latency: "3 days", coverage: "Global 0.05°", status: "live" },
      { name: "ERA5 Reanalysis", provider: "ECMWF / Copernicus", type: "Temperature, Humidity, Wind", frequency: "Hourly", latency: "5 days", coverage: "Global 0.25°", status: "live" },
      { name: "MODIS Land Surface Temp", provider: "NASA EOSDIS", type: "Land Surface Temperature", frequency: "8-day", latency: "10 days", coverage: "Global 1km", status: "live" },
      { name: "OpenWeatherMap", provider: "OpenWeather Ltd", type: "Real-time weather", frequency: "Hourly", latency: "Real-time", coverage: "Station-based", status: "live" },
    ],
  },
  {
    category: "Disease Surveillance",
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    sources: [
      { name: "DHIS2 National Systems", provider: "Kenya, Tanzania, Uganda, Rwanda, Mozambique MoH", type: "Case counts, deaths, facility reports", frequency: "Weekly", latency: "7 days", coverage: "National", status: "live" },
      { name: "WHO Global Health Observatory", provider: "World Health Organization", type: "Annual disease burden estimates", frequency: "Annual", latency: "6 months", coverage: "Global", status: "live" },
      { name: "Kenya KHIS", provider: "Kenya Ministry of Health", type: "County-level malaria data", frequency: "Monthly", latency: "30 days", coverage: "47 counties", status: "live" },
      { name: "ProMED-mail", provider: "ISID", type: "Outbreak reports", frequency: "Real-time", latency: "Hours", coverage: "Global", status: "live" },
    ],
  },
  {
    category: "Environmental & Ecological",
    color: "bg-teal-50 border-teal-200",
    badgeColor: "bg-teal-100 text-teal-700 border-teal-200",
    sources: [
      { name: "MODIS NDVI", provider: "NASA EOSDIS", type: "Vegetation index (mosquito habitat proxy)", frequency: "16-day", latency: "10 days", coverage: "Global 250m", status: "live" },
      { name: "JRC Global Surface Water", provider: "European Commission JRC", type: "Water body extent (vector breeding sites)", frequency: "Monthly", latency: "30 days", coverage: "Global 30m", status: "live" },
      { name: "SRTM Digital Elevation", provider: "NASA / USGS", type: "Elevation (drainage patterns)", frequency: "Static", latency: "N/A", coverage: "Global 90m", status: "live" },
    ],
  },
  {
    category: "Community Intelligence",
    color: "bg-orange-50 border-orange-200",
    badgeColor: "bg-orange-100 text-orange-700 border-orange-200",
    sources: [
      { name: "CHW Mobile Observations", provider: "AIfluence CHW Network", type: "Field observations, mosquito density, water pooling", frequency: "Real-time", latency: "Minutes", coverage: "2,250 CHWs", status: "live" },
      { name: "Africa's Talking SMS", provider: "Africa's Talking Ltd", type: "SMS-based CHW reports (no-smartphone fallback)", frequency: "Real-time", latency: "Minutes", coverage: "Kenya, Tanzania, Uganda", status: "live" },
    ],
  },
];

export default function DataSources() {
  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div>
          <h1 className="text-2xl font-bold">Data Sources</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            All data sources, update frequencies, and integration status
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Sources", value: DATA_SOURCES.reduce((s, c) => s + c.sources.length, 0).toString(), icon: Database },
            { label: "Live Integrations", value: DATA_SOURCES.reduce((s, c) => s + c.sources.filter((src) => src.status === "live").length, 0).toString(), icon: CheckCircle2 },
            { label: "Update Frequency", value: "Hourly", icon: RefreshCw },
            { label: "Avg Data Latency", value: "< 24hrs", icon: Clock },
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

        {DATA_SOURCES.map((category) => (
          <Card key={category.category} className={`border ${category.color}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      {["Source", "Provider", "Type", "Frequency", "Latency", "Coverage", "Status"].map((h) => (
                        <th key={h} className="text-left py-2 pr-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {category.sources.map((src) => (
                      <tr key={src.name} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="py-2.5 pr-3 font-semibold text-xs">{src.name}</td>
                        <td className="py-2.5 pr-3 text-xs text-muted-foreground">{src.provider}</td>
                        <td className="py-2.5 pr-3 text-xs">{src.type}</td>
                        <td className="py-2.5 pr-3 text-xs">{src.frequency}</td>
                        <td className="py-2.5 pr-3 text-xs">{src.latency}</td>
                        <td className="py-2.5 pr-3 text-xs">{src.coverage}</td>
                        <td className="py-2.5">
                          <Badge className={`text-[10px] px-1.5 ${category.badgeColor}`}>
                            <CheckCircle2 className="h-2.5 w-2.5 mr-1" />
                            {src.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}
