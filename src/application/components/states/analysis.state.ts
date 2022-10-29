import { atom } from 'recoil'
import { AnalysisFilter } from '../../../domain/model/analysis-filter.model'

export const movingAverages = atom<AnalysisFilter>({
  key: 'movingAverages',
  default: {
    ma4IsActive: false,
    ma10IsActive: false,
    bollingerIsActive: false,
  },
})
