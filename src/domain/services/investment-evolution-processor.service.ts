import { DailyInvestment } from '../model/daily-investment.model'
import { InvestmentEvolutionPoints } from '../model/investment-evolution-points.model'
import { PointChart } from '../model/point-chart.model'

export function invesmentEvolutionProcessorService(investmentEvolution: DailyInvestment[]): InvestmentEvolutionPoints {
  const contributions: PointChart[] = []
  const dailyReturns: PointChart[] = []
  const portfolioIndexes: PointChart[] = []
  const portfolioValues: PointChart[] = []
  investmentEvolution.forEach((reg) => {
    const date = reg.date.seconds * 1000
    contributions.push({ x: date, y: reg.contributions })
    dailyReturns.push({ x: date, y: reg.dailyReturn })
    portfolioIndexes.push({ x: date, y: reg.portfolioIndex })
    portfolioValues.push({ x: date, y: reg.portfolioValue })
  })
  return {
    contributions,
    dailyReturns,
    portfolioIndexes,
    portfolioValues,
  }
}
