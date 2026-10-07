import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
const C = ['#22d3ee', '#fb923c', '#f43f5e', '#a78bfa'];
const ax = { stroke: '#475f73', fontSize: 11 };
const tip = { contentStyle: { background: '#0d1722', border: '1px solid #1b2e3f', fontSize: 12 } };
const Card = ({ title, children }) => (
  <div className="glass p-3"><div className="text-sm font-semibold mb-2">{title}<span className="text-[10px] text-warn font-mono ml-2">MOCK</span></div><div className="h-52">{children}</div></div>);
const Grid = () => <CartesianGrid stroke="#14283a" strokeDasharray="3 3" />;
export default function Analytics({ data }) {
  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3">
      <Card title="Objects detected over time"><ResponsiveContainer><AreaChart data={data.detections}><Grid /><XAxis dataKey="t" {...ax} /><YAxis {...ax} /><Tooltip {...tip} />
        <Area dataKey="count" stroke="#22d3ee" fill="#22d3ee33" /></AreaChart></ResponsiveContainer></Card>
      <Card title="Alerts by severity"><ResponsiveContainer><PieChart><Pie data={data.alertsBySeverity} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} label={{ fontSize: 10, fill: '#cbd5e1' }}>
        {data.alertsBySeverity.map((_, i) => <Cell key={i} fill={C[i]} />)}</Pie><Tooltip {...tip} /></PieChart></ResponsiveContainer></Card>
      <Card title="Sensor activity"><ResponsiveContainer><BarChart data={data.sensorActivity}><Grid /><XAxis dataKey="name" {...ax} /><YAxis {...ax} /><Tooltip {...tip} />
        <Bar dataKey="events" fill="#34d399" radius={[3, 3, 0, 0]} /></BarChart></ResponsiveContainer></Card>
      <Card title="Training success rate (%)"><ResponsiveContainer><BarChart data={data.successRate}><Grid /><XAxis dataKey="s" {...ax} /><YAxis domain={[0, 100]} {...ax} /><Tooltip {...tip} />
        <Bar dataKey="rate" fill="#22d3ee" radius={[3, 3, 0, 0]} /></BarChart></ResponsiveContainer></Card>
      <Card title="Average response time (s)"><ResponsiveContainer><LineChart data={data.responseTime}><Grid /><XAxis dataKey="t" {...ax} /><YAxis {...ax} /><Tooltip {...tip} />
        <Line dataKey="sec" stroke="#fb923c" strokeWidth={2} dot /></LineChart></ResponsiveContainer></Card>
      <Card title="Detection confidence (%)"><ResponsiveContainer><LineChart data={data.confidence}><Grid /><XAxis dataKey="t" {...ax} /><YAxis domain={[60, 100]} {...ax} /><Tooltip {...tip} />
        <Line dataKey="pct" stroke="#34d399" strokeWidth={2} dot /></LineChart></ResponsiveContainer></Card>
    </div>
  );
}
