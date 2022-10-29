import React, { useEffect, useState } from 'react'
import './analysis.page.scss'
import { useRecoilState, useRecoilValue } from 'recoil'
import { InvestmentEvolutionPoints } from '../../../domain/model/investment-evolution-points.model'
import { FilterInvesmentDataByPeriodService } from '../../../domain/services/filter-invesment-data-by-period.service'
import { invesmentEvolutionProcessorService } from '../../../domain/services/investment-evolution-processor.service'
import { PortfolioIndexesChartComponent } from '../../components/charts/portfolio-indexes-chart.component'
import { movingAverage } from '../../../domain/services/moving-average.service'
import { AnalysisFilterComponent } from '../../components/filters/analysis/analysis.filter'
import { movingAverages } from '../../components/states/analysis.state'
import { bollingerBandsService } from '../../../domain/services/bollinger-bands.service'
import { PickPeriodFilter } from '../../components/filters/pick-period/pick-period.filter'
import { dashboardSelectedPeriod } from '../../components/states/dashboard.state'
import { Back } from '../../components/back/back.component'
import { InvestmentEvolutionRepository } from '../../../domain/repositories/investment-evolution/investment-evolution.repository'
import { usernameAtom } from '../../components/states/global.state'
import { DailyInvestment } from '../../../domain/model/daily-investment.model'

export function AnalysisPage() {
  const username = useRecoilValue<string>(usernameAtom)
  const [invesmentEvolution, setInvesmentEvolution] = useState<InvestmentEvolutionPoints>({
    contributions: [], dailyReturns: [], portfolioIndexes: [], portfolioValues: [],
  })
  const [selectedPeriod, setSelectedPeriod] = useRecoilState(dashboardSelectedPeriod)
  const [filter, setFilter] = useRecoilState(movingAverages)

  useEffect(() => {
    InvestmentEvolutionRepository.onSnapshotByUser(username, (data: DailyInvestment[]) => {
      setInvesmentEvolution(
        invesmentEvolutionProcessorService(data),
      )
    })
  }, [])

  const { portfolioIndexes } = FilterInvesmentDataByPeriodService
    .execute(selectedPeriod, invesmentEvolution)

  const { ma4IsActive, ma10IsActive, bollingerIsActive } = filter

  const ma4 = ma4IsActive ? movingAverage(portfolioIndexes, 4) : undefined
  const ma10 = ma10IsActive ? movingAverage(portfolioIndexes, 10) : undefined
  const bollinger = bollingerIsActive ? bollingerBandsService(portfolioIndexes) : undefined

  return (
    <section className="analysis-page">
      <h1>Analysis</h1>
      <Back />
      <PickPeriodFilter selected={selectedPeriod} setSelected={setSelectedPeriod} />
      <AnalysisFilterComponent values={filter} setValues={setFilter} />
      {portfolioIndexes.length > 0 ? <PortfolioIndexesChartComponent portfolioIndexes={portfolioIndexes} ma10={ma10} ma4={ma4} bollinger={bollinger} /> : 'loading...'}
    </section>
  )
}
