'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, LogIn, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { NAV_ITEMS } from '@/lib/constants'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-gold-400/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-gold-400/40 group-hover:ring-gold-400/80 transition-all duration-300">
              <Image
                src="/images/piem-logo-dark.png"
                alt="PIEM GeoSolutions"
                fill
                className="object-contain dark:block hidden"
              />
              <Image
                src="/images/piem-logo-light.png"
                alt="PIEM GeoSolutions"
                fill
                className="object-contain dark:hidden block"
              />
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-sm font-semibold tracking-widest text-gradient-gold uppercase">
                PIEM
              </span>
              <p className="text-xs text-[var(--muted)] tracking-wider -mt-0.5 font-body">
                GeoSolutions
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-body font-medium text-[var(--muted)] hover:text-[var(--gold)] transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {session ? (
              <Link
                href="/admin"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-400/10 border border-gold-400/30 text-gold-400 text-sm font-medium hover:bg-gold-400/20 hover:border-gold-400/60 transition-all duration-300"
              >
                <User size={15} />
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-400 text-steel-900 text-sm font-semibold hover:bg-gold-300 transition-all duration-300 shadow-gold animate-gold-pulse"
              >
                <LogIn size={15} />
                Sign In
              </Link>
            )}

            <button
              className="lg:hidden p-2 text-[var(--muted)] hover:text-[var(--gold)] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass border-t border-gold-400/10 px-4 py-4 space-y-3">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm font-medium text-[var(--muted)] hover:text-[var(--gold)] py-2 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-400 text-steel-900 text-sm font-semibold w-full justify-center mt-2"
          >
            <LogIn size={15} /> Sign In
          </Link>
        </div>
      )}
    </header>
  )
}
