import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../db/firebase'
import { DailyInvestment } from '../../model/daily-investment.model'

export abstract class InvestmentEvolutionRepository {
  public static async getByUser(user: string): Promise<DailyInvestment[]> {
    const docRef = doc(db, 'investmentEvolutions', user)
    const document = await getDoc(docRef)
    const data = document.data()
    return data?.array ?? []
  }

  public static async onSnapshotByUser(user: string, setter: (data: DailyInvestment[]) => void): Promise<void> {
    const docRef = doc(db, 'investmentEvolutions', user)
    onSnapshot(docRef, (document) => {
      const data = document.data()
      setter(data?.array ?? [])
    })
  }
}
