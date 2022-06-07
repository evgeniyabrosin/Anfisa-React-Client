import { InheritanceModeEnum } from '@core/enum/inheritance-mode-enum'
import { IScenario } from '@service-providers/common'
import { IHandleSetComplexScenarioProps } from './custom-inheritance-mode.interface'

export const getSelectValue = (
  scenario: IScenario,
  problemGroup: string,
): string => {
  for (const key in scenario) {
    if (scenario[key].includes(problemGroup)) {
      return key
    }
  }
  return '--'
}

export const getSelectValues = (
  scenario: IScenario,
  problemGroups: string[],
): string[] => {
  return Object.keys(scenario).length
    ? [
        getSelectValue(scenario, problemGroups[0]),
        getSelectValue(scenario, problemGroups[1]),
        getSelectValue(scenario, problemGroups[2]),
      ]
    : ['--', '--', '--']
}

export const handleSetComplexScenario = ({
  preparedValue,
  problemGroups,
  setScenario,
}: IHandleSetComplexScenarioProps) => {
  let complexScenario = {}
  switch (preparedValue) {
    case InheritanceModeEnum.HomozygousRecessive_XLinked:
      complexScenario = {
        '2': [problemGroups[0]],
        '0-1': [problemGroups[1], problemGroups[2]],
      }
      break

    case InheritanceModeEnum.AutosomalDominant:
      complexScenario = {
        '1-2': [problemGroups[0]],
        '0': [problemGroups[1], problemGroups[2]],
      }
      break

    case InheritanceModeEnum.Compensational:
      complexScenario = {
        '0': [problemGroups[0]],
        '1-2': [problemGroups[1], problemGroups[2]],
      }
      break
  }

  setScenario(complexScenario)
}

export const getNewScenario = (
  selectedValues: string[],
  problemGroups: string[],
): IScenario => {
  const newScenario: IScenario = {}

  selectedValues.forEach((value, index) => {
    if (value && value !== '--') {
      if (Object.keys(newScenario).includes(value)) {
        newScenario[value].push(problemGroups[index])
      } else {
        newScenario[value] = [problemGroups[index]]
      }
    }
  })

  return newScenario
}
