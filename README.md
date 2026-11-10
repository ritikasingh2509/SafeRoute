
# SafeRoute 🩷
### Not Just the Fastest Route. The Safer One.

SafeRoute is a women-focused, safety-aware navigation platform designed to help users make more informed travel decisions.

Traditional navigation apps primarily focus on distance and travel time. SafeRoute aims to bring safety-related insights into route planning by considering factors such as reported incidents, street lighting, public activity, route isolation, and community feedback.

## 🚀 Problem Statement

Choosing a route based only on distance or estimated travel time doesn't always provide enough information about the surrounding environment.

People need better access to safety-related information when planning their journeys, especially when travelling through unfamiliar areas.

## 💡 Our Solution

SafeRoute combines map-based navigation with safety-related insights to help users explore routes with additional safety context.

Users can:
- Enter a source and destination.
- View available routes on an interactive map.
- Explore route distance and estimated travel time.
- View area-level safety estimates.
- Submit community safety concerns.

## ✨ Key Features

- **Interactive Navigation:** Map integration using OpenStreetMap and Leaflet.
- **Route Generation:** Fetches routes using OSRM.
- **Safety Score:** Calculates an illustrative score using multiple risk factors.
- **Community Reporting:** Allows users to submit safety-related concerns.
- **Local Report Storage:** Saves submitted reports in the browser using localStorage.

## 📊 Safety Score Calculation

SafeRoute uses a weighted risk model:

**Safety Score = 100 − Weighted Risk**

| Risk Factor | Weight |
|---|---:|
| Historical Incident Risk | 30% |
| Street Lighting Risk | 20% |
| Public Activity Risk | 15% |
| Route Isolation Risk | 15% |
| Community Feedback Risk | 20% |

The risk values are currently based on a simulated dataset for prototype demonstration.

The current implementation provides area-level estimates, not verified route-segment safety scores.

## 🛠️ Tech Stack

- React.js
- Vite
- JavaScript
- CSS
- React Leaflet
- Leaflet
- OpenStreetMap
- OSRM Routing API
- Nominatim Geocoding API
- Browser localStorage

## ⚙️ Getting Started

### Prerequisites
- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/ritikasingh2509/SafeRoute.git
```

Navigate to the project directory:

```bash
cd SafeRoute
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## 🔮 Future Roadmap

- Integration of reliable, verified safety datasets.
- Route-segment-level safety analysis.
- Backend integration for shared community reports.
- Community report verification and moderation.
- Real-time lighting and public activity insights.
- Safety heatmaps and improved route comparisons.
- AI-assisted analysis of community reports.

## ⚠️ Disclaimer

SafeRoute is currently a hackathon prototype. Its safety scores use simulated demonstration data and should not be treated as verified crime statistics or guarantees of personal safety.

Community reports are stored locally in the browser and are not independently verified or shared with other users.

## 🌱 Our Vision

We envision a future where navigation is not just about reaching a destination faster, but also about making more informed and safety-conscious travel decisions.

**SafeRoute — Because every journey deserves better choices.**
