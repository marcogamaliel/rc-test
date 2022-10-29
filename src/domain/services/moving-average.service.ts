import { PointChart } from '../model/point-chart.model'

export function movingAverage(data: PointChart[], days: number): PointChart[] {
  const result: PointChart[] = []
  for (let i = 0; i < data.length; i += 1) {
    const d = data.slice(days < i ? i - days : 0, i + 1)
    const sum = d.reduce((acc, cur) => acc + cur.y, 0)
    const avg = sum / d.length
    result.push({ x: data[i].x, y: avg })
  }
  return result
}
