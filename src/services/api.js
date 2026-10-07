// Service layer. Set USE_MOCK=false (and VITE_API_URL) to call Django REST endpoints instead.
import * as mock from '../data/mock.js';
const USE_MOCK = true;
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const delay = (data, ms = 400) => new Promise((res) => setTimeout(() => res(structuredClone(data)), ms));
async function request(path) {
  const r = await fetch(`${BASE}${path}`, { headers: { 'Content-Type': 'application/json' } });
  if (!r.ok) throw new Error(`API ${r.status}: ${path}`);
  return r.json();
}
const get = (path, data) => (USE_MOCK ? delay(data) : request(path));
export const getDashboardData = () => get('/dashboard/', mock.dashboard);     // GET /api/dashboard/
export const getObjects = () => get('/objects/', mock.objects);               // GET /api/objects/
export const getAlerts = () => get('/alerts/', mock.alerts);                  // GET /api/alerts/
export const getSensors = () => get('/sensors/', mock.sensors);               // GET /api/sensors/
export const getTrainingScenarios = () => get('/scenarios/', mock.scenarios); // GET /api/scenarios/
export const getAnalytics = () => get('/analytics/', mock.analytics);         // GET /api/analytics/
export const getReports = () => get('/reports/', mock.reports);               // GET /api/reports/
