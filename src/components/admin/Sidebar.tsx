'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, FolderKanban, Settings,
  Globe, BarChart3, Briefcase, ChevronRight, Layers
} from 'lucide-react'

const ADMIN_NAV = [
  { href: '/admin',           label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/admin/projects',  label: 'Projects',   icon: FolderKanban },
  { href: '/admin/services',  label: 'Services',   icon: Briefcase },
  { href: '/admin/clients',   label: 'Clients',    icon: Globe },
  { href: '/admin/analytics', label: 'Analytics',  icon: BarChart3 },
  { href: '/admin/users',     label: 'Users',      icon: Users },
  { href: '/admin/settings',  label: 'Settings',   icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex w-60 flex-shrink-0 flex-col bg-dark-surface border-r border-dark-border">
      <div className="flex items-center gap-3 px-5 py-6 border-b border-dark-border">
        <div className="w-8 h-8 rounded-lg bg-orange-400/10 border border-orange-400/30 flex items-center justify-center">
          <Layers size={16} className="text-orange-400" />
        </div>
        <div>
          <p className="font-display text-sm font-bold text-gradient-orange">PIEM Admin</p>
          <p className="text-xs text-steel-500">GeoSolutions</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {ADMIN_NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                active
                  ? 'bg-orange-400/10 text-orange-400 border border-orange-400/20'
                  : 'text-steel-400 hover:bg-dark-card hover:text-steel-200'
              }`}
            >
              <Icon size={16} className={active ? 'text-orange-400' : 'text-steel-500 group-hover:text-steel-300'} />
              {label}
              {active && <ChevronRight size={12} className="ml-auto" />}
            </Link>
          )
        })}
      </nav>

      <div className="px-5 py-4 border-t border-dark-border">
        <p className="text-xs text-steel-600">PIEM GeoSolutions &copy; 2025</p>
      </div>
    </aside>
  )
}
