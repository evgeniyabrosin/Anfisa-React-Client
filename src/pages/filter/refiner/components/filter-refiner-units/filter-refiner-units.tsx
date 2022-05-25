import { observer } from 'mobx-react-lite'

import filterStore from '@store/filter'
import { UnitsList } from '@components/units-list'
import filterRefinerUnitsStore from './filter-refiner-units.store'

interface IFilterRefinerUnitsProps {
  className?: string
}

export const FilterRefinerUnits = observer(
  ({ className }: IFilterRefinerUnitsProps) => {
    const {
      stat: { unitGroups, functionalUnits },
    } = filterStore
    const { functionalConditions } = filterRefinerUnitsStore

    return (
      <UnitsList
        isDark
        withCharts
        className={className}
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
  },
)
