# AIfluence Climate-Health Intelligence Platform

**AI-powered early warning system for climate-sensitive disease outbreaks in East and Southern Africa.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Data License: CC BY 4.0](https://img.shields.io/badge/Data-CC%20BY%204.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)
[![Digital Public Good](https://img.shields.io/badge/Digital%20Public%20Good-Aligned-teal.svg)](https://digitalpublicgoods.net/)

---

## Overview

AIfluence processes WHO Global Health Observatory and World Bank climate data for 5 countries in East and Southern Africa (Kenya, Tanzania, Uganda, Rwanda, Mozambique), generating national-level disease forecasts for 18 climate-sensitive diseases.

**Operational pilot:** Turkana County, Kenya — 2,250 Community Health Workers monitoring 99,453 households (417,706 people, including 83,541 children under 5).

**Live platform:** https://climhealth-5ntjfbib.manus.space

---

## Key Features

- **Predictive Early Warning:** Machine learning models generate disease outbreak predictions 7–30 days in advance with 87.8% accuracy on retrospective backtesting (Kenya MoH 2019–2024 data)
- **18 Climate-Sensitive Diseases:** Malaria, cholera, dengue, Rift Valley Fever, malnutrition, and 13 others
- **Community Intelligence Module:** CHW field observations validated against meteorological data
- **Role-Based Dashboards:** Policymaker, district health manager, and primary healthcare worker interfaces
- **Open Data Repository:** 7 datasets with real DOIs, CC BY 4.0 licensed
- **Offline-Capable:** Designed for 2G/3G environments; CHW mobile interface works fully offline
- **5-Country Coverage:** National-level data platform active; community-level pilot in Kenya

---

## Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS 4, shadcn/ui, Recharts
- **Maps:** Google Maps JavaScript API
- **AI/ML:** Random Forest Regressor, Gradient Boosting (ensemble), 23 input features
- **Data Sources:** WHO GHO, World Bank Climate Portal, NASA POWER, OpenWeatherMap, Kenya DHIS2
- **Build:** Vite 7, pnpm

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/aseka33/aifluence-climhealth-platform.git
cd aifluence-climhealth-platform

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The platform runs on `http://localhost:3000`.

---

## Data Sources & Methodology

All climate-disease correlations are grounded in peer-reviewed literature. Key sources:

- Kenya Malaria Indicator Survey 2023 (KNBS/ICF)
- WHO Global Health Observatory disease surveillance data
- World Bank Climate Change Knowledge Portal
- Kenya National Bureau of Statistics 2019 Census
- Kenya Master Health Facility List (KMHFL)

**Methodology note:** Monthly case trend figures are modelled estimates based on Kenya MoH annual totals and seasonal distribution patterns. Forecast accuracy (87.8%) is based on retrospective backtesting against Kenya MoH 2019–2024 data, not a prospectively validated clinical study.

---

## License

- **Code:** MIT License — see [LICENSE](LICENSE)
- **Data:** Creative Commons Attribution 4.0 International (CC BY 4.0)
- **Platform:** Aligned with Digital Public Goods Alliance standards

---

## Contributing

This platform is designed to be freely adopted, adapted, and deployed by any national health system. Contributions, localizations, and integrations are welcome. Please open an issue or pull request.

---

## Contact

**Nelson Aseka** — Co-Founder & CEO, AIfluence  
**Ankit Jindal** — Co-Founder & CTO, AIfluence  
Nairobi, Kenya
