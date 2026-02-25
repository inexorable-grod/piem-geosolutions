'use client'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts'

const projectsByType = [
  { name: 'Reservoir', value: 42 },
  { name: 'Seismic', value: 31 },
  { name: 'Modeling', value: 28 },
  { name: 'Production', value: 25 },
  { name: 'Surface', value: 15 },
  { name: 'Data', value: 9 },
]

const projectsByYear = [
  { year: '2020', projects: 12, revenue: 1.2 },
  { year: '2021', projects: 18, revenue: 1.8 },
  { year: '2022', projects: 24, revenue: 2.4 },
  { year: '2023', projects: 31, revenue: 3.1 },
  { year: '2024', projects: 38, revenue: 4.2 },
  { year: '2025', projects: 28, revenue: 3.8 },
]

const byRegion = [
  { name: 'Latin America', value: 65, color: '#FF671D' },
  { name: 'North America',  value: 18, color: '#e55a15' },
  { name: 'Middle East',    value: 10, color: '#c44b0f' },
  { name: 'Asia Pacific',   value: 7,  color: '#993a0b' },
]

const CHART_TOOLTIP = {
  contentStyle: {
    background: '#161b22',
    border: '1px solid rgba(255,103,29,0.2)',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#e6edf3',
  },
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-steel-100">Analytics &amp; KPIs</h1>
        <p className="text-sm text-steel-400 mt-1">Performance metrics across all projects and operations</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue (USD)', value: '$16.5M', delta: '+22%' },
          { label: 'Avg Project Duration', value: '8.3 mo', delta: '-5%' },
          { label: 'Client Satisfaction', value: '97.2%', delta: '+1.8%' },
          { label: 'On-Time Delivery', value: '94.5%', delta: '+3.1%' },
        ].map((kpi, i) => (
          <div key={i} className="p-5 rounded-xl border border-dark-border bg-dark-card">
            <p className="text-xs text-steel-400 mb-2">{kpi.label}</p>
            <p className="font-display text-2xl font-bold text-gradient-orange">{kpi.value}</p>
            <p className={`text-xs mt-1 ${kpi.delta.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{kpi.delta} vs last year</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-dark-border bg-dark-card">
          <h3 className="text-sm font-semibold text-steel-200 mb-6">Projects by Type</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={projectsByType} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" tick={{ fill: '#8b949e', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8b949e', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={CHART_TOOLTIP.contentStyle} />
              <Bar dataKey="value" fill="#FF671D" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 rounded-xl border border-dark-border bg-dark-card">
          <h3 className="text-sm font-semibold text-steel-200 mb-6">Projects &amp; Revenue by Year</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={projectsByYear}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="year" tick={{ fill: '#8b949e', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8b949e', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={CHART_TOOLTIP.contentStyle} />
              <Line type="monotone" dataKey="projects" stroke="#FF671D" strokeWidth={2} dot={{ fill: '#FF671D', r: 4 }} />
              <Line type="monotone" dataKey="revenue" stroke="#1a4a6b" strokeWidth={2} dot={{ fill: '#1a4a6b', r: 4 }} />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#8b949e' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-dark-border bg-dark-card max-w-md">
        <h3 className="text-sm font-semibold text-steel-200 mb-6">Projects by Region</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={byRegion} dataKey="value" cx="50%" cy="50%" outerRadius={70} label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''} ${((percent || 0)*100).toFixed(0)}%`} labelLine={false} fontSize={10}>
              {byRegion.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={CHART_TOOLTIP.contentStyle} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
