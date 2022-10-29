export function numberH(data?: number): string | undefined {
  if(!data) return undefined
  return data
  .toFixed(2)
  .replace('.', ',')
  .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
}