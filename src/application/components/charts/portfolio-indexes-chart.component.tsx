import React, { createRef, useEffect } from 'react'
import Chart from 'chart.js/auto'
import 'chartjs-adapter-luxon'
import { ChartDataset } from '../../../domain/model/line-chart.model'
import { PointChart } from '../../../domain/model/point-chart.model'
import { BollingerBands } from '../../../domain/model/bollinger-bands.model'

let chart: Chart

export function PortfolioIndexesChartComponent(
  { portfolioIndexes, ma4, ma10, bollinger }: { portfolioIndexes: PointChart[], ma4?: PointChart[], ma10?: PointChart[], bollinger?: BollingerBands },
) {
  const datasets: ChartDataset[] = [
    {
      label: 'Portfolio Index',
      data: portfolioIndexes,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      fill: false,
    },
  ]
  
  if(ma10) datasets.unshift({
    label: 'ma10',
    data: ma10,
    borderColor: 'rgb(252, 213, 53)',
    backgroundColor: 'rgb(252, 213, 53)',
    borderWidth: 2,
    fill: false,
  })
  
  if(ma4) datasets.unshift({
    label: 'ma4',
    data: ma4,
    borderColor: 'rgb(255, 124, 0)',
    backgroundColor: 'rgb(255, 124, 0)',
    borderWidth: 2,
    fill: false,
  })

  if(bollinger) {
    datasets.push({
      label: 'bollinger',
      data: bollinger.upperBand,
      borderColor: 'rgb(18, 157, 214)',
      backgroundColor: 'rgba(18, 157, 214, 0.5)',
      borderWidth: 1,
      fill: false,
    })
    datasets.push({
      label: 'bollinger',
      data: bollinger.lowerBand,
      borderColor: 'rgb(18, 157, 214)',
      backgroundColor: 'rgba(18, 157, 214, 0.5)',
      borderWidth: 1,
      fill: '-1',
    })
  }

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
          position: 'bottom'
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
    },
  }

  const chartRef = createRef<HTMLCanvasElement>()

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d')
    if (chart) chart.destroy()
    if (ctx) chart = new Chart(ctx, config)
  })

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
