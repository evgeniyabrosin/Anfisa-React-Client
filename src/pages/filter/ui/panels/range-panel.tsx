import { ReactElement, useEffect, useState } from 'react'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { NumericExpressionTypes } from '@core/enum/numeric-expression-types'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { InputNumber } from '@ui/input-number'
import { TNumericCondition } from '@service-providers/common/common.interface'
import { createNumericExpression } from '@utils/createNumericExpression'

type TNumericExpression = [null | number, boolean, null | number, boolean]

const getCachedValues = () => {
  return filterStore.readFilterCondition<TNumericExpression>(
    filterStore.selectedGroupItem.name,
  )
}

const getFilterValue = (arg: string): string | number => {
  const filterExpression = getCachedValues()

  if (filterExpression) {
    if (arg === 'min' && typeof filterExpression[0] === 'number') {
      return filterExpression[0]
    }

    if (arg === 'max' && typeof filterExpression[2] === 'number') {
      return filterExpression[2]
    }
  }

  return ''
}

export const RangePanel = observer((): ReactElement => {
  const selectedFilter = filterStore.selectedGroupItem

  const [min, setMin] = useState<string | number>(getFilterValue('min'))
  const [max, setMax] = useState<string | number>(getFilterValue('max'))

  const [isVisibleMinError, setIsVisibleMinError] = useState(false)
  const [isVisibleMaxError, setIsVisibleMaxError] = useState(false)
  const [isVisibleMixedError, setIsVisibleMixedError] = useState(false)

  const handleAddConditionsAsync = async () => {
    if (datasetStore.activePreset) datasetStore.resetActivePreset()

    const condition: TNumericCondition = [
      FilterKindEnum.Numeric,
      selectedFilter.name,
      createNumericExpression({
        expType: NumericExpressionTypes.GreaterThan,
        minValue: min,
        maxValue: max,
      }),
    ]

    filterStore.addFilterBlock(condition as TNumericCondition)
    datasetStore.fetchDsStatAsync()

    if (!datasetStore.isXL) {
      datasetStore.fetchWsListAsync()
    }
  }

  const handleClear = () => {
    const filterName = filterStore.selectedGroupItem.vgroup

    // TODO: this logic for deletion attr
    // if (!datasetStore.isXL) {
    //   datasetStore.fetchWsListAsync()
    // }

    setIsVisibleMinError(false)
    setIsVisibleMaxError(false)
    setIsVisibleMixedError(false)
    setMin('')
    setMax('')
    filterStore.clearFilterCondition(filterName)
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

    filterStore.setFilterCondition(
      filterStore.selectedGroupItem.name,
      createNumericExpression({
        expType: NumericExpressionTypes.GreaterThan,
        minValue: min,
        maxValue: max,
      }),
    )
  }, [min, max])

  useEffect(() => {
    const dispose = reaction(
      () => filterStore.selectedGroupItem.name,
      () => {
        setMin(getFilterValue('min'))
        setMax(getFilterValue('max'))
      },
    )

    return () => dispose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="flex justify-between items-end w-full">
        <span>Min {selectedFilter.min}</span>

        {isVisibleMinError && (
          <span className="text-12 text-red-secondary">
            {t('numericCondition.lowerBoundError')}
          </span>
        )}
      </div>

      <InputNumber
        className="w-full border border-grey-blue"
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
            {t('numericCondition.upperBoundError')}
          </span>
        )}
      </div>

      <div className="relative h-14">
        <InputNumber
          className="w-full border border-grey-blue"
          value={max}
          onChange={e => {
            setMax(e.target.value)
            validateMax(e.target.value)
          }}
        />
        {isVisibleMixedError && (
          <div className="flex justify-center w-full mt-px text-12 text-red-secondary">
            {t('numericCondition.conditionError')}
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
  )
})
