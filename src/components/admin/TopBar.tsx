'use client'
import { signOut, useSession } from 'next-auth/react'
import { Bell, LogOut, User } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import Link from 'next/link'

export function AdminTopBar() {
  const { data: session } = useSession()
  const user = session?.user as Record<string, unknown> | undefined

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-dark-border bg-dark-surface flex-shrink-0">
      <div className="flex items-center gap-3">
        <Link href="/" className="lg:hidden font-display text-sm font-bold text-gradient-orange">
          PIEM
        </Link>
        <div className="hidden lg:block">
          <h1 className="text-sm font-semibold text-steel-200">Administration Panel</h1>
          <p className="text-xs text-steel-500">PIEM GeoSolutions &times; Petro-Explorers</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button className="relative p-2 rounded-lg text-steel-400 hover:text-steel-200 hover:bg-dark-card transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-orange-400" />
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-dark-border">
          <div className="w-8 h-8 rounded-full bg-orange-400/20 border border-orange-400/30 flex items-center justify-center">
            <User size={14} className="text-orange-400" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-steel-200">{(user?.name as string) || 'Admin'}</p>
            <p className="text-xs text-steel-500 capitalize">{(user?.role as string) || 'admin'}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="ml-2 p-1.5 rounded-lg text-steel-500 hover:text-red-400 hover:bg-red-400/10 transition-all"
            title="Sign out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </header>
  )
}
