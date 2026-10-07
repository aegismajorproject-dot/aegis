import StatusBadge from './StatusBadge.jsx';
export default function ObjectDetails({ object }) {
  if (!object) return <div className="glass p-4 text-xs text-slate-500">Select an object on the map or in the table to see its details.</div>;
  const rows = [['ID', object.id], ['Type', object.type], ['Zone', object.zone], ['Speed', `${Math.round(object.speed)} km/h`], ['Altitude', `${Math.round(object.altitude)} m`],
    ['Direction', `${Math.round(object.direction)}°`], ['Confidence', `${object.confidence}%`], ['Detection source', object.source]];
  return (
    <div className="glass p-3 text-xs">
      <div className="flex justify-between mb-2"><span className="font-semibold text-sm">Object details</span><StatusBadge value={object.status} /></div>
      <dl className="grid grid-cols-2 gap-y-1">{rows.map(([k, v]) => (<div key={k} className="contents"><dt className="text-slate-500">{k}</dt><dd className="font-mono text-right">{v}</dd></div>))}</dl>
      <div className="mt-2 h-1.5 bg-black/40 rounded"><div className="h-full bg-cy rounded" style={{ width: `${object.confidence}%` }} /></div>
      <div className="mt-2 text-[10px] text-warn font-mono">simulation: {String(object.simulation)}</div>
    </div>
  );
}
