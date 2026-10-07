import { Eye, Check, Trash2, BellOff } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
export default function AlertPanel({ alerts, onAck, onDismiss, onView }) {
  return (
    <aside className="glass flex flex-col h-full min-h-[280px] max-h-[85vh]">
      <div className="p-3 border-b border-line flex justify-between items-center">
        <span className="font-semibold text-sm">Alerts</span><span className="text-[10px] font-mono text-warn">SIMULATION · TRAINING ONLY</span>
      </div>
      <div className="overflow-y-auto p-2 space-y-2 flex-1">
        {alerts.length === 0 && <div className="text-center text-slate-500 text-xs py-8"><BellOff className="mx-auto mb-2" size={20} />No active alerts. New simulated alerts appear here.</div>}
        {alerts.map((a) => (
          <div key={a.id} className={`rounded border p-2 text-xs ${a.severity === 'CRITICAL' ? 'border-crit/50' : a.severity === 'WARNING' ? 'border-warn/40' : 'border-line'} bg-black/20`}>
            <div className="flex justify-between items-center mb-1"><StatusBadge value={a.severity} /><StatusBadge value={a.status} /></div>
            {a.severity === 'TRAINING EVENT' && <div className="font-semibold text-violet-300">TRAINING ALERT</div>}
            <div className="text-slate-200">{a.message}</div>
            <div className="font-mono text-[10px] text-slate-500 mt-1">{a.id} · {a.objectId} · {a.time} · Zone {a.zone}</div>
            <div className="flex gap-1 mt-2 flex-wrap">
              <button className="btn flex items-center gap-1" onClick={() => onAck(a.id)} disabled={a.status === 'ACK'}><Check size={11} />Acknowledge</button>
              <button className="btn flex items-center gap-1" onClick={() => onView(a)}><Eye size={11} />View</button>
              <button className="btn flex items-center gap-1" onClick={() => onDismiss(a.id)}><Trash2 size={11} />Dismiss</button>
            </div>
          </div>))}
      </div>
    </aside>
  );
}
