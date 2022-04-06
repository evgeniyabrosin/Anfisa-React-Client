import { TRequestCondition } from '@service-providers/common'

export const getSelectedValue = (
  group: string,
  index: number,
  requestCondition: TRequestCondition[],
): string => {
  let value = '--'

  const currentRequestBlock = requestCondition[index][1]

  Object.entries(currentRequestBlock).find((item: any[]) => {
    if (item[1].includes(group)) {
      value = item[0]
    }
  })

  return value
}
