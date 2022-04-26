import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import useClientHeight from '@core/hooks/use-client-height'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { SelectedFilterCard } from './selected-filter-card'

export const QueryResults = observer((): ReactElement => {
  const { conditions, selectedConditionIndex } = filterStore

  const emptyDivkRef = useRef<any>()
  const nonEmptyDivRef = useRef<any>()

  const emptyBlockHeight = useClientHeight(emptyDivkRef)
  const nonEmptyBlockHeight = useClientHeight(nonEmptyDivRef)

  if (conditions.length === 0) {
    return (
      <div
        ref={emptyDivkRef}
        style={{ height: emptyBlockHeight }}
        className="flex items-center justify-center border-b border-grey-disabled"
      >
        <p className="leading-16px text-grey-blue">
          {t('general.noResultsFound')}
        </p>
      </div>
    )
  }

  return (
    <div
      ref={nonEmptyDivRef}
      className="overflow-y-scroll"
      style={{ height: nonEmptyBlockHeight }}
    >
      {conditions.map((condition, index) => (
        <div key={`${condition[1]}_${index}`} className="flex flex-col">
          <SelectedFilterCard
            isActive={index === selectedConditionIndex}
            condition={condition}
            onSelect={() => filterStore.selectCondition(index)}
            onDelete={() => filterStore.removeCondition(index)}
          />
        </div>
      ))}
    </div>
  )
})
