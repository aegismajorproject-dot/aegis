import { useEffect, useState } from 'react';
import { Shield, User, Menu, Activity } from 'lucide-react';
export default function Header({ operator, onMenu }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(i); }, []);
  return (
    <header className="glass rounded-none border-x-0 border-t-0 px-4 py-2 flex items-center gap-3">
      <button className="lg:hidden" onClick={onMenu} aria-label="Menu"><Menu size={20} /></button>
      <Shield className="text-cy" size={26} />
      <div className="leading-tight">
        <div className="font-bold tracking-[0.2em] text-cy">AEGIS</div>
        <div className="text-[10px] text-slate-400 hidden md:block">AI-Powered Multi-Sensor Surveillance &amp; Training System</div>
      </div>
      <span className="ml-3 px-2 py-0.5 text-[10px] font-mono border border-warn/60 text-warn rounded bg-warn/10">TRAINING SIMULATION</span>
      <span className="hidden xl:block text-[10px] text-slate-500">ALL OBJECTS AND EVENTS ARE SIMULATED</span>
      <div className="ml-auto flex items-center gap-4 text-xs">
        <span className="font-mono text-slate-300 hidden sm:block">SIM {now.toLocaleTimeString('en-GB')}</span>
        <span className="flex items-center gap-1 text-gr"><Activity size={12} /> ONLINE</span>
        <span className="flex items-center gap-2 pl-3 border-l border-line"><User size={16} /><span className="hidden md:block">{operator?.name || 'Operator'}</span></span>
      </div>
    </header>
  );
}
