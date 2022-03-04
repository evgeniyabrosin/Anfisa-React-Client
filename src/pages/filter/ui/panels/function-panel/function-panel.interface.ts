export interface IGeneRegionCachedValues {
  conditions: {
    locus: string
  }
}

export interface IInheritanceModeCachedValues {
  conditions: { problem_group: string[] }
  variants: string[]
}

export interface ICompoundHetCachedValues {
  conditions: {
    approx: string | null
    state?: string | null
  }
  variants: string[]
}
export interface ICompoundRequestCachedValues {
  conditions: {
    approx: null
    state: null
    request: TRequestCondition[]
  }
  reset: string
}

export type TRequestCondition = [number, TSelectValues]

export type TSelectValues = {
  [key: string]: string[]
}

export type TScenario = [string, string[]]

export interface ICustomInheritanceModeCachedValues {
  conditions: { scenario: TScenario[] }
  reset: string
}
