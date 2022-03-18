export const getShortNumber = (value: number): string => {
  if (value < 1000000) {
    return String(value)
  }
  const shortedValue = (value / 1000000).toFixed(1)
  return `${shortedValue} mln`
}
