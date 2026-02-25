'use client'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative w-9 h-9 flex items-center justify-center rounded-full border border-gold-400/30 bg-transparent hover:border-gold-400/60 hover:bg-gold-400/10 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <Sun className="absolute w-4 h-4 text-gold-400 transition-all duration-300 opacity-0 rotate-90 scale-0 dark:opacity-0 [html:not(.dark)_&]:opacity-100 [html:not(.dark)_&]:rotate-0 [html:not(.dark)_&]:scale-100" />
      <Moon className="absolute w-4 h-4 text-gold-400 transition-all duration-300 opacity-0 rotate-0 scale-0 dark:opacity-100 dark:rotate-0 dark:scale-100" />
    </button>
  )
}
