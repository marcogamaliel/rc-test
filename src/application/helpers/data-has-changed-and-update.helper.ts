/* eslint-disable no-param-reassign */
import { Chart } from 'chart.js'
import { MutableRefObject } from 'react'
import { Md5 } from 'ts-md5'
import { PointChart } from '../../domain/model/point-chart.model'

export function dataHasChangedAndUpdateH(
  data: PointChart[] | undefined,
  chart: MutableRefObject<Chart | undefined>,
  index: number,
) {
  if (!chart.current) return
  if (data && chart.current) {
    if (Md5.hashStr(JSON.stringify(data)) !== Md5.hashStr(JSON.stringify(chart.current.data.datasets[index].data))) {
      chart.current.data.datasets[index].data = data
    }
  } else if (chart.current) chart.current.data.datasets[index].data = []
}
