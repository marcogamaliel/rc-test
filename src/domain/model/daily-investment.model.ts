export type DailyInvestment = {
  contributions: number
  dailyReturn: number
  date: {seconds: number, nanoseconds: number}
  portfolioIndex: number
  portfolioValue: number
}