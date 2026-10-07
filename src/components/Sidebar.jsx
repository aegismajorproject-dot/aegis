import { LayoutDashboard, Radar, GraduationCap, Bell, Crosshair, Cpu, BarChart3, FileText, Settings, LogOut } from 'lucide-react';
export const NAV = [
  ['dashboard', 'Dashboard', LayoutDashboard], ['surveillance', 'Live Surveillance', Radar], ['scenarios', 'Training Scenarios', GraduationCap],
  ['alerts', 'Alerts', Bell], ['tracking', 'Object Tracking', Crosshair], ['sensors', 'Sensor Status', Cpu],
  ['analytics', 'Analytics', BarChart3], ['reports', 'Training Reports', FileText], ['settings', 'Settings', Settings],
];
export default function Sidebar({ page, setPage, open, onClose, onLogout, alertCount }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onClose} />}
      <nav className={`glass rounded-none border-y-0 border-l-0 w-52 shrink-0 p-2 flex flex-col gap-1 z-40 fixed lg:static inset-y-0 left-0 pt-14 lg:pt-2 transition-transform ${open ? '' : '-translate-x-full lg:translate-x-0'}`}>
        {NAV.map(([k, label, Icon]) => (
          <button key={k} onClick={() => { setPage(k); onClose(); }}
            className={`flex items-center gap-2 px-3 py-2 rounded text-sm text-left transition-colors ${page === k ? 'bg-cy/15 text-cy border border-cy/30' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}>
            <Icon size={16} /> <span className="flex-1">{label}</span>
            {k === 'alerts' && alertCount > 0 && <span className="text-[10px] bg-crit/80 text-white rounded-full px-1.5">{alertCount}</span>}
          </button>
        ))}
        <button onClick={onLogout} className="mt-auto flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-crit"><LogOut size={16} /> Sign out</button>
      </nav>
    </>
  );
}
