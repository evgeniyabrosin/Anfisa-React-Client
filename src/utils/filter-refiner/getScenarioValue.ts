import { IScenario } from '@service-providers/common'

export const getScenarioValue = (
  scenarioName: string,
  scenarioArray: IScenario,
): string => {
  let scenarioValue = ''

  Object.entries(scenarioArray).forEach(([scenarioNumber, scenarioNames]) => {
    if (scenarioNames.includes(scenarioName)) {
      scenarioValue = scenarioNumber
    }
  })

  return `(${scenarioValue})`
}
