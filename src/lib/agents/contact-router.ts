interface ContactRouteResult {
  email: string
  department: string
  priority: 'normal' | 'high' | 'urgent'
  autoResponse: string
}

export class ContactRouterAgent {
  private readonly routing: Record<string, { email: string; department: string }> = {
    exploration: {
      email: 'geology@piemgeosolutions.com',
      department: 'Geology & Exploration',
    },
    modeling: {
      email: 'simulation@piemgeosolutions.com',
      department: 'Modeling & Simulation',
    },
    production_optimization: {
      email: 'production@piemgeosolutions.com',
      department: 'Production Engineering',
    },
    surface: {
      email: 'facilities@petroexplorers.com',
      department: 'Surface Facilities & EPC',
    },
    data: {
      email: 'datatech@piemgeosolutions.com',
      department: 'Data Management & Technology',
    },
    economic: {
      email: 'economics@piemgeosolutions.com',
      department: 'Economic Evaluation',
    },
  }

  private readonly URGENT_KEYWORDS = ['urgent', 'emergency', 'critical', 'asap', 'immediately']
  private readonly HIGH_PRIORITY_KEYWORDS = ['deadline', 'soon', 'priority', 'important', 'tender']

  route(serviceType: string, message: string): ContactRouteResult {
    const route = this.routing[serviceType] || {
      email: 'info@piemgeosolutions.com',
      department: 'General Inquiries',
    }

    const priority = this.determinePriority(message)

    return {
      email: route.email,
      department: route.department,
      priority,
      autoResponse: this.generateAutoResponse(route.department, priority),
    }
  }

  private determinePriority(message: string): 'normal' | 'high' | 'urgent' {
    const lowerMessage = message.toLowerCase()

    if (this.URGENT_KEYWORDS.some((kw) => lowerMessage.includes(kw))) {
      return 'urgent'
    }
    if (this.HIGH_PRIORITY_KEYWORDS.some((kw) => lowerMessage.includes(kw))) {
      return 'high'
    }
    return 'normal'
  }

  private generateAutoResponse(department: string, priority: string): string {
    const timeframe = priority === 'urgent' ? '4 hours' : priority === 'high' ? '12 hours' : '24 business hours'

    return `Thank you for contacting PIEM GeoSolutions. Your inquiry has been routed to our ${department} team. A specialist will respond within ${timeframe}. For immediate assistance, please call +58 212 265 5321.`
  }
}
