import { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { SessionStoreManager } from '@core/session-store-manager'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { InputNumber } from '@ui/input-number'
import { FILTER_REFINER_PREFIX } from './filter-refiner'
import { SessionStoreDataProvider } from './session-store-data-provider'

export interface IRangePanelFormValues {
  min: string
  max: string
}

export const RangePanel = observer(
  (): ReactElement => {
    const selectedFilter = filterStore.selectedGroupItem

    const savedValues = SessionStoreManager.read<IRangePanelFormValues>(
      selectedFilter.name,
      FILTER_REFINER_PREFIX,
    )

    const [min, setMin] = useState(savedValues?.min || '')
    const [max, setMax] = useState(savedValues?.max || '')

    const [isVisibleMinError, setIsVisibleMinError] = useState(false)
    const [isVisibleMaxError, setIsVisibleMaxError] = useState(false)
    const [isVisibleMixedError, setIsVisibleMixedError] = useState(false)

    const handleAddConditionsAsync = async () => {
      const arrayNo = await datasetStore.setConditionsAsync([
        [FilterKindEnum.Numeric, selectedFilter.name, [+min, true, +max, true]],
      ])

      filterStore.addSelectedFilterGroup(
        selectedFilter.vgroup,
        selectedFilter.name,
        [[selectedFilter.name, arrayNo.length]],
      )
    }

    const handleClear = () => {
      datasetStore.removeFunctionConditionAsync(selectedFilter.name)

      filterStore.removeSelectedFilters({
        group: selectedFilter.vgroup,
        groupItemName: selectedFilter.name,
        variant: [selectedFilter.name, 0],
      })
      setIsVisibleMinError(false)
      setIsVisibleMaxError(false)
      setIsVisibleMixedError(false)
      setMin('')
      setMax('')
    }

    const validateMin = (value: string) => {
      if (
        value < selectedFilter.min ||
        value > selectedFilter.max ||
        value === '-0'
      ) {
        setIsVisibleMinError(true)
      } else {
        setIsVisibleMinError(false)
      }

      if (!value) setIsVisibleMinError(false)
    }

    const validateMax = (value: string) => {
      if (
        value > selectedFilter.max ||
        value < selectedFilter.min ||
        value === '-0'
      ) {
        setIsVisibleMaxError(true)
      } else {
        setIsVisibleMaxError(false)
      }

      if (!value) setIsVisibleMaxError(false)
    }

    useEffect(() => {
      if (min && max && +min > +max) {
        setIsVisibleMixedError(true)
      } else {
        setIsVisibleMixedError(false)
      }
    }, [min, max])

    return (
      <SessionStoreDataProvider<IRangePanelFormValues>
        storeKey={selectedFilter.name}
        values={{ min, max }}
        storePrefix={FILTER_REFINER_PREFIX}
      >
        <div>
          <div className="flex justify-between items-end w-full">
            <span>Min {selectedFilter.min}</span>

            {isVisibleMinError && (
              <span className="text-12 text-red-secondary">
                {t('dtree.lowerBoundError')}
              </span>
            )}
          </div>

          <InputNumber
            className="w-full"
            value={min}
            onChange={e => {
              setMin(e.target.value)
              validateMin(e.target.value)
            }}
          />

          <div className="flex justify-between items-end w-full">
            <span>Max {selectedFilter.max}</span>

            {isVisibleMaxError && (
              <span className="text-12 text-red-secondary">
                {t('dtree.upperBoundError')}
              </span>
            )}
          </div>

          <div className="relative h-14">
            <InputNumber
              className="w-full"
              value={max}
              onChange={e => {
                setMax(e.target.value)
                validateMax(e.target.value)
              }}
            />
            {isVisibleMixedError && (
              <div className="flex justify-center w-full mt-px text-12 text-red-secondary">
                {t('dtree.conditionError')}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-1">
            <Button
              variant={'secondary'}
              text={t('general.clear')}
              onClick={handleClear}
            />

            <Button
              text={t('general.add')}
              onClick={handleAddConditionsAsync}
              disabled={
                isVisibleMinError ||
                isVisibleMaxError ||
                isVisibleMixedError ||
                (!max && !min)
              }
            />
          </div>
        </div>
      </SessionStoreDataProvider>
    )
  },
)
