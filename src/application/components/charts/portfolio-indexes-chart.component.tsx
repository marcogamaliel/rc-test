import React, { createRef, useEffect } from 'react'
import Chart from 'chart.js/auto'
import 'chartjs-adapter-luxon'
import { ChartDataset } from '../../../domain/model/line-chart.model'
import { PointChart } from '../../../domain/model/point-chart.model'

let chart: Chart

export function PortfolioIndexesChartComponent({ portfolioIndexes }: { portfolioIndexes: PointChart[] }) {
  const datasets: ChartDataset[] = [
    {
      label: 'Portfolio value',
      data: portfolioIndexes,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      fill: false,
    },
  ]

  const config: any = {
    type: 'line',
    data: { datasets },
    options: {
      radius: 0,
      responsive: true,
      interaction: {
        mode: 'nearest',
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
    <div>
      <h2>Investment Evolution Chart</h2>
      <canvas
        id="evolution-chart"
        width="400"
        height="300"
        ref={chartRef}
      ></canvas>
    </div>
  )
}
