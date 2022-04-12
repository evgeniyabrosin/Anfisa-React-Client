export const getScenarioValue = (
  scenarioName: string,
  scenarioArray: [string, string | string[]][],
): string => {
  let scenarioValue = ''

  scenarioArray.forEach(([scenarioNumber, scenarioNames]) => {
    if (scenarioNames.includes(scenarioName)) {
      scenarioValue = scenarioNumber
    }
  })

  return `(${scenarioValue})`
}
