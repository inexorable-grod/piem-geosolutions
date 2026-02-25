'use client'
import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const params = useSearchParams()
  const callbackUrl = params.get('callbackUrl') || '/admin'
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd]   = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    setLoading(false)
    if (result?.error) {
      setError('Invalid email or password. Please try again.')
    } else {
      router.push(callbackUrl)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg seismic-bg px-4">
      <div className="absolute inset-0 bg-dark-mesh pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-10">
          <div className="font-display text-3xl font-bold text-gradient-gold mb-1">PIEM</div>
          <p className="text-xs text-steel-400 tracking-widest uppercase">GeoSolutions Admin</p>
        </div>

        <div className="glass rounded-2xl p-8 border border-gold-400/15 shadow-gold">
          <h1 className="font-display text-xl font-semibold text-white mb-1">Sign In</h1>
          <p className="text-sm text-steel-400 font-body mb-8">Access the administration panel</p>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm mb-6">
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs text-steel-400 font-medium uppercase tracking-wide mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-dark-border text-white text-sm font-body focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20 transition-colors placeholder:text-steel-500"
                placeholder="you@piemgeosolutions.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-xs text-steel-400 font-medium uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-lg bg-dark-surface border border-dark-border text-white text-sm font-body focus:outline-none focus:border-gold-400/60 focus:ring-1 focus:ring-gold-400/20 transition-colors placeholder:text-steel-500"
                  placeholder="••••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-500 hover:text-steel-300 transition-colors"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-gold-400 text-steel-900 font-semibold text-sm hover:bg-gold-300 transition-all duration-300 disabled:opacity-60 shadow-gold"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-steel-900/40 border-t-steel-900 rounded-full animate-spin" />
              ) : (
                <LogIn size={16} />
              )}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-dark-border flex items-center justify-between text-sm">
            <Link href="/" className="text-steel-400 hover:text-gold-400 transition-colors">
              &larr; Back to site
            </Link>
            <Link href="/register" className="text-gold-400 hover:text-gold-300 transition-colors">
              Request access &rarr;
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-steel-600 mt-6 font-body">
          Demo: admin@piemgeosolutions.com / Admin@PIEM2024!
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
