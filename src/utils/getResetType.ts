import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'

interface IResetCondition {
  [key: string]: string[]
}

export const getResetType = (resetCondition: IResetCondition) => {
  if (Object.keys(resetCondition).length > 2) return ''

  if (
    Object.keys(resetCondition)[0] === '0' &&
    Object.keys(resetCondition)[1] === '1-2'
  ) {
    if (
      Object.values(resetCondition)[0].length === 1 &&
      Object.values(resetCondition)[1].length === 2
    ) {
      return InheritanceModeEnum.Compensational
    }

    if (
      Object.values(resetCondition)[0].length === 2 &&
      Object.values(resetCondition)[1].length === 1
    ) {
      return InheritanceModeEnum.AutosomalDominant
    }
  }

  if (
    Object.keys(resetCondition)[0] === '2' &&
    Object.keys(resetCondition)[1] === '0-1' &&
    Object.values(resetCondition)[0].length === 1 &&
    Object.values(resetCondition)[1].length === 2
  ) {
    return InheritanceModeEnum.HomozygousRecessive_XLinked
  }

  return ''
}
