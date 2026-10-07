# AEGIS – AI-Powered Multi-Sensor Surveillance & 3D Digital Twin
**A Virtual Defense Training Simulator** (frontend-only, academic project)

## Overview
AEGIS is a command-center style training dashboard for a **fictional** city and training zone. It tracks **simulated** objects (training drones, aircraft, projectiles, unknown objects), raises alerts when they enter virtual zones, and walks operators through a purely visual "Virtual Response Simulation".

## Features
Login · dark glassmorphism command dashboard · 2D surveillance map (boundaries, zones, sensors, trails, grid, north, scale) · animated radar · alert panel (acknowledge/view/dismiss) · searchable/sortable/filterable tracking table · sensor status · 6 Recharts analytics · training scenarios · Virtual Response Simulation · 3D digital twin (React Three Fiber: rotate, zoom, reset, grid and sensor toggles) · toast notifications · system-status footer.

## Tech stack
React 18, Vite, JavaScript, Tailwind CSS 3, Three.js / @react-three/fiber / drei, Recharts, Lucide React.

## Install & run
```bash
npm install
npm run dev
```
Open the URL printed by Vite (usually http://localhost:5173). Any non-empty username/password works (demo login, no real authentication).

## Project structure
```
src/
  main.jsx, App.jsx, index.css
  components/   Header, Sidebar, Dashboard, SurveillanceMap, Radar, AlertPanel, ObjectTable,
                ObjectDetails, SensorStatus, Analytics, TrainingScenarios, TrainingSimulation,
                DigitalTwin, Notification, StatusBadge, StatCard, Modal, Login
  data/mock.js  all mock data (every object has simulation: true)
  services/api.js  service layer
```

## Mock API
`src/services/api.js` exposes `getDashboardData, getObjects, getAlerts, getSensors, getTrainingScenarios, getAnalytics, getReports`. Each returns mock data after a short artificial delay, so loading and error states are exercised. Movement, zone-entry alerts and toasts are generated client-side by a simulation loop in `App.jsx`.

## Future Django integration
Set `USE_MOCK = false` in `api.js` and define `VITE_API_URL` (default `http://localhost:8000/api`). Expected endpoints:
`GET /api/dashboard/ · /api/objects/ · /api/alerts/ · /api/sensors/ · /api/scenarios/ · /api/analytics/ · /api/reports/`
Return the same JSON shapes as `src/data/mock.js`. Enable CORS (`django-cors-headers`) or use the Vite proxy. Replace the demo login with token auth (e.g. DRF + JWT).

## Safety / training disclaimer
This is an **academic training simulation**. All objects, sensors, zones, alerts and results are fictional and randomly generated. The app is **not connected to any real system** and contains no weapon control, targeting, guidance, or real interception calculations. The "Virtual Response Simulation" is only a visual sequence with random scores. Do not adapt it for real-world operational use.
