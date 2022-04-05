export const intlNumberFormat = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 16,
}).format

export const formatNumber = (value: unknown): string => {
  return typeof value === 'number' ? intlNumberFormat(value) : '...'
}
