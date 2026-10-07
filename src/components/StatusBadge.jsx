const tone = {
  ONLINE: 'text-gr border-gr/40 bg-gr/10', ACTIVE: 'text-cy border-cy/40 bg-cy/10', TRACKED: 'text-gr border-gr/40 bg-gr/10',
  MONITORING: 'text-warn border-warn/40 bg-warn/10', MAINTENANCE: 'text-warn border-warn/40 bg-warn/10', STANDBY: 'text-slate-400 border-slate-600 bg-slate-700/20',
  INFO: 'text-cy border-cy/40 bg-cy/10', WARNING: 'text-warn border-warn/40 bg-warn/10', CRITICAL: 'text-crit border-crit/40 bg-crit/10',
  'TRAINING EVENT': 'text-violet-300 border-violet-400/40 bg-violet-400/10', NEW: 'text-warn border-warn/40 bg-warn/10', ACK: 'text-gr border-gr/40 bg-gr/10',
  PASS: 'text-gr border-gr/40 bg-gr/10', RETRY: 'text-warn border-warn/40 bg-warn/10', OFFLINE: 'text-crit border-crit/40 bg-crit/10',
};
export default function StatusBadge({ value }) {
  return <span className={`px-2 py-0.5 rounded border text-[10px] font-mono tracking-wide ${tone[value] || 'text-slate-300 border-line'}`}>{value}</span>;
}
