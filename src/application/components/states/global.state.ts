import { atom } from 'recoil'
import { InvestmentEvolutionPoints } from '../../../domain/model/investment-evolution-points.model'

export const investmentEvolutionPoints = atom<InvestmentEvolutionPoints>({
  key: 'investmentEvolutionPoints',
  default: {
    contributions: [],
    dailyReturns: [],
    portfolioIndexes: [],
    portfolioValues: [],
  },
})

export const usernameAtom = atom<string>({
  key: 'username',
  default: 'user1',
})
