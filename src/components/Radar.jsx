// Animated circular radar. Contacts derive from simulated objects, positioned relative to map centre.
export default function Radar({ objects, online = true }) {
  const contacts = objects.map((o) => {
    const dx = (o.x - 50) * 1.9, dy = (o.y - 50) * 1.9;
    const ang = (Math.atan2(dx, -dy) * 180 / Math.PI + 360) % 360;
    return { ...o, px: dx, py: dy, delay: (ang / 360) * 6, out: Math.hypot(dx, dy) > 92 };
  }).filter((c) => !c.out);
  return (
    <div className="glass p-3">
      <div className="flex justify-between text-xs mb-1"><span className="font-semibold">Radar</span>
        <span className={`font-mono ${online ? 'text-gr' : 'text-crit'}`}>{online ? 'SWEEP ACTIVE' : 'OFFLINE'}</span></div>
      <svg viewBox="-100 -100 200 200" className="w-full max-w-[340px] mx-auto" role="img" aria-label="Radar display">
        <circle r="96" fill="#05120f" stroke="#1d4d3f" />
        {[24, 48, 72, 96].map((r) => <circle key={r} r={r} fill="none" stroke="#1d4d3f" strokeWidth=".6" />)}
        <g stroke="#1d4d3f" strokeWidth=".5"><line x1="-96" x2="96" /><line y1="-96" y2="96" /></g>
        {online && (
          <g>
            <path d="M0 0 L0 -96 A96 96 0 0 0 -48 -83.1 Z" fill="#34d399" fillOpacity=".22" />
            <line y2="-96" stroke="#34d399" strokeWidth=".8" />
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
          </g>)}
        <circle r="2" fill="#34d399" />
        {contacts.map((c) => (
          <g key={c.id} transform={`translate(${c.px} ${c.py})`}>
            <circle r="3" fill={c.type.includes('Unknown') ? '#fb923c' : '#22d3ee'} className={online ? 'blip' : ''} style={{ animationDelay: `${c.delay}s` }} />
            <text x="5" y="-3" fontSize="6" fill="#a7f3d0" fontFamily="monospace">{c.id}</text>
          </g>))}
        <text y="-99" fontSize="6" fill="#34d399" textAnchor="middle">N</text>
        {[24, 48, 72].map((r, i) => <text key={r} x={r + 1} y="-1" fontSize="5" fill="#2f7a63">{(i + 1) * 10}km</text>)}
      </svg>
      <div className="text-[10px] text-slate-500 text-center mt-1">{contacts.length} simulated contacts in range</div>
    </div>
  );
}
