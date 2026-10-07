import { useCallback, useEffect, useState } from 'react';
import { Loader2, AlertOctagon, Box, Map as MapIcon } from 'lucide-react';
import * as api from './services/api.js';
import { zoneOf } from './data/mock.js';
import { ToastProvider, useToast } from './components/Notification.jsx';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import SurveillanceMap from './components/SurveillanceMap.jsx';
import Radar from './components/Radar.jsx';
import DigitalTwin from './components/DigitalTwin.jsx';
import AlertPanel from './components/AlertPanel.jsx';
import ObjectTable from './components/ObjectTable.jsx';
import ObjectDetails from './components/ObjectDetails.jsx';
import SensorStatus from './components/SensorStatus.jsx';
import Analytics from './components/Analytics.jsx';
import TrainingScenarios from './components/TrainingScenarios.jsx';
import TrainingSimulation from './components/TrainingSimulation.jsx';
import Modal from './components/Modal.jsx';
import StatusBadge from './components/StatusBadge.jsx';

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const Title = ({ children }) => <h2 className="text-lg font-semibold mb-3">{children}</h2>;

function Shell({ user, onLogout }) {
  const toast = useToast();
  const [page, setPage] = useState('dashboard'); const [menu, setMenu] = useState(false);
  const [data, setData] = useState(null); const [error, setError] = useState('');
  const [objects, setObjects] = useState([]); const [alerts, setAlerts] = useState([]); const [sensors, setSensors] = useState([]);
  const [selected, setSelected] = useState(null); const [viewAlert, setViewAlert] = useState(null);
  const [scenario, setScenario] = useState(null); const [view3d, setView3d] = useState(false);
  const [opts, setOpts] = useState({ trails: true, grid: true });

  const load = useCallback(async () => {
    setError(''); setData(null);
    try {
      const [dash, obj, alr, sen, scn, ana, rep] = await Promise.all([api.getDashboardData(), api.getObjects(), api.getAlerts(), api.getSensors(), api.getTrainingScenarios(), api.getAnalytics(), api.getReports()]);
      setObjects(obj); setAlerts(alr); setSensors(sen); setData({ dash, scn, ana, rep });
    } catch (e) { setError(e.message || 'Could not load data.'); }
  }, []);
  useEffect(() => { load(); }, [load]);

  // Simulation tick: move fictional objects, log trails, raise a TRAINING alert when a zone is entered.
  useEffect(() => {
    if (!data) return;
    const id = setInterval(() => {
      const newAlerts = [];
      setObjects((prev) => prev.map((o) => {
        let dir = o.direction + (Math.random() - 0.5) * 14; const step = o.speed / 900;
        let x = o.x + Math.sin((dir * Math.PI) / 180) * step, y = o.y - Math.cos((dir * Math.PI) / 180) * step;
        if (x < 8 || x > 92) { dir = 360 - dir; x = clamp(x, 8, 92); } if (y < 11 || y > 91) { dir = 180 - dir; y = clamp(y, 11, 91); }
        dir = (dir + 360) % 360; const zone = zoneOf(x, y);
        if (zone !== o.zone && zone !== 'OUTER') newAlerts.push({ id: `ALR-${Math.floor(Math.random() * 9000 + 1000)}`, objectId: o.id, severity: 'TRAINING EVENT', zone, status: 'NEW', simulation: true,
          message: `Simulated aerial object entered Training Zone ${zone[0] + zone.slice(1).toLowerCase()}.`, time: new Date().toLocaleTimeString('en-GB') });
        return { ...o, x, y, direction: dir, zone, trail: [...o.trail.slice(-25), [x, y]], updated: new Date().toISOString(), confidence: clamp(Math.round(o.confidence + (Math.random() - 0.5) * 3), 60, 99) };
      }));
      if (newAlerts.length) { setAlerts((a) => [...newAlerts, ...a].slice(0, 30)); toast('warning', 'Training alert', newAlerts[0].message); }
    }, 1000);
    return () => clearInterval(id);
  }, [data, toast]);

  // Occasional simulated detection / sensor status notifications
  useEffect(() => {
    if (!data) return;
    const id = setInterval(() => {
      const r = Math.random();
      if (r < 0.5) toast('info', 'New simulated detection', `Contact TRN-${String(Math.floor(Math.random() * 900 + 100))} acquired (simulated).`);
      else if (r < 0.8) { setSensors((s) => { const i = Math.floor(Math.random() * s.length); const n = s[i].status === 'ONLINE' ? 'MAINTENANCE' : 'ONLINE';
        toast(n === 'ONLINE' ? 'success' : 'warning', 'Sensor status change', `${s[i].name} is now ${n}.`);
        return s.map((x, j) => (j === i ? { ...x, status: n, detection: n === 'ONLINE' ? 'ACTIVE' : 'STANDBY', signal: n === 'ONLINE' ? 85 : 0, updated: 'just now' } : x)); }); }
      else toast('warning', 'System warning', 'Simulated link latency elevated (training event).');
    }, 25000);
    return () => clearInterval(id);
  }, [data, toast]);

  const ack = (id) => setAlerts((a) => a.map((x) => (x.id === id ? { ...x, status: 'ACK' } : x)));
  const dismiss = (id) => setAlerts((a) => a.filter((x) => x.id !== id));
  const startScenario = (s) => { setScenario(s); toast('info', 'Scenario started', `${s.name} – simulated objects loaded.`); };
  const onComplete = (r) => toast('success', 'Scenario completed', `Training score ${r.score}/100 (simulated).`);
  const pick = (o) => { setSelected(o); };
  const sel = selected && objects.find((o) => o.id === selected.id);

  let body;
  if (error) body = <div className="glass p-8 text-center"><AlertOctagon className="mx-auto text-crit mb-2" /><p className="text-sm mb-3">{error}</p><button className="btn btn-primary" onClick={load}>Retry</button></div>;
  else if (!data) body = <div className="flex items-center justify-center gap-2 py-24 text-slate-400"><Loader2 className="animate-spin" size={18} />Loading simulated data…</div>;
  else {
    const alertPanel = <AlertPanel alerts={alerts} onAck={ack} onDismiss={dismiss} onView={setViewAlert} />;
    const pages = {
      dashboard: <Dashboard objects={objects} alerts={alerts} sensors={sensors} selected={sel} onSelect={pick} />,
      surveillance: (<div className="space-y-3">
        <div className="flex items-center justify-between"><Title>Live Surveillance</Title>
          <button className="btn flex items-center gap-1" onClick={() => setView3d(!view3d)}>{view3d ? <MapIcon size={12} /> : <Box size={12} />}{view3d ? 'Show 2D map' : 'Show 3D digital twin'}</button></div>
        <div className="grid xl:grid-cols-3 gap-3"><div className="xl:col-span-2">{view3d ? <DigitalTwin objects={objects} sensors={sensors} /> :
          <SurveillanceMap objects={objects} sensors={sensors} selectedId={sel?.id} onSelect={pick} showGrid={opts.grid} showTrails={opts.trails} />}</div>
          <div className="space-y-3"><Radar objects={objects} online={sensors.some((s) => s.status === 'ONLINE')} /><ObjectDetails object={sel} /></div></div></div>),
      scenarios: (<div className="space-y-3"><Title>Training Scenarios</Title><TrainingScenarios scenarios={data.scn} activeId={scenario?.id} onStart={startScenario} />
        <TrainingSimulation key={scenario?.id || 'none'} objects={objects} scenario={scenario} onComplete={onComplete} /></div>),
      alerts: <div><Title>Alerts</Title><div className="max-w-2xl">{alertPanel}</div></div>,
      tracking: (<div className="space-y-3"><Title>Object Tracking</Title><div className="grid xl:grid-cols-3 gap-3"><div className="xl:col-span-2"><ObjectTable objects={objects} onSelect={pick} selectedId={sel?.id} /></div><ObjectDetails object={sel} /></div></div>),
      sensors: <div><Title>Sensor Status</Title><SensorStatus sensors={sensors} /></div>,
      analytics: <div><Title>Analytics</Title><Analytics data={data.ana} /></div>,
      reports: (<div><Title>Training Reports</Title><div className="glass overflow-x-auto"><table className="w-full text-xs"><thead><tr>{['Report', 'Scenario', 'Date', 'Score', 'Response (s)', 'Result'].map((h) => <th key={h} className="th">{h}</th>)}</tr></thead>
        <tbody className="font-mono">{data.rep.map((r) => <tr key={r.id} className="border-t border-line"><td className="px-3 py-2 text-cy">{r.id}</td><td className="px-3 py-2">{r.scenario}</td><td className="px-3 py-2">{r.date}</td><td className="px-3 py-2">{r.score}</td><td className="px-3 py-2">{r.response}</td><td className="px-3 py-2"><StatusBadge value={r.result} /></td></tr>)}</tbody></table></div></div>),
      settings: (<div><Title>Settings</Title><div className="glass p-4 space-y-3 max-w-md text-sm">
        {[['trails', 'Show object trails'], ['grid', 'Show map grid']].map(([k, l]) => (<label key={k} className="flex justify-between items-center"><span>{l}</span>
          <input type="checkbox" checked={opts[k]} onChange={() => setOpts({ ...opts, [k]: !opts[k] })} className="accent-cyan-400" /></label>))}
        <p className="text-xs text-slate-500">Data source: mock JSON via src/services/api.js. Set USE_MOCK=false to call a Django REST backend.</p></div></div>),
    };
    body = (<div className={`grid gap-3 ${['dashboard', 'surveillance'].includes(page) ? '2xl:grid-cols-[1fr_320px]' : ''}`}>
      <div className="min-w-0">{pages[page]}</div>
      {['dashboard', 'surveillance'].includes(page) && <div className="2xl:sticky 2xl:top-0 2xl:self-start">{alertPanel}</div>}</div>);
  }

  return (
    <div className="h-screen flex flex-col">
      <Header operator={user} onMenu={() => setMenu(true)} />
      <div className="flex flex-1 min-h-0">
        <Sidebar page={page} setPage={setPage} open={menu} onClose={() => setMenu(false)} onLogout={onLogout} alertCount={alerts.filter((a) => a.status === 'NEW').length} />
        <main className="flex-1 overflow-y-auto p-3 md:p-4">{body}</main>
      </div>
      <footer className="glass rounded-none border-x-0 border-b-0 px-4 py-1.5 flex flex-wrap gap-x-6 gap-y-0.5 text-[10px] font-mono text-slate-400">
        <span>SYSTEM STATUS: <b className="text-gr">ONLINE</b></span><span>SIMULATION MODE: <b className="text-cy">ACTIVE</b></span>
        <span>DATA SOURCE: <b className="text-warn">MOCK DATA</b></span><span>BACKEND: <b className="text-slate-300">NOT CONNECTED</b></span>
        <span className="ml-auto">ALL OBJECTS AND EVENTS ARE SIMULATED</span>
      </footer>
      {viewAlert && <Modal title={`Alert ${viewAlert.id}`} onClose={() => setViewAlert(null)}>
        <div className="space-y-2 text-sm"><div className="flex gap-2"><StatusBadge value={viewAlert.severity} /><StatusBadge value={viewAlert.status} /></div>
          <p>{viewAlert.message}</p><p className="font-mono text-xs text-slate-400">Object {viewAlert.objectId} · Zone {viewAlert.zone} · {viewAlert.time}</p>
          <p className="text-[11px] text-warn font-mono">SIMULATION · TRAINING ONLY</p>
          <button className="btn btn-primary" onClick={() => { const o = objects.find((x) => x.id === viewAlert.objectId); if (o) { setSelected(o); setPage('surveillance'); } setViewAlert(null); }}>Show object on map</button></div></Modal>}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  return <ToastProvider>{user ? <Shell user={user} onLogout={() => setUser(null)} /> : <Login onLogin={setUser} />}</ToastProvider>;
}
