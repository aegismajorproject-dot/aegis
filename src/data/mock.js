// All data is FICTIONAL and SIMULATED. Every object carries simulation: true.
// Map coordinates are abstract units (0-100), not real-world locations.
export const ZONES = {
  ALPHA: { x: 8, y: 10, w: 34, h: 34, label: 'Training Zone Alpha' },
  BETA: { x: 55, y: 12, w: 34, h: 30, label: 'Training Zone Beta' },
  GAMMA: { x: 30, y: 58, w: 40, h: 32, label: 'Training Zone Gamma' },
};
export const zoneOf = (x, y) =>
  Object.entries(ZONES).find(([, z]) => x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h)?.[0] || 'OUTER';

export const objects = [
  { id: 'TRN-001', type: 'Training Drone', status: 'ACTIVE', zone: 'ALPHA', altitude: 1200, speed: 180, direction: 72, confidence: 94, source: 'Sensor Alpha', x: 22, y: 25, simulation: true },
  { id: 'TRN-002', type: 'Unknown Training Object', status: 'MONITORING', zone: 'BETA', altitude: 800, speed: 95, direction: 200, confidence: 71, source: 'Sensor Beta', x: 70, y: 28, simulation: true },
  { id: 'TRN-003', type: 'Training Aircraft', status: 'TRACKED', zone: 'GAMMA', altitude: 5400, speed: 420, direction: 310, confidence: 97, source: 'Sensor Gamma', x: 50, y: 74, simulation: true },
  { id: 'TRN-004', type: 'Simulated Projectile', status: 'ACTIVE', zone: 'OUTER', altitude: 300, speed: 260, direction: 135, confidence: 83, source: 'Sensor Alpha', x: 8, y: 52, simulation: true },
  { id: 'TRN-005', type: 'Training Drone', status: 'MONITORING', zone: 'OUTER', altitude: 650, speed: 120, direction: 20, confidence: 78, source: 'Sensor Beta', x: 90, y: 60, simulation: true },
].map((o) => ({ ...o, trail: [[o.x, o.y]], updated: new Date().toISOString() }));

export const alerts = [
  { id: 'ALR-1001', objectId: 'TRN-001', severity: 'TRAINING EVENT', zone: 'ALPHA', message: 'Simulated aerial object entered Training Zone Alpha.', status: 'NEW', time: '08:41:12' },
  { id: 'ALR-1002', objectId: 'TRN-002', severity: 'WARNING', zone: 'BETA', message: 'Unclassified training object loitering in Zone Beta.', status: 'NEW', time: '08:43:50' },
  { id: 'ALR-1003', objectId: 'TRN-004', severity: 'CRITICAL', zone: 'OUTER', message: 'Simulated projectile approaching training boundary.', status: 'NEW', time: '08:46:03' },
  { id: 'ALR-1004', objectId: 'TRN-003', severity: 'INFO', zone: 'GAMMA', message: 'Training aircraft track established.', status: 'ACK', time: '08:30:27' },
].map((a) => ({ ...a, simulation: true }));

export const sensors = [
  { id: 'S-ALPHA', name: 'Sensor Alpha', status: 'ONLINE', detection: 'ACTIVE', signal: 96, health: 98, detections: 142, updated: '2s ago', x: 25, y: 28 },
  { id: 'S-BETA', name: 'Sensor Beta', status: 'ONLINE', detection: 'ACTIVE', signal: 89, health: 92, detections: 117, updated: '3s ago', x: 72, y: 26 },
  { id: 'S-GAMMA', name: 'Sensor Gamma', status: 'MAINTENANCE', detection: 'STANDBY', signal: 0, health: 61, detections: 64, updated: '14m ago', x: 50, y: 76 },
  { id: 'S-DELTA', name: 'Sensor Delta', status: 'ONLINE', detection: 'ACTIVE', signal: 82, health: 87, detections: 98, updated: '5s ago', x: 50, y: 50 },
].map((s) => ({ ...s, simulation: true }));

export const scenarios = [
  { id: 'SCN-01', name: 'Scenario 01 – Basic Detection', difficulty: 'Easy', duration: '10 min', objects: 1, description: 'Detect and classify a single training drone entering Zone Alpha.' },
  { id: 'SCN-02', name: 'Scenario 02 – Multiple Object Tracking', difficulty: 'Medium', duration: '15 min', objects: 3, description: 'Maintain tracks on several simulated objects crossing sector boundaries.' },
  { id: 'SCN-03', name: 'Scenario 03 – Boundary Alert', difficulty: 'Medium', duration: '12 min', objects: 2, description: 'Respond to alerts raised when objects approach the training boundary.' },
  { id: 'SCN-04', name: 'Scenario 04 – Sensor Failure', difficulty: 'Hard', duration: '20 min', objects: 3, description: 'Maintain situational awareness while a sensor drops offline.' },
  { id: 'SCN-05', name: 'Scenario 05 – Multi-Object Training Exercise', difficulty: 'Hard', duration: '30 min', objects: 5, description: 'Full exercise combining detection, tracking and virtual response.' },
];

const hours = ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00'];
export const analytics = {
  detections: hours.map((t, i) => ({ t, count: [12, 19, 27, 22, 34, 29, 38][i] })),
  alertsBySeverity: [{ name: 'INFO', value: 24 }, { name: 'WARNING', value: 15 }, { name: 'CRITICAL', value: 6 }, { name: 'TRAINING', value: 31 }],
  sensorActivity: [{ name: 'Alpha', events: 142 }, { name: 'Beta', events: 117 }, { name: 'Gamma', events: 64 }, { name: 'Delta', events: 98 }],
  successRate: ['Scn 01', 'Scn 02', 'Scn 03', 'Scn 04', 'Scn 05'].map((s, i) => ({ s, rate: [96, 88, 84, 72, 68][i] })),
  responseTime: hours.map((t, i) => ({ t, sec: [4.2, 3.9, 3.6, 3.8, 3.1, 2.9, 2.7][i] })),
  confidence: hours.map((t, i) => ({ t, pct: [82, 84, 88, 86, 91, 90, 93][i] })),
};
export const dashboard = { operator: { name: 'Cadet Operator', role: 'Training Analyst' }, version: 'v1.0.0', systemStatus: 'ONLINE' };
export const reports = [
  { id: 'RPT-031', scenario: 'Scenario 02', date: '2025-01-14', score: 88, response: 3.6, result: 'PASS' },
  { id: 'RPT-030', scenario: 'Scenario 04', date: '2025-01-13', score: 71, response: 4.8, result: 'PASS' },
  { id: 'RPT-029', scenario: 'Scenario 05', date: '2025-01-12', score: 59, response: 6.1, result: 'RETRY' },
];
