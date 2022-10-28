import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { DocumentData, doc, getDoc } from 'firebase/firestore'
import { DailyReturnsChartComponent } from '../../components/charts/daily-returns-chart.component'
import { InvestmentEvolutionChartComponent } from '../../components/charts/investment-evolution-chart.component'
import { PortfolioIndexesChartComponent } from '../../components/charts/portfolio-indexes-chart.component'
import { db } from '../../../db/firebase'
import { invesmentEvolutionProcessorService } from '../../../domain/services/investment-evolution-processor/investment-evolution-processor.service'
import { dashboardSelectedPeriod } from '../../components/state/dashboard.state'
import { PickPeriodFilter } from '../../components/filters/pick-period.filter'
import { FilterInvesmentDataByPeriodService } from '../../../domain/services/filter-invesment-data-by-period.service'
import { InvestmentEvolutionPoints } from '../../../domain/model/investment-evolution-points.model'

export default function DashboardPage() {
  const [invesmentEvolution, setInvesmentEvolution] = useState<InvestmentEvolutionPoints>({
    contributions: [], dailyReturns: [], portfolioIndexes: [], portfolioValues: [],
  })
  const [selectedPeriod, setSelectedPeriod] = useRecoilState(dashboardSelectedPeriod)

  useEffect(() => {
    const docRef = doc(db, 'investmentEvolutions/user1')
    getDoc(docRef).then((document: DocumentData) => {
      const data = document.data()
      setInvesmentEvolution(
        invesmentEvolutionProcessorService(data.array),
      )
    })
  }, [])

  const {
    contributions, dailyReturns, portfolioIndexes, portfolioValues,
  } = FilterInvesmentDataByPeriodService.execute(selectedPeriod, invesmentEvolution)

  return (
    <div>
      <h1>Dashboard</h1>
      <PickPeriodFilter selected={selectedPeriod} setSelected={setSelectedPeriod} />
      {portfolioValues.length > 0 ? <InvestmentEvolutionChartComponent portfolioValues={portfolioValues} contributions={contributions} /> : 'hola'}
      {dailyReturns.length > 0 ? <DailyReturnsChartComponent dailyReturns={dailyReturns} /> : 'hola'}
      {portfolioIndexes.length > 0 ? <PortfolioIndexesChartComponent portfolioIndexes={portfolioIndexes} /> : 'hola'}
    </div>
  )
}
