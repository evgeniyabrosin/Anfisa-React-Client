import { TScenario } from '@pages/filter/refiner/components/panels/function-panel/function-panel.interface'

export const getSelectValue = (
  scenario: TScenario[],
  problemGroup: string,
): string => {
  for (const item of scenario) {
    if (item[1].includes(problemGroup)) {
      return item[0]
    }
  }
  return '--'
}
