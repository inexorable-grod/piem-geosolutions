import { auth } from '@/lib/auth'
import { MOCK_PROJECTS, MOCK_USERS } from '@/lib/constants'
import {
  FolderKanban, Users, Globe, TrendingUp,
  CheckCircle, Activity
} from 'lucide-react'

export default async function AdminDashboard() {
  const session = await auth()
  const user = session?.user as Record<string, unknown> | undefined

  const stats = [
    {
      label: 'Active Projects',
      value: MOCK_PROJECTS.filter((p) => p.status === 'active').length,
      icon: <Activity size={20} />,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10 border-blue-400/20',
    },
    {
      label: 'Total Users',
      value: MOCK_USERS.length,
      icon: <Users size={20} />,
      color: 'text-orange-400',
      bg: 'bg-orange-400/10 border-orange-400/20',
    },
    {
      label: 'Countries',
      value: 20,
      icon: <Globe size={20} />,
      color: 'text-green-400',
      bg: 'bg-green-400/10 border-green-400/20',
    },
    {
      label: 'Completed',
      value: MOCK_PROJECTS.filter((p) => p.status === 'completed').length,
      icon: <CheckCircle size={20} />,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10 border-emerald-400/20',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-steel-100 mb-1">
          Welcome back, {((user?.name as string) || 'Admin').split(' ')[0]}
        </h1>
        <p className="text-sm text-steel-400 font-body">
          Here&apos;s what&apos;s happening across your projects today.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`p-5 rounded-xl border ${s.bg} bg-dark-card`}>
            <div className={`${s.color} mb-3`}>{s.icon}</div>
            <div className={`font-display text-3xl font-bold ${s.color} mb-1`}>{s.value}</div>
            <p className="text-xs text-steel-400 font-body">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-dark-border flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold text-steel-200 flex items-center gap-2">
            <FolderKanban size={16} className="text-orange-400" />
            Recent Projects
          </h2>
          <a href="/admin/projects" className="text-xs text-orange-400 hover:text-orange-300">View all &rarr;</a>
        </div>
        <div className="divide-y divide-dark-border">
          {MOCK_PROJECTS.map((project) => (
            <div key={project.id} className="px-6 py-4 flex items-center gap-4 hover:bg-dark-surface/50 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-steel-200 truncate">{project.name}</p>
                <p className="text-xs text-steel-500">{project.client} &middot; {project.country}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full bg-dark-border overflow-hidden">
                    <div className="h-full rounded-full bg-orange-400 transition-all duration-500" style={{ width: `${project.progress}%` }} />
                  </div>
                  <span className="text-xs text-steel-400">{project.progress}%</span>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  project.status === 'active' ? 'bg-blue-400/10 text-blue-400 border border-blue-400/20'
                  : project.status === 'completed' ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                  : 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                }`}>{project.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { href: '/admin/projects', label: 'Manage Projects', desc: 'Track all active and completed projects', icon: <FolderKanban size={18} /> },
          { href: '/admin/users', label: 'User Management', desc: 'Add, edit or remove portal users', icon: <Users size={18} /> },
          { href: '/admin/analytics', label: 'Analytics', desc: 'View KPIs and performance metrics', icon: <TrendingUp size={18} /> },
        ].map((item, i) => (
          <a key={i} href={item.href} className="group p-5 rounded-xl border border-dark-border bg-dark-card hover:border-orange-400/30 hover:shadow-orange transition-all duration-300">
            <div className="text-orange-400 mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-sm font-semibold text-steel-200 mb-1 group-hover:text-orange-400 transition-colors">{item.label}</h3>
            <p className="text-xs text-steel-500">{item.desc}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
