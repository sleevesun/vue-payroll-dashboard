export function formatCurrency(num: number) {
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function formatNumber(num: number) {
  return num.toLocaleString('en-US')
}

export function getPct(val: number, chg: number) {
  const prev = val - chg
  if (Math.abs(prev) < 0.01) return 0
  return (chg / prev) * 100
}
