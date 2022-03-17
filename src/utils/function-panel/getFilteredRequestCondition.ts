import { TRequestCondition } from '@pages/filter/ui/panels/function-panel/function-panel.interface'

export const getFilteredRequestCondition = (
  fullRequestCondition: TRequestCondition[],
) => {
  return fullRequestCondition.filter(
    ([, reqCondition]) => Object.keys(reqCondition).length > 0,
  )
}
