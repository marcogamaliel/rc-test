import { InvestmentEvolutionPoints } from '../model/investment-evolution-points.model'
import { Period } from '../model/types/period.type'

export abstract class FilterInvesmentDataByPeriodService {
  static execute(
    period: Period,
    investmentEvolution: InvestmentEvolutionPoints,
  ): InvestmentEvolutionPoints {
    const index = this.selectIndexFrom(period, investmentEvolution)
    return {
      contributions: investmentEvolution.contributions.slice(-index),
      dailyReturns: investmentEvolution.dailyReturns.slice(-index),
      portfolioIndexes: investmentEvolution.portfolioIndexes.slice(-index),
      portfolioValues: investmentEvolution.portfolioValues.slice(-index),
    }
  }

  private static selectIndexFrom(period: Period, investmentEvolution: InvestmentEvolutionPoints): number {
    switch (period) {
      case '5D': return 5
      case '1M': return this.getIndexOf1M()
      case '12M': return this.getIndexOf12M(investmentEvolution)
      default: throw new Error('Invalid period')
    }
  }

  private static getIndexOf1M(): number {
    // should get the data from the last months, for test purpose this is not implemented
    return 20
  }

  private static getIndexOf12M(investmentEvolution: InvestmentEvolutionPoints): number {
    return investmentEvolution.contributions.length
  }
}
