interface SecurityEvent {
  type: string
  user: string
  ip: string
  timestamp: string
  details?: string
}

export class SecurityMonitorAgent {
  private events: SecurityEvent[] = []
  private readonly MAX_FAILED_ATTEMPTS = 5
  private readonly BLOCK_WINDOW_MINUTES = 15

  logEvent(type: string, user: string, ip: string, details?: string): void {
    this.events.push({
      type,
      user,
      ip,
      timestamp: new Date().toISOString(),
      details,
    })

    if (this.events.length > 1000) {
      this.events = this.events.slice(-500)
    }
  }

  getFailedAttempts(email: string, windowMinutes: number = this.BLOCK_WINDOW_MINUTES): number {
    const cutoff = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString()

    return this.events.filter(
      (e) =>
        e.type === 'login_failed' &&
        e.user.toLowerCase() === email.toLowerCase() &&
        e.timestamp >= cutoff
    ).length
  }

  isBlocked(email: string): boolean {
    return this.getFailedAttempts(email) >= this.MAX_FAILED_ATTEMPTS
  }

  getRecentEvents(limit: number = 50): SecurityEvent[] {
    return this.events.slice(-limit).reverse()
  }

  getEventsByUser(email: string): SecurityEvent[] {
    return this.events
      .filter((e) => e.user.toLowerCase() === email.toLowerCase())
      .reverse()
  }

  getSuspiciousActivity(): SecurityEvent[] {
    const ipAttempts: Record<string, number> = {}
    const cutoff = new Date(Date.now() - 60 * 60 * 1000).toISOString()

    this.events
      .filter((e) => e.type === 'login_failed' && e.timestamp >= cutoff)
      .forEach((e) => {
        ipAttempts[e.ip] = (ipAttempts[e.ip] || 0) + 1
      })

    return this.events.filter(
      (e) => e.type === 'login_failed' && (ipAttempts[e.ip] || 0) >= 3
    )
  }

  clearEvents(): void {
    this.events = []
  }
}

export const securityMonitor = new SecurityMonitorAgent()
