interface ReservoirAnalysis {
  projectId: string
  reservoirType: string
  estimatedReserves: { oil: number; gas: number; unit: string }
  confidence: number
  nextSteps: string[]
  timestamp: string
}

export class ReservoirAnalyzerAgent {
  async analyze(projectId: string, data: Record<string, unknown>): Promise<ReservoirAnalysis> {
    const lithology = (data.lithology as string) || 'sandstone'
    const porosity = (data.porosity as number) || 0.15
    const permeability = (data.permeability as number) || 100
    const netPay = (data.netPay as number) || 20
    const area = (data.area as number) || 1000

    const oilFactor = porosity * netPay * area * 7758 * 0.6
    const gasFactor = porosity * netPay * area * 43560 * 0.7

    const confidence = this.calculateConfidence(data)

    const nextSteps: string[] = []
    if (porosity < 0.1) nextSteps.push('Recommend additional core analysis for porosity validation')
    if (permeability < 50) nextSteps.push('Consider well testing for permeability confirmation')
    if (confidence < 0.7) nextSteps.push('Additional seismic data recommended for model improvement')
    if (!data.pvtData) nextSteps.push('PVT analysis required for fluid characterization')
    nextSteps.push('Update static model with latest well data')

    return {
      projectId,
      reservoirType: lithology,
      estimatedReserves: {
        oil: Math.round(oilFactor / 1000),
        gas: Math.round(gasFactor / 1000),
        unit: 'MMboe',
      },
      confidence,
      nextSteps,
      timestamp: new Date().toISOString(),
    }
  }

  private calculateConfidence(data: Record<string, unknown>): number {
    let score = 0.5
    if (data.seismicData) score += 0.1
    if (data.wellLogs) score += 0.1
    if (data.coreData) score += 0.1
    if (data.pvtData) score += 0.1
    if (data.productionHistory) score += 0.1
    return Math.min(score, 1.0)
  }
}
