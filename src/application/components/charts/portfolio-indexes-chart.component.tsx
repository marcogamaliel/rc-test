import React, {
  MutableRefObject, createRef, useEffect, useRef,
} from 'react'
import Chart from 'chart.js/auto'
import 'chartjs-adapter-luxon'
import { PointChart } from '../../../domain/model/point-chart.model'
import { BollingerBands } from '../../../domain/model/bollinger-bands.model'
import { dataHasChangedAndUpdateH } from '../../helpers/data-has-changed-and-update.helper'

export function PortfolioIndexesChartComponent(
  {
    portfolioIndexes, ma4, ma10, bollinger,
  }: { portfolioIndexes: PointChart[], ma4?: PointChart[], ma10?: PointChart[], bollinger?: BollingerBands },
) {
  const chart: MutableRefObject<Chart | undefined> = useRef(undefined)

  const datasets: any = chart.current ? chart.current.data.datasets : [
    {
      label: 'ma4',
      data: ma4,
      borderColor: 'rgb(255, 124, 0)',
      backgroundColor: 'rgb(255, 124, 0)',
      borderWidth: 2,
      fill: false,
    },
    {
      label: 'ma10',
      data: ma10,
      borderColor: 'rgb(252, 213, 53)',
      backgroundColor: 'rgb(252, 213, 53)',
      borderWidth: 2,
      fill: false,
    },
    {
      label: 'Portfolio Index',
      data: portfolioIndexes,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      fill: false,
    },
    {
      label: 'bollinger',
      data: bollinger?.upperBand,
      borderColor: 'rgb(18, 157, 214)',
      backgroundColor: 'rgba(18, 157, 214, 0.5)',
      borderWidth: 1,
      fill: false,
    },
    {
      label: 'bollinger',
      data: bollinger?.lowerBand,
      borderColor: 'rgb(18, 157, 214)',
      backgroundColor: 'rgba(18, 157, 214, 0.5)',
      borderWidth: 1,
      fill: '-1',
    },
  ]

  dataHasChangedAndUpdateH(ma4, chart, 0)
  dataHasChangedAndUpdateH(ma10, chart, 1)
  dataHasChangedAndUpdateH(portfolioIndexes, chart, 2)
  dataHasChangedAndUpdateH(bollinger?.upperBand, chart, 3)
  dataHasChangedAndUpdateH(bollinger?.lowerBand, chart, 4)

  const config: any = {
    type: 'line',
    data: { datasets },
    options: {
      radius: 0,
      responsive: true,
      interaction: {
        mode: 'nearest',
      },
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
      scales: {
        x: {
          type: 'time',
          display: true,
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            major: {
              enabled: true,
            },
          },
        },
        y: {
          display: true,
        },
      },
      animations: {
        y: {
          easing: 'easeInOutElastic',
          from: (ctx: any): undefined | 0 => {
            if (ctx.type === 'data') {
              if (ctx.mode === 'default' && !ctx.dropped) {
                ctx.dropped = true
                return 0
              }
            }
            return undefined
          },
        },
      },
    },
  }

  const chartRef = createRef<HTMLCanvasElement>()

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d')
    if (chart.current) chart.current.destroy()
    if (ctx) chart.current = new Chart(ctx, config)
  }, [])
  if (chart.current) chart.current.data.datasets = datasets as any
  chart.current?.update()

  return (
    <div className="chart-container">
      <canvas
        width="360"
        height="250"
        ref={chartRef}
      />
    </div>
  )
}
