'use client'
import { useEffect, useRef } from 'react'
import { COMPANY_STATS } from '@/lib/constants'

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.15 }
    )
    ref.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-24 lg:py-32 bg-[var(--bg)]" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="section-reveal">
            <span className="inline-block text-orange-400 text-xs tracking-widest uppercase font-medium mb-4 border border-orange-400/30 px-3 py-1 rounded-full">
              Who We Are
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] mb-6 leading-tight">
              Quienes <span className="text-gradient-orange">Somos</span>
            </h2>
            <p className="text-[var(--muted)] font-body leading-relaxed mb-4">
              PIEM Geosolutions LLC and Petro-Explorers have consolidated a strategic alliance
              specialized in advanced reservoir characterization and comprehensive solutions for
              the hydrocarbon industry, combining optimization processes and cutting-edge technologies.
            </p>
            <p className="text-[var(--muted)] font-body leading-relaxed mb-8">
              Our joint venture brings together proprietary software, artificial intelligence,
              and over two decades of on-the-ground experience across Latin America, North America,
              the Middle East, and Southeast Asia.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.piemgeosolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 text-sm font-medium border-b border-orange-400/30 hover:border-orange-400 transition-colors"
              >
                piemgeosolutions.com &rarr;
              </a>
              <a
                href="https://www.petroexplorers.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 text-sm font-medium border-b border-orange-400/30 hover:border-orange-400 transition-colors"
              >
                petroexplorers.com &rarr;
              </a>
            </div>
          </div>

          <div className="section-reveal grid grid-cols-2 gap-4">
            {COMPANY_STATS.map((stat, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-orange-400/40 hover:shadow-orange transition-all duration-400 text-center"
              >
                <div className="font-display text-4xl font-bold text-gradient-orange mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-[var(--muted)] font-body">{stat.label}</div>
                <div className="text-xs text-orange-400/60 font-body italic mt-1">{stat.labelEs}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
