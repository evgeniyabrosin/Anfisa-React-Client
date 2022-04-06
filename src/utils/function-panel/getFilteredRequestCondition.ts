import { TRequestCondition } from '@service-providers/common'

export const getFilteredRequestCondition = (
  fullRequestCondition: TRequestCondition[],
) => {
  return fullRequestCondition.filter(
    ([, reqCondition]) => Object.keys(reqCondition).length > 0,
  )
}
