import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Input } from '@ui//input'
import {
  ConditionJoinMode,
  TFuncCondition,
  TVariant,
} from '@service-providers/common/common.interface'
import { validateLocusCondition } from '@utils/validation/validateLocusCondition'
import { DisabledVariantsAmount } from '../../../query-builder/ui/disabled-variants-amount'
import { IGeneRegionCachedValues } from '../function-panel.interface'
import functionPanelStore from '../function-panel.store'
import { PanelButtons } from './panelButtons'

export const GeneRegion = observer(() => {
  const cachedValues =
    functionPanelStore.getCachedValues<IGeneRegionCachedValues>(
      FuncStepTypesEnum.GeneRegion,
    )

  const locusValue: string = cachedValues?.conditions.locus || ''
  const variants: string[] = functionPanelStore.variants

  const selectedFilterName: string = functionPanelStore.filterName
  const selectedFilterGroup: string = functionPanelStore.filterGroup

  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false)

  const validateValue = (value: string): void => {
    validateLocusCondition({ value, setIsErrorVisible })
  }

  useEffect(() => {
    const params: string = `{"locus":"${locusValue}"}`

    functionPanelStore.fetchStatFunc(FuncStepTypesEnum.GeneRegion, params)

    return () => filterStore.resetStatFuncData()
  }, [locusValue])

  const setLocusValue = (value: string): void => {
    functionPanelStore.setCachedValues(FuncStepTypesEnum.GeneRegion, {
      conditions: { locus: value },
    })
  }

  const handleResetFields = (): void => {
    functionPanelStore.clearCachedValues(FuncStepTypesEnum.GeneRegion)
  }

  const handleSumbitCondtions = (): void => {
    const conditions: TFuncCondition = [
      'func',
      FuncStepTypesEnum.GeneRegion,
      ConditionJoinMode.OR,
      ['True'],
      { locus: locusValue },
    ]

    const variant: TVariant = [`{"locus":"${locusValue}"}`, 0]

    functionPanelStore.handleSumbitConditions(conditions, variant)
  }

  return (
    <React.Fragment>
      <div className="mt-4">
        <span className="text-14 leading-16px text-grey-blue font-bold">
          Locus
        </span>

        <div className="relative flex">
          <Input
            value={locusValue}
            onChange={e => {
              setLocusValue(e.target.value)
              validateValue(e.target.value)
            }}
          />

          {isErrorVisible && (
            <div className="absolute -bottom-4 flex items-center mt-1 h-3 text-10 text-red-secondary">
              {t('dtree.chromosomeNameIsNotCorrect')}
            </div>
          )}
        </div>

        <DisabledVariantsAmount
          variants={variants}
          disabled={true}
          isErrorVisible={isErrorVisible}
        />
      </div>

      <PanelButtons
        selectedFilterName={selectedFilterName}
        selectedFilterGroup={selectedFilterGroup}
        onSubmit={handleSumbitCondtions}
        resetFields={handleResetFields}
        disabled={!variants || isErrorVisible}
      />
    </React.Fragment>
  )
})
