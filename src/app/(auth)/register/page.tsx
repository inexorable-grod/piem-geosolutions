'use client'
import { useState } from 'react'
import Link from 'next/link'
import { UserPlus, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg seismic-bg px-4">
      <div className="absolute inset-0 bg-dark-mesh pointer-events-none" />
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="font-display text-3xl font-bold text-gradient-gold mb-1">PIEM</div>
          <p className="text-xs text-steel-400 tracking-widest uppercase">Access Request</p>
        </div>
        <div className="glass rounded-2xl p-8 border border-gold-400/15 shadow-gold">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="text-gold-400 mx-auto mb-4" />
              <h2 className="font-display text-lg font-semibold text-white mb-2">Request Submitted</h2>
              <p className="text-sm text-steel-400 font-body mb-6">
                An administrator will review your request and send you access credentials within 24 hours.
              </p>
              <Link href="/login" className="text-gold-400 hover:text-gold-300 text-sm">
                &larr; Back to login
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-display text-xl font-semibold text-white mb-1">Request Access</h1>
              <p className="text-sm text-steel-400 font-body mb-8">
                Fill out this form to request a portal account. An admin will review your request.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Mar\u00eda Gonz\u00e1lez' },
                  { label: 'Email', name: 'email', type: 'email', placeholder: 'you@company.com' },
                  { label: 'Company', name: 'company', type: 'text', placeholder: 'Canacol Energy' },
                  { label: 'Country', name: 'country', type: 'text', placeholder: 'Colombia' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs text-steel-400 font-medium uppercase tracking-wide mb-1.5">
                      {field.label}
                    </label>
                    <input
                      required
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-dark-border text-white text-sm font-body focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20 transition-colors placeholder:text-steel-500"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs text-steel-400 font-medium uppercase tracking-wide mb-1.5">
                    Purpose / Role Requested
                  </label>
                  <select
                    name="role"
                    className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-dark-border text-white text-sm font-body focus:outline-none focus:border-gold-400/60 transition-colors"
                  >
                    <option value="viewer">Client / Viewer</option>
                    <option value="analyst">Analyst</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-gold-400 text-steel-900 font-semibold text-sm hover:bg-gold-300 transition-all disabled:opacity-60 shadow-gold mt-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-steel-900/40 border-t-steel-900 rounded-full animate-spin" />
                  ) : (
                    <UserPlus size={16} />
                  )}
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
              <p className="text-center mt-5 text-sm text-steel-500">
                Already have access?{' '}
                <Link href="/login" className="text-gold-400 hover:text-gold-300">
                  Sign In
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
