'use client'
import { useEffect, useRef } from 'react'
import { TECH_PARTNERS } from '@/lib/constants'

export function TechnologySection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="technology" className="py-24 lg:py-32 bg-[var(--bg)] relative overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-reveal text-center mb-16">
          <span className="inline-block text-gold-400 text-xs tracking-widest uppercase font-medium mb-4 border border-gold-400/30 px-3 py-1 rounded-full">
            Software &amp; Alliances
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] mb-4">
            Software In-House &amp;{' '}
            <span className="text-gradient-gold">Technology Partnerships</span>
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto font-body">
            100% proprietary tools combined with global technology leaders for precise, reliable results.
          </p>
        </div>

        <div className="section-reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {TECH_PARTNERS.map((tech, i) => (
            <div
              key={i}
              className="group p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-gold-400/40 hover:shadow-gold transition-all duration-300 text-center"
            >
              <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mb-3 ${
                tech.type === 'in-house'
                  ? 'bg-gold-400/20 text-gold-400 border border-gold-400/30'
                  : 'bg-steel-600/30 text-steel-300 border border-steel-600/30'
              }`}>
                {tech.type === 'in-house' ? '\u2605 In-House' : 'Partner'}
              </div>
              <h3 className="font-display text-base font-semibold text-[var(--text)] group-hover:text-gold-400 transition-colors mb-1">
                {tech.name}
              </h3>
              <p className="text-xs text-[var(--muted)] font-body">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
