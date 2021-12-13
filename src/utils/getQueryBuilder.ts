import { StatList } from '@declarations'
import dtreeStore from '@store/dtree'

export const getQueryBuilder = (statList: StatList[], source?: string) => {
  const groups: Record<string, StatList[]> = {}

  statList &&
    statList.forEach(item => {
      if (
        item.name
          .toLocaleLowerCase()
          .includes(
            source
              ? dtreeStore.filterModalValue.toLocaleLowerCase()
              : dtreeStore.filterValue.toLocaleLowerCase(),
          )
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
