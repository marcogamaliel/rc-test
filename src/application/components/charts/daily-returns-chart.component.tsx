import Chart from "chart.js/auto"
import 'chartjs-adapter-luxon';
import { createRef, useEffect } from "react"
import { ChartDataset } from "../../../domain/model/line-chart.model"
import { PointChart } from "../../../domain/model/point-chart.model"

let chart: Chart

export function DailyReturnsChartComponent({dailyReturns}: {dailyReturns: PointChart[]}) {

  const chartRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (chart) chart.destroy()
    if(ctx) chart = new Chart(ctx, config)
  })

  const datasets: ChartDataset[] = [
    {
      label: 'Daily returns',
      data: dailyReturns,
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
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
        title: {
          display: true,
          text: 'Chart.js Time - spanGaps: 172800000 (2 days in ms)'
        },
        filler: {
          propagate: false,
          drawTime: 'beforeDatasetsDraw' as any
        }
      },
      scales: {
        x: {
          type: 'time',
          display: true,
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            major: {
              enabled: true
            }
          }
        },
        y: {
          display: true,
        }
      }
    },
  };

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
