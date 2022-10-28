import { atom } from 'recoil'
import { Period } from '../../../domain/model/types/period.type'

export const dashboardSelectedPeriod = atom<Period>({
  key: 'dashboardSelectedPeriod',
  default: '12M',
})
