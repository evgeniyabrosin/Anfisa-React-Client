import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'

export const getResetRequestData = (name: string, attrData: any) => {
  let resetData: any[] = []

  if (name === InheritanceModeEnum.HomozygousRecessive_XLinked) {
    resetData = [
      ['2', attrData.family[0]],
      ['0-1', attrData.family[1]],
      ['0-1', attrData.family[2]],
    ]
  }

  if (name === InheritanceModeEnum.AutosomalDominant) {
    resetData = [
      ['1-2', attrData.family[0]],
      ['0', attrData.family[1]],
      ['0', attrData.family[2]],
    ]
  }

  if (name === InheritanceModeEnum.Compensational) {
    resetData = [
      ['0', attrData.family[0]],
      ['1-2', attrData.family[1]],
      ['1-2', attrData.family[2]],
    ]
  }

  if (name === 'empty') {
    resetData = [
      ['--', attrData.family[0]],
      ['--', attrData.family[1]],
      ['--', attrData.family[2]],
    ]
  }

  return resetData
}
