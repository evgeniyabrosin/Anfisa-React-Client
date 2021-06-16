export const formatDataToConditions = (filters: any) => {
  const result: any[] = []

  Object.keys(filters).map(key =>
    Object.keys(filters[key]).forEach(keyItem => {
      result.push(['enum', keyItem, '', Object.keys(filters[key][keyItem])])
    }),
  )

  return result
}
