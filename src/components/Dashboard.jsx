import { Crosshair, Bell, Cpu, Gauge } from 'lucide-react';
import StatCard from './StatCard.jsx';
import SurveillanceMap from './SurveillanceMap.jsx';
import Radar from './Radar.jsx';
import ObjectTable from './ObjectTable.jsx';
import ObjectDetails from './ObjectDetails.jsx';
export default function Dashboard({ objects, alerts, sensors, selected, onSelect }) {
  const avg = Math.round(objects.reduce((a, o) => a + o.confidence, 0) / (objects.length || 1));
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <StatCard icon={Crosshair} label="Tracked objects" value={objects.length} />
        <StatCard icon={Bell} label="Open alerts" value={alerts.filter((a) => a.status === 'NEW').length} tone="text-warn" />
        <StatCard icon={Cpu} label="Sensors online" value={sensors.filter((s) => s.status === 'ONLINE').length} tone="text-gr" />
        <StatCard icon={Gauge} label="Avg confidence" value={avg} suffix="%" tone="text-gr" />
      </div>
      <div className="grid xl:grid-cols-3 gap-3">
        <div className="xl:col-span-2"><SurveillanceMap objects={objects} sensors={sensors} selectedId={selected?.id} onSelect={onSelect} /></div>
        <div className="space-y-3"><Radar objects={objects} /><ObjectDetails object={selected && objects.find((o) => o.id === selected.id)} /></div>
      </div>
      <ObjectTable objects={objects} onSelect={onSelect} selectedId={selected?.id} compact />
    </div>
  );
}
