import { DailyInvestment } from "../../model/daily-investment.model"
import { PointChart } from "../../model/point-chart.model"

export function invesmentEvolutionProcessorService(investmentEvolution: DailyInvestment[]): {
  contributions: PointChart[],
  dailyReturns: PointChart[],
  portfolioIndexs: PointChart[],
  portfolioValues: PointChart[],
} {
  const contributions: PointChart[] = []
  const dailyReturns: PointChart[] = []
  const portfolioIndexs: PointChart[] = []
  const portfolioValues: PointChart[] = []
  investmentEvolution.forEach(reg => {
    const date = reg.date.seconds * 1000
    contributions.push({x: date, y: reg.contributions})
    dailyReturns.push({x: date, y: reg.dailyReturn})
    portfolioIndexs.push({x: date, y: reg.portfolioIndex})
    portfolioValues.push({x: date, y: reg.portfolioValue})
  })
  return {
    contributions,
    dailyReturns,
    portfolioIndexs,
    portfolioValues,
  }
}
