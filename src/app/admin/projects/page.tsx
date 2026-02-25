'use client'
import { useState } from 'react'
import { MOCK_PROJECTS } from '@/lib/constants'
import { Project } from '@/types'
import { Plus, Search, Globe, Calendar } from 'lucide-react'

const STATUS_COLORS: Record<string, string> = {
  active:    'text-blue-400 bg-blue-400/10 border-blue-400/20',
  completed: 'text-green-400 bg-green-400/10 border-green-400/20',
  on_hold:   'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  proposal:  'text-purple-400 bg-purple-400/10 border-purple-400/20',
}

const TYPE_LABELS: Record<string, string> = {
  reservoir_characterization: 'Reservoir Char.',
  seismic_interpretation:     'Seismic Interp.',
  static_modeling:            'Static Model',
  dynamic_simulation:         'Dynamic Sim.',
  production_optimization:    'Production Opt.',
  surface_facilities:         'Surface Facilities',
  data_management:            'Data Management',
  economic_evaluation:        'Economic Eval.',
}

export default function ProjectsPage() {
  const [projects] = useState<Project[]>(MOCK_PROJECTS)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string>('all')

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || p.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-steel-100">Projects</h1>
          <p className="text-sm text-steel-400 mt-1">{projects.length} total &middot; {projects.filter(p => p.status === 'active').length} active</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange-400 text-steel-900 font-semibold text-sm hover:bg-orange-300 transition-all shadow-orange">
          <Plus size={15} /> New Project
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..."
            className="pl-8 pr-4 py-2 rounded-lg bg-dark-card border border-dark-border text-steel-200 text-sm w-56 focus:outline-none focus:border-orange-400/50 transition-colors" />
        </div>
        {['all', 'active', 'completed', 'on_hold', 'proposal'].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === s ? 'bg-orange-400/10 text-orange-400 border border-orange-400/30' : 'border border-dark-border text-steel-400 hover:border-steel-600'
            }`}>{s === 'all' ? 'All' : s.replace('_', ' ')}</button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((project) => (
          <div key={project.id} className="p-5 rounded-xl border border-dark-border bg-dark-card hover:border-orange-400/30 hover:shadow-orange transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-steel-100 truncate">{project.name}</h3>
                <p className="text-xs text-steel-500 mt-0.5">{TYPE_LABELS[project.type] || project.type}</p>
              </div>
              <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${STATUS_COLORS[project.status] || ''}`}>
                {project.status.replace('_', ' ')}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-steel-400">
                <Globe size={12} className="text-orange-400" /> {project.client} &middot; {project.country}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-steel-400">
                <Calendar size={12} className="text-orange-400" />
                {new Date(project.startDate).toLocaleDateString()}
                {project.endDate && ` → ${new Date(project.endDate).toLocaleDateString()}`}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-steel-400">Progress</span>
                <span className="text-orange-400 font-medium">{project.progress}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-dark-border overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-700" style={{ width: `${project.progress}%` }} />
              </div>
            </div>
            {project.value && (
              <div className="mt-3 pt-3 border-t border-dark-border flex items-center justify-between">
                <span className="text-xs text-steel-500">Contract Value</span>
                <span className="text-xs font-medium text-green-400">{project.currency} {project.value.toLocaleString()}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
