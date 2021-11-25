import { StatList } from '@declarations'
import dtreeStore from '@store/dtree'

export const getQueryBuilder = (statList: StatList[]) => {
  const groups: Record<string, StatList[]> = {}

  statList &&
    statList.forEach(item => {
      if (
        item.name
          .toLocaleLowerCase()
          .includes(dtreeStore.filterValue.toLocaleLowerCase())
      ) {
        if (groups[item.vgroup]) {
          groups[item.vgroup] = [...groups[item.vgroup], item]
        } else {
          groups[item.vgroup] = [item]
        }
      }
    })

  return groups
}
