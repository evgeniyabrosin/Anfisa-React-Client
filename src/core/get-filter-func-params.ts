const filterFuncParamsMap: Record<string, string[]> = {
  GeneRegion: ['locus'],
}

export const getFilterFuncParams = (name: string): string[] => {
  return filterFuncParamsMap[name]
}
