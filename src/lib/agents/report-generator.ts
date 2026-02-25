import { MOCK_PROJECTS, MOCK_USERS } from '@/lib/constants'

interface ReportSection {
  title: string
  content: string
}

interface Report {
  title: string
  generatedAt: string
  sections: ReportSection[]
}

export class ReportGeneratorAgent {
  generateProjectSummary(projectId: string): Report {
    const project = MOCK_PROJECTS.find((p) => p.id === projectId)
    if (!project) {
      return {
        title: 'Project Not Found',
        generatedAt: new Date().toISOString(),
        sections: [{ title: 'Error', content: `No project found with ID: ${projectId}` }],
      }
    }

    return {
      title: `Project Summary: ${project.name}`,
      generatedAt: new Date().toISOString(),
      sections: [
        {
          title: 'Overview',
          content: `${project.name} is a ${project.type.replace(/_/g, ' ')} project for ${project.client} in ${project.country}. Current status: ${project.status}, progress: ${project.progress}%.`,
        },
        {
          title: 'Team',
          content: `Assigned team members: ${project.team.join(', ')}`,
        },
        {
          title: 'Timeline',
          content: `Started: ${project.startDate}${project.endDate ? `, Completed: ${project.endDate}` : ', Ongoing'}`,
        },
        {
          title: 'Financial',
          content: project.value
            ? `Contract value: ${project.currency} ${project.value.toLocaleString()}`
            : 'Financial details not available',
        },
        {
          title: 'Description',
          content: project.description,
        },
      ],
    }
  }

  generateClientReport(clientName: string): Report {
    const clientProjects = MOCK_PROJECTS.filter(
      (p) => p.client.toLowerCase() === clientName.toLowerCase()
    )

    return {
      title: `Client Report: ${clientName}`,
      generatedAt: new Date().toISOString(),
      sections: [
        {
          title: 'Summary',
          content: `${clientName} has ${clientProjects.length} project(s) with PIEM GeoSolutions.`,
        },
        {
          title: 'Active Projects',
          content: clientProjects
            .filter((p) => p.status === 'active')
            .map((p) => `- ${p.name} (${p.progress}% complete)`)
            .join('\n') || 'No active projects',
        },
        {
          title: 'Completed Projects',
          content: clientProjects
            .filter((p) => p.status === 'completed')
            .map((p) => `- ${p.name}`)
            .join('\n') || 'No completed projects',
        },
        {
          title: 'Total Investment',
          content: `USD ${clientProjects.reduce((sum, p) => sum + (p.value || 0), 0).toLocaleString()}`,
        },
      ],
    }
  }

  exportToHTML(data: Record<string, unknown>): string {
    const title = (data.title as string) || 'PIEM GeoSolutions Report'
    const sections = (data.sections as ReportSection[]) || []

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: 'Outfit', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #333; }
    h1 { color: #d4a520; border-bottom: 2px solid #d4a520; padding-bottom: 10px; }
    h2 { color: #495057; margin-top: 30px; }
    .meta { color: #868e96; font-size: 0.85em; margin-bottom: 30px; }
    .section { margin-bottom: 20px; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <p class="meta">Generated: ${new Date().toLocaleString()}</p>
  ${sections.map((s) => `<div class="section"><h2>${s.title}</h2><p>${s.content}</p></div>`).join('')}
  <hr>
  <p class="meta">PIEM GeoSolutions LLC &amp; Petro-Explorers Inc.</p>
</body>
</html>`
  }
}
