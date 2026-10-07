import { ZONES } from '../data/mock.js';
// 2D tactical map of a FICTIONAL city. Coordinates are abstract (0-100).
export default function SurveillanceMap({ objects, sensors, selectedId, onSelect, showGrid = true, showTrails = true }) {
  const col = (o) => (o.type.includes('Unknown') ? '#fb923c' : '#22d3ee');
  return (
    <div className="glass p-2 h-full min-h-[320px] relative">
      <svg viewBox="0 0 100 100" className="w-full h-full max-h-[70vh]" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Surveillance map">
        <rect width="100" height="100" fill="#07111a" rx="1" />
        {showGrid && Array.from({ length: 9 }, (_, i) => (i + 1) * 10).map((v) => (
          <g key={v} stroke="#14283a" strokeWidth=".15"><line x1={v} y1="0" x2={v} y2="100" /><line x1="0" y1={v} x2="100" y2={v} /></g>))}
        <rect x="4" y="5" width="92" height="90" fill="none" stroke="#3b5368" strokeWidth=".4" />
        <text x="5" y="8" fontSize="2.2" fill="#5b7488">CITY BOUNDARY (FICTIONAL)</text>
        <rect x="6" y="9" width="88" height="84" fill="none" stroke="#22d3ee" strokeWidth=".35" strokeDasharray="2 1.2" />
        <text x="7" y="12" fontSize="2" fill="#22d3ee">TRAINING BOUNDARY</text>
        <circle cx="50" cy="50" r="9" fill="#34d39914" stroke="#34d399" strokeWidth=".25" /><text x="50" y="50.5" fontSize="1.8" fill="#34d399" textAnchor="middle">SAFE ZONE</text>
        {Object.entries(ZONES).map(([k, z]) => (
          <g key={k}><rect x={z.x} y={z.y} width={z.w} height={z.h} fill="#fb923c10" stroke="#fb923c" strokeWidth=".3" strokeDasharray="1 1" />
            <text x={z.x + 1} y={z.y + 3} fontSize="2" fill="#fb923c">{z.label.toUpperCase()}</text></g>))}
        {sensors.map((s) => (
          <g key={s.id}><polygon points={`${s.x},${s.y - 2} ${s.x + 1.7},${s.y + 1.2} ${s.x - 1.7},${s.y + 1.2}`} fill={s.status === 'ONLINE' ? '#34d399' : '#fb923c'} />
            <circle cx={s.x} cy={s.y} r="12" fill="none" stroke={s.status === 'ONLINE' ? '#34d39933' : '#fb923c22'} strokeWidth=".2" />
            <text x={s.x + 2.5} y={s.y + 3} fontSize="1.8" fill="#8aa4b8">{s.name.split(' ')[1]}</text></g>))}
        {objects.map((o) => (
          <g key={o.id} onClick={() => onSelect(o)} className="cursor-pointer">
            {showTrails && o.trail.length > 1 && <polyline points={o.trail.map((p) => p.join(',')).join(' ')} fill="none" stroke="#22d3ee" strokeOpacity=".5" strokeWidth=".35" />}
            <circle cx={o.x} cy={o.y} className="pulse-ring" fill="none" stroke={col(o)} strokeWidth=".3" />
            <circle cx={o.x} cy={o.y} r={selectedId === o.id ? 1.8 : 1.2} fill={col(o)} stroke="#fff" strokeWidth={selectedId === o.id ? 0.4 : 0} />
            <text x={o.x + 2} y={o.y - 1.5} fontSize="1.9" fill="#e2e8f0" fontFamily="monospace">{o.id}</text>
          </g>))}
        <g transform="translate(92 14)" fill="#cbd5e1"><polygon points="0,-4 1.4,1 0,0 -1.4,1" fill="#22d3ee" /><text y="4.5" fontSize="2.4" textAnchor="middle">N</text></g>
        <g transform="translate(8 96)"><line x2="20" stroke="#94a3b8" strokeWidth=".4" /><line y1="-1" y2="1" stroke="#94a3b8" strokeWidth=".4" /><line x1="20" y1="-1" x2="20" y2="1" stroke="#94a3b8" strokeWidth=".4" />
          <text x="22" y=".8" fontSize="2" fill="#94a3b8">5 km (simulated)</text></g>
      </svg>
      <span className="absolute top-3 right-3 text-[10px] font-mono text-warn">SIMULATION</span>
    </div>
  );
}
