import { useEffect, useRef, useState } from 'react';
import { Radar, ScanSearch, Gauge, ShieldCheck, Flag, ChevronDown } from 'lucide-react';
// Virtual Response Simulation: a purely visual, randomised sequence. No weapon control, no trajectories.
const STEPS = [['Detection', Radar], ['Classification', ScanSearch], ['Threat Assessment', Gauge], ['Virtual Response', ShieldCheck], ['Training Event Complete', Flag]];
export default function TrainingSimulation({ objects, scenario, onComplete }) {
  const [sel, setSel] = useState(objects[0]?.id || '');
  const [step, setStep] = useState(-1); const [result, setResult] = useState(null);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  const start = () => {
    setResult(null); setStep(0);
    const run = (i) => { timer.current = setTimeout(() => {
      if (i < STEPS.length - 1) { setStep(i + 1); run(i + 1); return; }
      const r = { response: +(2 + Math.random() * 4).toFixed(1), confidence: Math.round(75 + Math.random() * 24), score: Math.round(60 + Math.random() * 40) };
      r.outcome = r.score >= 70 ? 'SUCCESS' : 'NEEDS REVIEW'; setResult(r); onComplete?.(r, sel);
    }, 1100); };
    run(0);
  };
  const running = step >= 0 && !result;
  return (
    <div className="glass p-4">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="font-semibold">Virtual Response Simulation{scenario && <span className="text-xs text-slate-400 ml-2">· {scenario.name}</span>}</div>
        <span className="ml-auto text-[11px] font-mono text-warn border border-warn/50 bg-warn/10 px-2 py-0.5 rounded">SIMULATION ONLY – NO REAL-WORLD CONTROL</span>
      </div>
      <div className="flex gap-2 items-center mb-4">
        <select value={sel} onChange={(e) => setSel(e.target.value)} disabled={running} aria-label="Training event" className="bg-black/30 border border-line rounded px-2 py-1.5 text-xs">
          {objects.map((o) => <option key={o.id} value={o.id}>{o.id} – {o.type}</option>)}</select>
        <button className="btn btn-primary disabled:opacity-40" onClick={start} disabled={running || !sel}>START VIRTUAL RESPONSE</button>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-1">
        {STEPS.map(([label, Icon], i) => (
          <div key={label} className="flex md:flex-1 md:flex-col items-center gap-2 md:gap-1">
            <div className={`flex items-center gap-2 px-3 py-2 rounded border text-xs w-full md:justify-center transition-colors ${i < step || result ? 'border-gr/50 text-gr bg-gr/10' : i === step ? 'border-cy text-cy bg-cy/10 animate-pulse' : 'border-line text-slate-500'}`}>
              <Icon size={14} />{label}</div>
            {i < STEPS.length - 1 && <ChevronDown size={14} className="text-slate-600 md:hidden" />}
          </div>))}
      </div>
      {result ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 text-xs">
          {[['Response time', `${result.response}s`], ['Detection confidence', `${result.confidence}%`], ['Scenario result', result.outcome], ['Training score', `${result.score}/100`]].map(([k, v]) => (
            <div key={k} className="bg-black/30 border border-line rounded p-2"><div className="text-slate-500">{k}</div><div className="font-mono text-lg text-cy">{v}</div></div>))}
        </div>) : <p className="text-xs text-slate-500 mt-4">{running ? 'Simulation running…' : 'Pick a simulated event and start the sequence. Values are randomised for training.'}</p>}
    </div>
  );
}
