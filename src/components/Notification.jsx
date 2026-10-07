import { createContext, useCallback, useContext, useState } from 'react';
import { Info, AlertTriangle, ShieldAlert, CheckCircle2, X } from 'lucide-react';
const Ctx = createContext(() => {});
export const useToast = () => useContext(Ctx);
const icons = { info: Info, warning: AlertTriangle, critical: ShieldAlert, success: CheckCircle2 };
const colors = { info: 'border-cy/50 text-cy', warning: 'border-warn/50 text-warn', critical: 'border-crit/50 text-crit', success: 'border-gr/50 text-gr' };
// push(kind, title, message): info = new detection, warning = training alert / system warning, success = scenario complete, etc.
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((kind, title, msg) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t.slice(-3), { id, kind, title, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4500);
  }, []);
  return (
    <Ctx.Provider value={push}>
      {children}
      <div className="fixed top-16 right-4 z-[60] space-y-2 w-72" aria-live="polite">
        {toasts.map((t) => { const I = icons[t.kind]; return (
          <div key={t.id} className={`glass slidein p-3 border-l-4 ${colors[t.kind]} flex gap-2`}>
            <I size={16} className="mt-0.5 shrink-0" />
            <div className="flex-1"><div className="text-xs font-semibold">{t.title}</div><div className="text-[11px] text-slate-400">{t.msg}</div></div>
            <button onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))} aria-label="Dismiss"><X size={12} /></button>
          </div>); })}
      </div>
    </Ctx.Provider>
  );
}
