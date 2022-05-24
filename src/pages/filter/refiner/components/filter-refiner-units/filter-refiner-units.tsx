import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { UnitsList } from '@components/units-list'
import filterRefinerUnitsStore from './filter-refiner-units.store'

export const FilterRefinerUnits = observer(() => {
  const {
    stat: { unitGroups, functionalUnits },
  } = filterStore
  const { functionalConditions } = filterRefinerUnitsStore

  return (
    <UnitsList
      isDark
      withCharts
      className="w-1/3"
      groups={unitGroups}
      functionalUnits={functionalUnits}
      functionalConditions={functionalConditions}
      onSelect={({ name }) => {
        filterStore.setAttributeToAdd(name)
      }}
      onFunctionalConditionSelect={condition =>
        filterStore.selectCondition(condition.key as number)
      }
      onFunctionalConditionDelete={condition =>
        filterStore.removeCondition(condition.key as number)
      }
    />
  )
})
