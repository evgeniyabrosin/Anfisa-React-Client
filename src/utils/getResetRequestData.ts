import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'

export const getResetRequestData = (name: string, problemGroups: string[]) => {
  let resetData: any[] = []

  if (name === InheritanceModeEnum.HomozygousRecessive_XLinked) {
    resetData = [
      ['2', problemGroups[0]],
      ['0-1', problemGroups[1]],
      ['0-1', problemGroups[2]],
    ]
  }

  if (name === InheritanceModeEnum.AutosomalDominant) {
    resetData = [
      ['1-2', problemGroups[0]],
      ['0', problemGroups[1]],
      ['0', problemGroups[2]],
    ]
  }

  if (name === InheritanceModeEnum.Compensational) {
    resetData = [
      ['0', problemGroups[0]],
      ['1-2', problemGroups[1]],
      ['1-2', problemGroups[2]],
    ]
  }

  if (name === 'empty') {
    resetData = [
      ['--', problemGroups[0]],
      ['--', problemGroups[1]],
      ['--', problemGroups[2]],
    ]
  }

  return resetData
}
