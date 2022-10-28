export type ChartDataset = {
  label: string
  data: (number | { y: number, x: string | Date | number })[]
  borderColor: string
  backgroundColor: string
  fill: boolean
  options?: {
    parsing: {
      xAxisKey: string,
      yAxisKey: string,
    }
  }
}
