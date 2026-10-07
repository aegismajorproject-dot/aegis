import { Cpu } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
export default function SensorStatus({ sensors }) {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
      {sensors.map((s) => (
        <div key={s.id} className="glass p-4 text-xs space-y-2">
          <div className="flex items-center gap-2"><Cpu size={16} className="text-cy" /><span className="font-semibold text-sm flex-1">{s.name}</span><StatusBadge value={s.status} /></div>
          <div className="flex justify-between"><span className="text-slate-500">Detection</span><StatusBadge value={s.detection} /></div>
          <div className="flex justify-between"><span className="text-slate-500">Signal quality</span><span className="font-mono">{s.signal}%</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Detections</span><span className="font-mono">{s.detections}</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Last update</span><span className="font-mono">{s.updated}</span></div>
          <div><div className="flex justify-between text-slate-500 mb-1"><span>Health</span><span className="font-mono text-slate-200">{s.health}%</span></div>
            <div className="h-1.5 bg-black/40 rounded"><div className={`h-full rounded ${s.health > 80 ? 'bg-gr' : 'bg-warn'}`} style={{ width: `${s.health}%` }} /></div></div>
        </div>))}
    </div>
  );
}
