// About.tsx — AIfluence Climate-Health Intelligence Platform

import { PageLayout } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Code2, Shield, Zap, Users, Award } from "lucide-react";

const TEAM = [
  {
    name: "Nelson Aseka",
    title: "Co-Founder & CEO",
    born: 1976,
    bio: "Behavioral change strategist and innovation leader with over a decade driving inclusive, data-driven engagement strategies across Africa and Asia. Background in Information Technology and Economics. Has overseen SBC campaigns in 25+ countries with partners including USAID, Jhpiego, UNIDO, Sightsavers, and PATH. Pioneer of trust network models for digitally underserved populations.",
  },
  {
    name: "Ankit Jindal",
    title: "Co-Founder & CTO",
    born: 1982,
    bio: "Technology leader with 15+ years building scalable AI-driven platforms across Consumer Tech, MarTech, and Enterprise systems. Led development of AIfluence's proprietary behavioral intelligence engine. Prior to co-founding AIfluence, successfully built and exited two tech startups and held senior engineering roles in multinational tech companies. Deep expertise in low-bandwidth and offline-capable AI systems.",
  },
];

const PRINCIPLES = [
  { icon: Globe, title: "Open Source First", desc: "All platform code published under MIT license. Data under CC BY 4.0. Aligned with the Digital Public Goods Alliance standard.", color: "text-green-500", bg: "bg-green-50" },
  { icon: Shield, title: "Privacy by Design", desc: "No personally identifiable information collected from CHWs or community members. All data is aggregated at sub-county level before storage.", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Zap, title: "Offline-Capable", desc: "Designed for 2G/3G environments. The CHW mobile interface works fully offline and syncs when connectivity is available.", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Code2, title: "AI Transparency", desc: "All model weights, training data, and performance metrics are published openly. No black-box predictions.", color: "text-purple-500", bg: "bg-purple-50" },
  { icon: Users, title: "Community-Validated", desc: "AI predictions are cross-validated against CHW field observations. Community knowledge is treated as a first-class data source.", color: "text-teal-500", bg: "bg-teal-50" },
  { icon: Award, title: "Evidence-Based", desc: "All climate-disease correlations are grounded in peer-reviewed literature. References available in the Data Repository.", color: "text-red-500", bg: "bg-red-50" },
];

export default function About() {
  return (
    <PageLayout>
      <div className="border-b bg-card px-6 py-5">
        <div>
          <h1 className="text-2xl font-bold">About AIfluence</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Climate-Health Intelligence Platform · Nairobi, Kenya · Founded 2022
          </p>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Mission */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6 pb-6">
            <h2 className="text-lg font-bold text-primary mb-3">Our Mission</h2>
            <p className="text-sm leading-relaxed text-foreground">
              AIfluence exists to close the gap between climate data and community health action in sub-Saharan Africa. We build AI-powered early warning systems that give community health workers, district health officers, and national policymakers the intelligence they need to prevent climate-sensitive disease outbreaks before they happen — not after.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground mt-3">
              AIfluence processes WHO and World Bank climate-health data for 5 countries in East and Southern Africa, generating national-level disease forecasts for Kenya, Tanzania, Uganda, Rwanda, and Mozambique. Our operational pilot in Turkana County, Kenya, runs an active community surveillance network of 2,250 CHWs monitoring 99,453 households. The Turkana pilot has issued 64 outbreak alerts with an 87.8% prediction accuracy on 7-day malaria forecasts. The 4-country data platform is ready for community-level deployment as funding and partnerships are secured.
            </p>
          </CardContent>
        </Card>

        {/* Principles */}
        <div>
          <h2 className="text-lg font-bold mb-4">Design Principles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRINCIPLES.map((p, i) => (
              <Card key={i} className="stat-card">
                <CardContent className="pt-4 pb-4">
                  <div className={`h-10 w-10 rounded-lg ${p.bg} flex items-center justify-center mb-3`}>
                    <p.icon className={`h-5 w-5 ${p.color}`} />
                  </div>
                  <p className="text-sm font-semibold mb-1">{p.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-lg font-bold mb-4">Leadership Team</h2>
          <div className="grid lg:grid-cols-2 gap-5">
            {TEAM.map((member, i) => (
              <Card key={i} className="stat-card">
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-start gap-4">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-primary">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-base font-bold">{member.name}</p>
                      <p className="text-sm text-primary font-medium mb-2">{member.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { category: "AI / ML", items: ["Python 3.11", "scikit-learn", "XGBoost", "TensorFlow Lite"] },
                { category: "Climate Data", items: ["CHIRPS Rainfall", "ERA5 Reanalysis", "MODIS NDVI", "OpenWeatherMap"] },
                { category: "Health Data", items: ["DHIS2 API", "WHO GHO", "Kenya KHIS", "OpenMRS"] },
                { category: "Infrastructure", items: ["React 19", "FastAPI", "PostgreSQL", "Africa's Talking SMS"] },
              ].map((group, i) => (
                <div key={i}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">{group.category}</p>
                  <div className="space-y-1">
                    {group.items.map((item) => (
                      <Badge key={item} variant="outline" className="text-xs mr-1 mb-1">{item}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
