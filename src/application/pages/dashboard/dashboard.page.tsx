import React, { useEffect, useState } from 'react'
import './dashboard.page.scss'
import { useRecoilState } from 'recoil'
import { DocumentData, doc, getDoc } from 'firebase/firestore'
import { DailyReturnsChartComponent } from '../../components/charts/daily-returns-chart.component'
import { InvestmentEvolutionChartComponent } from '../../components/charts/investment-evolution-chart.component'
import { PortfolioIndexesChartComponent } from '../../components/charts/portfolio-indexes-chart.component'
import { db } from '../../../db/firebase'
import { invesmentEvolutionProcessorService } from '../../../domain/services/investment-evolution-processor.service'
import { dashboardSelectedPeriod } from '../../components/states/dashboard.state'
import { FilterInvesmentDataByPeriodService } from '../../../domain/services/filter-invesment-data-by-period.service'
import { InvestmentEvolutionPoints } from '../../../domain/model/investment-evolution-points.model'
import { PickPeriodFilter } from '../../components/filters/pick-period/pick-period.filter'
import { DailyInvestment } from '../../../domain/model/daily-investment.model'
import { Back } from '../../components/back/back.component'
import { BalanceComponent } from '../../components/balance/balance.component'

export default function DashboardPage() {
  const [invesmentEvolution, setInvesmentEvolution] = useState<InvestmentEvolutionPoints>({
    contributions: [], dailyReturns: [], portfolioIndexes: [], portfolioValues: [],
  })
  const [selectedPeriod, setSelectedPeriod] = useRecoilState(dashboardSelectedPeriod)
  const [currentState, setCurrentState] = useState<DailyInvestment | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const docRef = doc(db, 'investmentEvolutions/user1')
    getDoc(docRef)
    .then((document: DocumentData) => {
      const data = document.data()
      setCurrentState(data.array.slice(-1).pop())
      setInvesmentEvolution(
        invesmentEvolutionProcessorService(data.array),
      )
      setLoading(false)
    }).catch((error) => {
      setLoading(false)
      console.error('error', error)
    })
  }, [])

  const {
    contributions, dailyReturns, portfolioIndexes, portfolioValues,
  } = FilterInvesmentDataByPeriodService.execute(selectedPeriod, invesmentEvolution)

  return (
    <section className='dashboard-page'>
      <h1>
        Dashboard
      </h1>
      <Back />
      <div className="content">
        <div className="block balance-block">
          <BalanceComponent data={currentState} />
          <PickPeriodFilter selected={selectedPeriod} setSelected={setSelectedPeriod} />
        </div>
        <div className="block">
          <h2>Invesment Evolution</h2>
          {!loading ? <InvestmentEvolutionChartComponent portfolioValues={portfolioValues} contributions={contributions} /> : 'loading...'}
        </div>
        <div className="block">
          <h2>Daily Returns</h2>
          {!loading ? <DailyReturnsChartComponent dailyReturns={dailyReturns} /> : 'loading...'}
        </div>
        <div className="block">
          <h2>Porfolio Index</h2>
          {!loading ? <PortfolioIndexesChartComponent portfolioIndexes={portfolioIndexes} /> : 'loading...'}
        </div>
      </div>
    </section>
  )
}
