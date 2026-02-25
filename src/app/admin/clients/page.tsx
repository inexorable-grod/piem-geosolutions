'use client'
import { useState } from 'react'
import { Search, Globe, Building2, FolderKanban } from 'lucide-react'

const CLIENTS_DATA = [
  { id: 'c1', name: 'Canacol Energy', country: 'Colombia', sector: 'E&P', projectCount: 8, since: '2018' },
  { id: 'c2', name: 'PDVSA', country: 'Venezuela', sector: 'NOC', projectCount: 12, since: '2015' },
  { id: 'c3', name: 'Parex Resources', country: 'Colombia', sector: 'E&P', projectCount: 6, since: '2019' },
  { id: 'c4', name: 'Teine Energy', country: 'Canada', sector: 'E&P', projectCount: 4, since: '2020' },
  { id: 'c5', name: 'TOTAL', country: 'France', sector: 'Major', projectCount: 5, since: '2017' },
  { id: 'c6', name: 'Oil India Limited', country: 'India', sector: 'NOC', projectCount: 3, since: '2021' },
  { id: 'c7', name: 'Murphy Oil Corp', country: 'USA', sector: 'E&P', projectCount: 7, since: '2016' },
  { id: 'c8', name: 'CEPSA', country: 'Spain', sector: 'E&P', projectCount: 4, since: '2019' },
  { id: 'c9', name: 'WesternZagros', country: 'Iraq', sector: 'E&P', projectCount: 3, since: '2018' },
  { id: 'c10', name: 'PETROCHAD', country: 'Chad', sector: 'NOC', projectCount: 2, since: '2022' },
  { id: 'c11', name: 'Strath Resources', country: 'Canada', sector: 'E&P', projectCount: 5, since: '2017' },
  { id: 'c12', name: 'KNOC', country: 'South Korea', sector: 'NOC', projectCount: 3, since: '2020' },
]

const SECTOR_COLORS: Record<string, string> = {
  'E&P': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'NOC': 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  'Major': 'text-green-400 bg-green-400/10 border-green-400/20',
}

export default function ClientsPage() {
  const [search, setSearch] = useState('')

  const filtered = CLIENTS_DATA.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase()) ||
      c.sector.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-steel-100">Clients &amp; Partners</h1>
        <p className="text-sm text-steel-400 mt-1">{CLIENTS_DATA.length} companies across 20 countries</p>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search clients..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-dark-card border border-dark-border text-steel-200 text-sm focus:outline-none focus:border-orange-400/50 transition-colors placeholder:text-steel-500"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="p-5 rounded-xl border border-dark-border bg-dark-card hover:border-orange-400/30 hover:shadow-orange transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-orange-400/10 border border-orange-400/20 flex items-center justify-center">
                <Building2 size={18} className="text-orange-400" />
              </div>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${SECTOR_COLORS[client.sector] || 'text-steel-400 bg-steel-400/10 border-steel-400/20'}`}>
                {client.sector}
              </span>
            </div>

            <h3 className="text-sm font-semibold text-steel-100 mb-1">{client.name}</h3>

            <div className="space-y-1.5 mt-3">
              <div className="flex items-center gap-1.5 text-xs text-steel-400">
                <Globe size={12} className="text-orange-400" />
                {client.country}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-steel-400">
                <FolderKanban size={12} className="text-orange-400" />
                {client.projectCount} projects
              </div>
              <p className="text-xs text-steel-500">Client since {client.since}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
