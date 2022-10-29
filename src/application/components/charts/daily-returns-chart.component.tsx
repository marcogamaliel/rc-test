import React, { createRef, useEffect } from 'react'
import Chart from 'chart.js/auto'
import 'chartjs-adapter-luxon'
import { ChartDataset } from '../../../domain/model/line-chart.model'
import { PointChart } from '../../../domain/model/point-chart.model'

let chart: Chart

export function DailyReturnsChartComponent({ dailyReturns }: { dailyReturns: PointChart[] }) {
  const datasets: ChartDataset[] = [
    {
      label: 'Daily returns',
      data: dailyReturns,
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderWidth: 1,
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
