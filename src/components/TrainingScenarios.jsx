import { Clock, Layers, Play } from 'lucide-react';
const tone = { Easy: 'text-gr', Medium: 'text-warn', Hard: 'text-crit' };
export default function TrainingScenarios({ scenarios, activeId, onStart }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
      {scenarios.map((s) => (
        <div key={s.id} className={`glass p-4 flex flex-col gap-2 ${activeId === s.id ? 'border-cy' : ''}`}>
          <div className="font-semibold text-sm">{s.name}</div>
          <p className="text-xs text-slate-400 flex-1">{s.description}</p>
          <div className="flex gap-4 text-xs font-mono">
            <span className={tone[s.difficulty]}>{s.difficulty}</span><span className="flex items-center gap-1"><Clock size={12} />{s.duration}</span>
            <span className="flex items-center gap-1"><Layers size={12} />{s.objects} objects</span>
          </div>
          <button className="btn btn-primary flex items-center justify-center gap-1" onClick={() => onStart(s)}><Play size={12} />{activeId === s.id ? 'Training active' : 'Start Training'}</button>
        </div>))}
    </div>
  );
}
