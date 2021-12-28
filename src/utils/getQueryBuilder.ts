import { StatList } from '@declarations'

export const getQueryBuilder = (statList: StatList[]) => {
  const groups: Record<string, StatList[]> = {}

  statList &&
    statList.forEach(item => {
      if (groups[item.vgroup]) {
        groups[item.vgroup] = [...groups[item.vgroup], item]
      } else {
        groups[item.vgroup] = [item]
      }
    })

  return groups
}
