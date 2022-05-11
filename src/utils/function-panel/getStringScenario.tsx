import { TScenario } from '@pages/filter/refiner/components/middle-column/panels/function-panel/function-panel.interface'

export const getStringScenario = (arrayScenario: TScenario[]): string => {
  let scenarioToString = ''

  arrayScenario.map((item: TScenario, index: number) => {
    scenarioToString += `"${item[0]}":["${item[1]
      .toString()
      .split(',')
      .join('","')}"]`

    if (arrayScenario[index + 1]) scenarioToString += ','
  })

  return scenarioToString
}
