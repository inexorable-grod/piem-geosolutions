'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Layers, TrendingUp, Settings, Database, BarChart2, ArrowRight, X } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { Service } from '@/types'

const ICONS: Record<string, React.ReactNode> = {
  Search:    <Search size={24} />,
  Layers:    <Layers size={24} />,
  TrendingUp:<TrendingUp size={24} />,
  Settings:  <Settings size={24} />,
  Database:  <Database size={24} />,
  BarChart2: <BarChart2 size={24} />,
}

export function ServicesSection() {
  const [selected, setSelected] = useState<Service | null>(null)
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
    <section id="services" className="py-24 lg:py-32 bg-[var(--surface)] relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold-400/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-reveal text-center mb-16">
          <span className="inline-block text-gold-400 text-xs tracking-widest uppercase font-medium mb-4 border border-gold-400/30 px-3 py-1 rounded-full">
            Our Expertise
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] mb-4">
            Comprehensive{' '}
            <span className="text-gradient-gold">Services</span>
          </h2>
          <p className="text-[var(--muted)] max-w-xl mx-auto font-body">
            End-to-end solutions from exploration to production, integrating geoscience, engineering, and AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              className="section-reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                onClick={() => setSelected(service)}
                className="group relative cursor-pointer h-full p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-gold-400/40 hover:shadow-gold transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400/0 to-gold-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 mb-4 group-hover:bg-gold-400/20 group-hover:scale-110 transition-all duration-300">
                  {ICONS[service.icon]}
                </div>

                <h3 className="font-display text-base font-semibold text-[var(--text)] mb-2 group-hover:text-gold-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--muted)] font-body leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="flex items-center gap-1 text-gold-400 text-xs font-medium group-hover:gap-2 transition-all">
                  View details <ArrowRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--card)] border border-gold-400/20 rounded-2xl p-8 max-w-lg w-full shadow-gold-lg"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold-400/10 flex items-center justify-center text-gold-400">
                  {ICONS[selected.icon]}
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <h3 className="font-display text-xl font-bold text-[var(--text)] mb-1">
                {selected.title}
              </h3>
              <p className="text-sm text-gold-400 font-body italic mb-4">{selected.titleEs}</p>
              <p className="text-[var(--muted)] font-body text-sm mb-6">{selected.description}</p>
              <ul className="space-y-2">
                {selected.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--text)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
