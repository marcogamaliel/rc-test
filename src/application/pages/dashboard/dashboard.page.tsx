import { doc, DocumentData, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { DailyReturnsChartComponent } from "../../components/charts/daily-returns-chart.component"
import { InvestmentEvolutionChartComponent } from "../../components/charts/investment-evolution-chart.component"
import { PortfolioIndexesChartComponent } from "../../components/charts/portfolio-indexes-chart.component"
import { db } from "../../../db/firebase"
import { PointChart } from "../../../domain/model/point-chart.model"
import { invesmentEvolutionProcessorService } from "../../../domain/services/investment-evolution-processor/investment-evolution-processor.service"

export default function DashboardPage() {
  const [contributions, setContributions] = useState<PointChart[]>([])
  const [dailyReturns, setDailyReturns] = useState<PointChart[]>([])
  const [portfolioIndexes, setPortfolioIndexes] = useState<PointChart[]>([])
  const [portfolioValues, setPortfolioValues] = useState<PointChart[]>([])



  useEffect(() => {
    console.log('>> useEffect')
    const docRef = doc(db, 'investmentEvolutions/user1');
    getDoc(docRef).then((doc: DocumentData) => {
      const data = doc.data()
      console.log(data)
      const {contributions, dailyReturns, portfolioIndexs, portfolioValues} = invesmentEvolutionProcessorService(data.array)
      setContributions(contributions)
      setDailyReturns(dailyReturns)
      setPortfolioIndexes(portfolioIndexs)
      setPortfolioValues(portfolioValues)
    })
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      {portfolioValues.length > 0 ? <InvestmentEvolutionChartComponent portfolioValues={portfolioValues} contributions={contributions} /> : 'hola'}
      {dailyReturns.length > 0 ? <DailyReturnsChartComponent dailyReturns={dailyReturns} /> : 'hola'}
      {portfolioIndexes.length > 0 ? <PortfolioIndexesChartComponent portfolioIndexes={portfolioIndexes} /> : 'hola'}
    </div>
  )
}