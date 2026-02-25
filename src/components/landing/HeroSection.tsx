'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Globe, Layers, Zap } from 'lucide-react'

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number
    let t = 0

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const lines = 8
      for (let i = 0; i < lines; i++) {
        ctx.beginPath()
        const y = (canvas.height / (lines + 1)) * (i + 1)
        const alpha = 0.04 + (i / lines) * 0.06
        ctx.strokeStyle = `rgba(212,165,32,${alpha})`
        ctx.lineWidth = 1.5
        for (let x = 0; x < canvas.width; x += 2) {
          const freq  = 0.01 + i * 0.003
          const amp   = 12 + i * 4
          const phase = t + i * 0.8
          const yPos  = y + Math.sin(x * freq + phase) * amp * Math.sin(x * 0.002 + t * 0.3)
          x === 0 ? ctx.moveTo(x, yPos) : ctx.lineTo(x, yPos)
        }
        ctx.stroke()
      }
      t += 0.015
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-bg seismic-bg"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="absolute inset-0 bg-dark-mesh pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-400/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-400/30 bg-gold-400/5 text-gold-400 text-xs font-medium tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
          PIEM GeoSolutions &times; Petro-Explorers Joint Venture
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
        >
          Expert Solutions for{' '}
          <span className="text-gradient-gold block mt-1">
            the Hydrocarbon Industry
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-body text-lg text-steel-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Strategic alliance integrating subsurface &amp; surface technologies,
          proprietary AI-powered software, and 20+ years of expertise across 20 countries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#services"
            className="px-8 py-4 rounded-xl bg-gold-400 text-steel-900 font-semibold text-base hover:bg-gold-300 transition-all duration-300 shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5"
          >
            Explore Our Services
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-xl border border-gold-400/40 text-gold-400 font-semibold text-base hover:border-gold-400 hover:bg-gold-400/10 transition-all duration-300"
          >
            Schedule a Consultation
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: <Zap size={18} />, value: '20+', label: 'Years' },
            { icon: <Layers size={18} />, value: '150+', label: 'Projects' },
            { icon: <Globe size={18} />, value: '20', label: 'Countries' },
            { icon: <Globe size={18} />, value: '30+', label: 'Experts' },
          ].map((s, i) => (
            <div key={i} className="glass rounded-xl p-4 text-center border border-gold-400/10">
              <div className="flex justify-center text-gold-400 mb-2">{s.icon}</div>
              <div className="font-display text-2xl font-bold text-gradient-gold">{s.value}</div>
              <div className="text-xs text-steel-400 font-body mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold-400/60"
      >
        <span className="text-xs tracking-widest uppercase font-body">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  )
}
