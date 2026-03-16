export const CURRENCY_SYMBOL = '$'

/**
 * Format number as currency string.
 *
 * Example: 1200 -> "$1,200"
 */
export function formatPrice(value) {
  if (value === null || value === undefined) return ''
  const number = typeof value === 'number' ? value : Number(value)
  if (Number.isNaN(number)) return `${CURRENCY_SYMBOL}${value}`
  return `${CURRENCY_SYMBOL}${number.toLocaleString()}`
}
