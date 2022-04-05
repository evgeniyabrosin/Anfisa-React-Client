export const getNumericValue = (
  value: string | number | null | undefined,
): number | null => (value != null && value !== '' ? +value : null)
