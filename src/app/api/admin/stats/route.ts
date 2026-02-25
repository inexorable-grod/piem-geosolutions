import { auth } from '@/lib/auth'
import { MOCK_PROJECTS, MOCK_USERS } from '@/lib/constants'
import { DashboardStats } from '@/types'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const stats: DashboardStats = {
    totalProjects: MOCK_PROJECTS.length,
    activeProjects: MOCK_PROJECTS.filter((p) => p.status === 'active').length,
    totalClients: 30,
    countriesCount: 20,
    teamSize: 30,
    completedProjects: MOCK_PROJECTS.filter((p) => p.status === 'completed').length,
    projectsThisYear: MOCK_PROJECTS.filter((p) => p.startDate.startsWith('2024')).length,
    revenueGrowth: 22,
  }

  return NextResponse.json(stats)
}
