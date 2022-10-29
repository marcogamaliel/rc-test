import { BollingerBands } from '../model/bollinger-bands.model'
import { PointChart } from '../model/point-chart.model'

export function bollingerBandsService(data: PointChart[]): BollingerBands {
  const upperBand: PointChart[] = []
  const lowerBand: PointChart[] = []
  for (let i = 0; i < data.length; i += 1) {
    const d = data.slice(i > 20 ? i - 20 : 0, i + 1)
    const sum = d.reduce((acc, cur) => acc + cur.y, 0)
    const avg = sum / d.length
    const std = Math.sqrt(d.reduce((acc, cur) => acc + (cur.y - avg) ** 2, 0) / d.length)
    upperBand.push({ x: data[i].x, y: avg + std })
    lowerBand.push({ x: data[i].x, y: avg - std })
  }
  return { upperBand, lowerBand }
}
