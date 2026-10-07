import { useMemo, useState } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
const COLS = [['id', 'Object ID'], ['type', 'Type'], ['status', 'Status'], ['zone', 'Zone'], ['altitude', 'Altitude'], ['speed', 'Speed'], ['direction', 'Direction'], ['confidence', 'Confidence'], ['updated', 'Last Updated']];
const SHORT = ['id', 'type', 'status', 'zone', 'confidence'];
export default function ObjectTable({ objects, onSelect, selectedId, compact = false }) {
  const [q, setQ] = useState(''); const [status, setStatus] = useState('ALL'); const [sort, setSort] = useState({ key: 'id', dir: 1 });
  const rows = useMemo(() => objects
    .filter((o) => (status === 'ALL' || o.status === status) && `${o.id} ${o.type} ${o.zone}`.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => (a[sort.key] > b[sort.key] ? 1 : -1) * sort.dir), [objects, q, status, sort]);
  const cols = COLS.filter(([k]) => !compact || SHORT.includes(k));
  return (
    <div className="glass">
      <div className="p-3 flex flex-wrap gap-2 items-center border-b border-line">
        <span className="font-semibold text-sm mr-auto">Object tracking <span className="text-[10px] text-warn font-mono ml-2">SIMULATED</span></span>
        <div className="relative"><Search size={12} className="absolute left-2 top-2 text-slate-500" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" aria-label="Search objects" className="bg-black/30 border border-line rounded pl-7 pr-2 py-1 text-xs w-36 outline-none focus:border-cy" /></div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status" className="bg-black/30 border border-line rounded px-2 py-1 text-xs">
          {['ALL', 'ACTIVE', 'MONITORING', 'TRACKED'].map((s) => <option key={s}>{s}</option>)}</select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead><tr>{cols.map(([k, l]) => (
            <th key={k} className="th" onClick={() => setSort((s) => ({ key: k, dir: s.key === k ? -s.dir : 1 }))}>{l} <ArrowUpDown size={9} className="inline" /></th>))}</tr></thead>
          <tbody className="font-mono">
            {rows.map((o) => (
              <tr key={o.id} onClick={() => onSelect(o)} className={`cursor-pointer border-t border-line hover:bg-white/5 ${selectedId === o.id ? 'bg-cy/10' : ''}`}>
                <td className="px-3 py-2 text-cy">{o.id}</td><td className="px-3 py-2 font-sans">{o.type}</td><td className="px-3 py-2"><StatusBadge value={o.status} /></td><td className="px-3 py-2">{o.zone}</td>
                {!compact && <><td className="px-3 py-2">{Math.round(o.altitude)} m</td><td className="px-3 py-2">{Math.round(o.speed)} km/h</td><td className="px-3 py-2">{Math.round(o.direction)}°</td></>}
                <td className="px-3 py-2">{o.confidence}%</td>{!compact && <td className="px-3 py-2 text-slate-500">{new Date(o.updated).toLocaleTimeString('en-GB')}</td>}
              </tr>))}
            {rows.length === 0 && <tr><td colSpan="9" className="text-center py-8 text-slate-500 font-sans">No objects match your filters. Clear the search to see all tracks.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
