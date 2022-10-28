import React, { createRef, useEffect } from 'react'
import Chart from 'chart.js/auto'
import 'chartjs-adapter-luxon'
import { ChartDataset } from '../../../domain/model/line-chart.model'
import { PointChart } from '../../../domain/model/point-chart.model'

let chart: Chart

export function InvestmentEvolutionChartComponent(
  { portfolioValues, contributions }: { portfolioValues: PointChart[], contributions: PointChart[] },
) {
  const datasets: ChartDataset[] = [
    {
      label: 'Portfolio value',
      data: portfolioValues,
      borderColor: '#3880ff',
      backgroundColor: '#3880ff',
      fill: false,
    },
    {
      label: 'Contributions',
      data: contributions,
      borderColor: 'rgb(59, 218, 174)',
      backgroundColor: 'rgba(59, 218, 174, .4)',
      fill: true,
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
        title: {
          display: true,
          text: 'Chart.js Time - spanGaps: 172800000 (2 days in ms)',
        },
        filler: {
          propagate: false,
          drawTime: 'beforeDatasetsDraw' as any,
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
