import { useEffect, useState } from 'react';
// Animated counter: eases from 0 to value
export default function StatCard({ icon: Icon, label, value, suffix = '', tone = 'text-cy' }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf, start;
    const step = (t) => { start ??= t; const p = Math.min((t - start) / 800, 1); setN(Math.round(value * p)); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <div className="glass p-3 flex items-center gap-3">
      <div className={`p-2 rounded bg-white/5 ${tone}`}><Icon size={18} /></div>
      <div><div className="text-[11px] text-slate-500">{label}</div><div className={`font-mono text-xl ${tone}`}>{n}{suffix}</div></div>
    </div>
  );
}
