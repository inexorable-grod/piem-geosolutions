'use client'
import { useTheme as useNextTheme } from 'next-themes'

export function useThemeToggle() {
  const { theme, setTheme, systemTheme } = useNextTheme()

  const currentTheme = theme === 'system' ? systemTheme : theme

  return {
    theme: currentTheme,
    setTheme,
    isDark: currentTheme === 'dark',
    toggle: () => setTheme(currentTheme === 'dark' ? 'light' : 'dark'),
  }
}
