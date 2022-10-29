import { DailyInvestment } from "../model/daily-investment.model"

export function calcRentability(invesment?: DailyInvestment): number | undefined {
  if(!invesment) return undefined
  return ((invesment.portfolioValue - invesment.contributions) / invesment.contributions) * 100
}