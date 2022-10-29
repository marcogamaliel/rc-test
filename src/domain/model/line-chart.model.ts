import { __String } from "typescript"

export type ChartDataset = {
  label: string
  data: (number | { y: number, x: string | Date | number })[]
  borderColor: string
  backgroundColor?: string
  borderWidth?: number
  fill: boolean | string
  options?: {
    parsing: {
      xAxisKey: string,
      yAxisKey: string,
    }
  }
}
