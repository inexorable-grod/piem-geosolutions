'use client'
import { useState } from 'react'
import { SERVICES } from '@/lib/constants'
import { Service } from '@/types'
import { Eye, EyeOff, Search, Layers, TrendingUp, Settings, Database, BarChart2 } from 'lucide-react'
import { Search as SearchIcon } from 'lucide-react'

const ICONS: Record<string, React.ReactNode> = {
  Search:    <SearchIcon size={20} />,
  Layers:    <Layers size={20} />,
  TrendingUp:<TrendingUp size={20} />,
  Settings:  <Settings size={20} />,
  Database:  <Database size={20} />,
  BarChart2: <BarChart2 size={20} />,
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(SERVICES)
  const [search, setSearch] = useState('')

  const toggleVisibility = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isVisible: !s.isVisible } : s))
    )
  }

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-steel-100">Services CMS</h1>
          <p className="text-sm text-steel-400 mt-1">Manage which services appear on the landing page</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-dark-card border border-dark-border text-steel-200 text-sm focus:outline-none focus:border-orange-400/50 transition-colors placeholder:text-steel-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((service) => (
          <div
            key={service.id}
            className={`p-5 rounded-xl border bg-dark-card transition-all duration-300 ${
              service.isVisible ? 'border-orange-400/20' : 'border-dark-border opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-400/10 border border-orange-400/20 flex items-center justify-center text-orange-400">
                  {ICONS[service.icon]}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-steel-100">{service.title}</h3>
                  <p className="text-xs text-orange-400/60 italic">{service.titleEs}</p>
                </div>
              </div>
              <button
                onClick={() => toggleVisibility(service.id)}
                className={`p-2 rounded-lg transition-all ${
                  service.isVisible
                    ? 'text-orange-400 hover:bg-orange-400/10'
                    : 'text-steel-500 hover:bg-steel-500/10'
                }`}
                title={service.isVisible ? 'Hide from landing page' : 'Show on landing page'}
              >
                {service.isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>

            <p className="text-xs text-steel-400 mb-3">{service.description}</p>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-400/10 text-orange-400 border border-orange-400/20">
                {service.category.replace('_', ' ')}
              </span>
              <span className="text-xs text-steel-500">{service.features.length} features</span>
            </div>

            <ul className="space-y-1">
              {service.features.map((f, i) => (
                <li key={i} className="text-xs text-steel-400 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-orange-400/40 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
