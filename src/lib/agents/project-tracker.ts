import { Project } from '@/types'

interface ProjectHealth {
  projectId: string
  status: 'healthy' | 'at_risk' | 'critical'
  score: number
  issues: string[]
}

export class ProjectTrackerAgent {
  checkDeadlines(projects: Project[]): { overdue: Project[]; dueSoon: Project[] } {
    const now = new Date()
    const twoWeeksFromNow = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)

    const overdue = projects.filter((p) => {
      if (p.status === 'completed') return false
      if (!p.endDate) return false
      return new Date(p.endDate) < now
    })

    const dueSoon = projects.filter((p) => {
      if (p.status === 'completed') return false
      if (!p.endDate) return false
      const endDate = new Date(p.endDate)
      return endDate >= now && endDate <= twoWeeksFromNow
    })

    return { overdue, dueSoon }
  }

  getOverdueProjects(projects: Project[]): Project[] {
    return this.checkDeadlines(projects).overdue
  }

  calculateProjectHealth(project: Project): ProjectHealth {
    const issues: string[] = []
    let score = 100

    if (project.status === 'active') {
      const startDate = new Date(project.startDate)
      const now = new Date()
      const monthsElapsed = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
      const expectedProgress = Math.min((monthsElapsed / 12) * 100, 100)

      if (project.progress < expectedProgress * 0.7) {
        score -= 30
        issues.push(`Progress behind schedule (${project.progress}% vs expected ${Math.round(expectedProgress)}%)`)
      }

      if (project.team.length < 2) {
        score -= 15
        issues.push('Understaffed: less than 2 team members assigned')
      }

      if (project.endDate) {
        const daysUntilDeadline = (new Date(project.endDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        if (daysUntilDeadline < 0) {
          score -= 40
          issues.push('Project is past its deadline')
        } else if (daysUntilDeadline < 30) {
          score -= 15
          issues.push('Deadline approaching within 30 days')
        }
      }
    }

    const status = score >= 70 ? 'healthy' : score >= 40 ? 'at_risk' : 'critical'

    return {
      projectId: project.id,
      status,
      score: Math.max(score, 0),
      issues,
    }
  }
}
