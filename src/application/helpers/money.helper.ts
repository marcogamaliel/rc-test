import { numberH } from './number.helper'

export function moneyH(data?: number): string | undefined {
  if (!data) return undefined
  return `$ ${numberH(data)}`
}
