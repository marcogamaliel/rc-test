import React, { useEffect, useState } from "react"
import { doc, DocumentData, getDoc } from "firebase/firestore"
import { useRecoilState } from "recoil"
import { db } from "../../../db/firebase"
import { InvestmentEvolutionPoints } from "../../../domain/model/investment-evolution-points.model"
import { FilterInvesmentDataByPeriodService } from "../../../domain/services/filter-invesment-data-by-period.service"
import { invesmentEvolutionProcessorService } from "../../../domain/services/investment-evolution-processor.service"
import { PortfolioIndexesChartComponent } from "../../components/charts/portfolio-indexes-chart.component"
import { movingAverage } from "../../../domain/services/moving-average.service"
import { AnalysisFilterComponent } from "../../components/filters/analysis/analysis.filter"
import { movingAverages } from "../../components/states/analysis.state"
import { bollingerBandsService } from "../../../domain/services/bollinger-bands.service"

export function AnalysisPage() {
  const [invesmentEvolution, setInvesmentEvolution] = useState<InvestmentEvolutionPoints>({
    contributions: [], dailyReturns: [], portfolioIndexes: [], portfolioValues: [],
  })
  const [filter, setFilter] = useRecoilState(movingAverages)

  useEffect(() => {
    const docRef = doc(db, 'investmentEvolutions/user1')
    getDoc(docRef).then((document: DocumentData) => {
      const data = document.data()
      setInvesmentEvolution(
        invesmentEvolutionProcessorService(data.array),
      )
    })
  }, [])

  const { portfolioIndexes } = FilterInvesmentDataByPeriodService
    .execute('12M', invesmentEvolution)

  const { ma4IsActive, ma10IsActive, bollingerIsActive } = filter

  const ma4 = ma4IsActive ? movingAverage(portfolioIndexes, 4) : undefined
  const ma10 = ma10IsActive ? movingAverage(portfolioIndexes, 10) : undefined
  const bollinger = bollingerIsActive ? bollingerBandsService(portfolioIndexes) : undefined

  return (
    <section>
      <h1>Analysis</h1>
      <AnalysisFilterComponent values={filter} setValues={setFilter} />
      {portfolioIndexes.length > 0 ? <PortfolioIndexesChartComponent portfolioIndexes={portfolioIndexes} ma10={ma10} ma4={ma4} bollinger={bollinger} /> : 'hola'}
    </section>
  )
}
