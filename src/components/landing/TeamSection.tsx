'use client'
import { TEAM_DEPARTMENTS } from '@/lib/constants'

export function TeamSection() {
  return (
    <section id="team" className="py-24 lg:py-32 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-gold-400 text-xs tracking-widest uppercase font-medium mb-4 border border-gold-400/30 px-3 py-1 rounded-full">
            Expert Team
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] mb-4">
            Nuestro <span className="text-gradient-gold">Equipo</span>
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto font-body">
            +20 years integrating geoscience, engineering &amp; technology to maximize your assets.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM_DEPARTMENTS.map((dept) => (
            <div
              key={dept.id}
              className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-gold-400/40 hover:shadow-gold transition-all duration-300"
            >
              <div
                className="w-2 h-8 rounded-full mb-4"
                style={{ backgroundColor: dept.color }}
              />
              <h3 className="font-display text-base font-semibold text-[var(--text)] mb-3 group-hover:text-gold-400 transition-colors">
                {dept.name}
              </h3>
              <ul className="space-y-1.5">
                {dept.members.map((m, i) => (
                  <li key={i} className="text-sm text-[var(--muted)] font-body flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold-400/50 flex-shrink-0" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
