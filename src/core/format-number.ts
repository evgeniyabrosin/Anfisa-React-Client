export const intlNumberFormat = new Intl.NumberFormat().format

export const formatNumber = (value: unknown): string => {
  return typeof value === 'number' ? intlNumberFormat(value) : '...'
}
