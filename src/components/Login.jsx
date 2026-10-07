import { useState } from 'react';
import { Shield } from 'lucide-react';
// Demo-only login: any non-empty credentials are accepted. No real authentication occurs.
export default function Login({ onLogin }) {
  const [u, setU] = useState('operator'); const [p, setP] = useState('training'); const [err, setErr] = useState('');
  const submit = (e) => { e.preventDefault(); if (!u.trim() || !p.trim()) return setErr('Enter a username and password to continue.'); onLogin({ name: u, role: 'Training Analyst' }); };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={submit} className="glass w-full max-w-sm p-6 space-y-4">
        <div className="text-center"><Shield className="mx-auto text-cy" size={42} />
          <h1 className="text-2xl font-bold tracking-[0.3em] text-cy mt-2">AEGIS</h1>
          <p className="text-[11px] text-slate-400">AI-Powered Multi-Sensor Surveillance &amp; Training System</p></div>
        <div className="text-center text-[11px] font-mono border border-warn/60 text-warn bg-warn/10 rounded py-1">TRAINING ENVIRONMENT · ALL DATA SIMULATED</div>
        <label className="block text-xs text-slate-400">Username<input value={u} onChange={(e) => setU(e.target.value)} className="mt-1 w-full bg-black/30 border border-line rounded px-3 py-2 text-sm text-slate-100 outline-none focus:border-cy" /></label>
        <label className="block text-xs text-slate-400">Password<input type="password" value={p} onChange={(e) => setP(e.target.value)} className="mt-1 w-full bg-black/30 border border-line rounded px-3 py-2 text-sm text-slate-100 outline-none focus:border-cy" /></label>
        {err && <div className="text-xs text-crit" role="alert">{err}</div>}
        <button className="btn btn-primary w-full py-2 text-sm">Log in</button>
        <div className="flex justify-between text-[10px] font-mono text-slate-500"><span className="text-gr">● SYSTEM ONLINE</span><span>v1.0.0</span></div>
      </form>
    </div>
  );
}
