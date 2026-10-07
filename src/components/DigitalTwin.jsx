import { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line } from '@react-three/drei';
import { RotateCcw, Grid3X3, Radio } from 'lucide-react';
// Low-poly FICTIONAL city. World units: map (0-100) -> (-30..30).
const W = (v) => (v - 50) * 0.6;
function rng(seed) { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647); }
function City() {
  const blds = useMemo(() => { const r = rng(42); const a = [];
    for (let x = -26; x <= 26; x += 5) for (let z = -26; z <= 26; z += 5) { if (Math.abs(x) < 3 || Math.abs(z) < 3) continue; const h = 1 + r() * 6; a.push({ x: x + r(), z: z + r(), h, w: 2 + r() * 1.5 }); }
    return a; }, []);
  return (<>
    <mesh rotation-x={-Math.PI / 2}><planeGeometry args={[64, 64]} /><meshStandardMaterial color="#08141d" /></mesh>
    <mesh position={[0, 0.02, 0]}><boxGeometry args={[64, 0.02, 3]} /><meshStandardMaterial color="#1b2e3f" /></mesh>
    <mesh position={[0, 0.02, 0]}><boxGeometry args={[3, 0.02, 64]} /><meshStandardMaterial color="#1b2e3f" /></mesh>
    {blds.map((b, i) => (<mesh key={i} position={[b.x, b.h / 2, b.z]}><boxGeometry args={[b.w, b.h, b.w]} /><meshStandardMaterial color="#14324a" emissive="#0a2233" /></mesh>))}
    <mesh rotation-x={-Math.PI / 2} position={[0, 0.05, 0]}><ringGeometry args={[27.5, 28, 64]} /><meshBasicMaterial color="#22d3ee" /></mesh>
  </>);
}
export default function DigitalTwin({ objects, sensors }) {
  const [grid, setGrid] = useState(true); const [showS, setShowS] = useState(true); const [rk, setRk] = useState(0);
  return (
    <div className="glass p-2 relative h-[60vh] min-h-[360px]">
      <div className="absolute z-10 top-3 left-3 flex gap-2">
        <button className="btn bg-black/50 flex items-center gap-1" onClick={() => setRk((k) => k + 1)}><RotateCcw size={12} />Reset view</button>
        <button className={`btn bg-black/50 flex items-center gap-1 ${grid ? 'text-cy' : ''}`} onClick={() => setGrid(!grid)}><Grid3X3 size={12} />Grid</button>
        <button className={`btn bg-black/50 flex items-center gap-1 ${showS ? 'text-cy' : ''}`} onClick={() => setShowS(!showS)}><Radio size={12} />Sensors</button>
      </div>
      <span className="absolute z-10 top-3 right-3 text-[10px] font-mono text-warn">FICTIONAL DIGITAL TWIN · SIMULATION</span>
      <span className="absolute z-10 bottom-3 left-3 text-[10px] text-slate-500">Drag to rotate · scroll to zoom · right-drag to pan</span>
      <Canvas key={rk} camera={{ position: [40, 30, 40], fov: 50 }}>
        <color attach="background" args={['#050a10']} />
        <ambientLight intensity={0.7} /><directionalLight position={[20, 40, 10]} intensity={1} />
        <City />
        {grid && <gridHelper args={[64, 32, '#1d4d3f', '#10263a']} position={[0, 0.03, 0]} />}
        {showS && sensors.map((s) => (<group key={s.id} position={[W(s.x), 0, W(s.y)]}>
          <mesh position={[0, 4, 0]}><cylinderGeometry args={[0.15, 0.3, 8, 8]} /><meshStandardMaterial color={s.status === 'ONLINE' ? '#34d399' : '#fb923c'} /></mesh>
          <mesh position={[0, 8.3, 0]}><sphereGeometry args={[0.6, 12, 12]} /><meshBasicMaterial color={s.status === 'ONLINE' ? '#34d399' : '#fb923c'} /></mesh></group>))}
        {objects.map((o) => { const y = 3 + o.altitude / 400; return (<group key={o.id}>
          <mesh position={[W(o.x), y, W(o.y)]}><octahedronGeometry args={[0.8]} /><meshBasicMaterial color={o.type.includes('Unknown') ? '#fb923c' : '#22d3ee'} /></mesh>
          {o.trail.length > 1 && <Line points={o.trail.map(([x, z]) => [W(x), y, W(z)])} color="#22d3ee" lineWidth={1} transparent opacity={0.6} />}</group>); })}
        <OrbitControls maxPolarAngle={Math.PI / 2.1} minDistance={15} maxDistance={110} />
      </Canvas>
    </div>
  );
}
