'use client'
import { useState } from 'react'
import { Mail, Phone, Globe, MapPin, Send, CheckCircle } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'

export function ContactSection() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[var(--surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-orange-400 text-xs tracking-widest uppercase font-medium mb-4 border border-orange-400/30 px-3 py-1 rounded-full">
            Contact
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text)] mb-4">
            Ready to Optimize{' '}
            <span className="text-gradient-orange">Your Project?</span>
          </h2>
          <p className="text-[var(--muted)] max-w-lg mx-auto font-body">
            Schedule a no-commitment consultation with our experts. Technology proven in 20 countries.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            {[CONTACT_INFO.piem, CONTACT_INFO.petro].map((company, i) => (
              <div key={i} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-orange-400/30 transition-all">
                <h3 className="font-display text-base font-semibold text-[var(--text)] mb-4">
                  {company.name}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin size={15} className="text-orange-400 mt-0.5 flex-shrink-0" />
                    <span className="text-[var(--muted)] font-body">{company.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={15} className="text-orange-400 flex-shrink-0" />
                    <span className="text-[var(--muted)] font-body">{company.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe size={15} className="text-orange-400 flex-shrink-0" />
                    <a
                      href={`https://${company.website}`}
                      className="text-orange-400 hover:underline font-body"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {company.website}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-12">
                <CheckCircle size={48} className="text-orange-400" />
                <h3 className="font-display text-xl font-semibold text-[var(--text)]">Message Sent!</h3>
                <p className="text-[var(--muted)] font-body text-sm">
                  Our team will contact you within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  {['Name', 'Company'].map((field) => (
                    <div key={field}>
                      <label className="block text-xs text-[var(--muted)] font-medium mb-1.5 uppercase tracking-wide">
                        {field}
                      </label>
                      <input
                        required
                        name={field.toLowerCase()}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm font-body focus:outline-none focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/30 transition-colors placeholder:text-[var(--muted)]"
                        placeholder={`Your ${field.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs text-[var(--muted)] font-medium mb-1.5 uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm font-body focus:outline-none focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/30 transition-colors placeholder:text-[var(--muted)]"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[var(--muted)] font-medium mb-1.5 uppercase tracking-wide">
                    Service Interest
                  </label>
                  <select
                    name="service"
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm font-body focus:outline-none focus:border-orange-400/60 transition-colors"
                  >
                    <option value="">Select a service...</option>
                    <option>Exploration &amp; Reservoir Characterization</option>
                    <option>Modeling &amp; Simulation</option>
                    <option>Production Optimization</option>
                    <option>Surface Facilities &amp; EPC</option>
                    <option>Data Management &amp; AI</option>
                    <option>Economic Evaluation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[var(--muted)] font-medium mb-1.5 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm font-body focus:outline-none focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/30 transition-colors placeholder:text-[var(--muted)] resize-none"
                    placeholder="Describe your project or inquiry..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-orange-400 text-steel-900 font-semibold text-sm hover:bg-orange-300 transition-all duration-300 disabled:opacity-60 shadow-orange hover:shadow-orange-lg"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-steel-900/40 border-t-steel-900 rounded-full animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
