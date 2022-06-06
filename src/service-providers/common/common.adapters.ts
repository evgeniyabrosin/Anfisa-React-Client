import { TFilteringStatCounts, TItemsCount } from './common.interface'

export const adaptFilteringStatsCounts = (
  counts: TItemsCount,
): TFilteringStatCounts => {
  return {
    variants: counts[0],
    transcribedVariants: counts[1] ?? null,
    transcripts: counts[2] ?? null,
  }
}

export const adaptDataToCamelizedType = <T>(
  response: T,
  skipFields?: string[],
): T => {
  const camelizedData = {}

  const isObject = (value: any) => {
    return !!(value && typeof value === 'object' && !Array.isArray(value))
  }

  for (const key in response) {
    if (!isObject(response[key])) {
      const camelizedKey = key.replace(/-./g, x => x[1].toUpperCase())

      Object.defineProperty(camelizedData, camelizedKey, {
        value: response[key as keyof T],
      }) as T
    } else {
      let subCamelizedData = response[key as keyof T]
      if (skipFields && !skipFields.includes(key)) {
        subCamelizedData = adaptDataToCamelizedType(response[key], skipFields)
      }
      const camelizedKey = key.replace(/-./g, x => x[1].toUpperCase())

      Object.defineProperty(camelizedData, camelizedKey, {
        value: subCamelizedData,
      }) as T
    }
  }

  return camelizedData as T
}
