import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Input } from '@ui//input'
import { validateLocusCondition } from '@utils/validation/validateLocusCondition'
import { DisabledVariantsAmount } from '../../../../query-builder/ui/disabled-variants-amount'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import geneRegionStore from './gene-region.store'

export const GeneRegion = observer(() => {
  const { locusValue, selectedFilterValue } = geneRegionStore

  const { simpleVariants } = functionPanelStore

  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false)

  const validateValue = (value: string): void => {
    validateLocusCondition({ value, setIsErrorVisible })
  }

  useEffect(() => {
    functionPanelStore.fetchStatFunc(
      FuncStepTypesEnum.GeneRegion,
      selectedFilterValue,
    )
  }, [selectedFilterValue])

  // to avoid displaying this data on the another func attr
  useEffect(() => {
    return () => filterStore.resetStatFuncData()
  }, [])

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
              geneRegionStore.setConditions(e.target.value)
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
          variants={simpleVariants}
          disabled={true}
          isErrorVisible={isErrorVisible}
        />
      </div>

      <PanelButtons
        onSubmit={() => geneRegionStore.handleSumbitCondtions()}
        resetFields={() =>
          functionPanelStore.clearCachedValues(FuncStepTypesEnum.GeneRegion)
        }
        disabled={!simpleVariants || isErrorVisible}
        selectedFilterValue={selectedFilterValue}
      />
    </React.Fragment>
  )
})
