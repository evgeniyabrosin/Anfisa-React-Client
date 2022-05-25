import { makeAutoObservable } from 'mobx'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import filterStore from '@store/filter'
import { TFunctionalCondition } from '@components/units-list'

class FilterRefinerUnitsStore {
  constructor() {
    makeAutoObservable(this)
  }

  get functionalConditions(): TFunctionalCondition[] {
    const { conditions, selectedConditionIndex } = filterStore
    const ret: TFunctionalCondition[] = []
    const counts: Record<string, number> = {}

    for (let i = 0; i < conditions.length; ++i) {
      if (conditions[i][0] === FilterKindEnum.Func) {
        const name = conditions[i][1]

        ret.push({
          name,
          key: i,
          isActive: i === selectedConditionIndex,
        })
        counts[name] = (counts[name] ?? 0) + 1
      }
    }

    for (const [name, count] of Object.entries(counts)) {
      if (count > 1) {
        let index = 1
        for (const condition of ret) {
          if (condition.name === name) {
            condition.name = `${condition.name} (${index++})`
          }
        }
      }
    }

    return ret
  }
}

export default new FilterRefinerUnitsStore()
