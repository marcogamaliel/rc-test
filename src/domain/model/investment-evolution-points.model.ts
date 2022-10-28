import { PointChart } from "./point-chart.model"

export type InvestmentEvolutionPoints = {
  contributions: PointChart[],
  dailyReturns: PointChart[],
  portfolioIndexes: PointChart[],
  portfolioValues: PointChart[],
}