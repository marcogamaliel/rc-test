import { numberH } from './number.helper'

export function percentageH(data?: number): string | undefined {
  if (!data) return undefined
  return `${numberH(data)} %`
}
