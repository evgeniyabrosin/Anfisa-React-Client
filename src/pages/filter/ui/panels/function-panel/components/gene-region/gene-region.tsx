import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Input } from '@ui//input'
import { AllNotMods } from '@pages/filter/ui/query-builder/ui/all-not-mods'
import { ConditionJoinMode } from '@service-providers/common'
import { IGeneRegionArgs } from '@service-providers/common/common.interface'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import { validateLocusCondition } from '@utils/validation/validateLocusCondition'
import { DisabledVariantsAmount } from '../../../../query-builder/ui/disabled-variants-amount'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import geneRegionStore from './gene-region.store'

export const GeneRegion = observer(() => {
  const { selectedFilter, isRedactorMode } = filterStore

  const { simpleVariants } = functionPanelStore

  const { locusValue, selectedFilterValue } = geneRegionStore

  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false)

  const validateValue = (value: string): void => {
    validateLocusCondition({ value, setIsErrorVisible })
  }

  const handleResetFields = () => {
    geneRegionStore.resetLocusValue()
    setIsErrorVisible(false)
    geneRegionStore.resetCurrentMode()
  }

  // set/reset data
  useEffect(() => {
    if (selectedFilter && isRedactorMode) {
      const selectedFilterConditions = selectedFilter[4] as IGeneRegionArgs
      const selectedFilterLocusValue = selectedFilterConditions['locus']
      const conditionJoinType = selectedFilter[2] as ConditionJoinMode

      geneRegionStore.setCurrentMode(getCurrentModeType(conditionJoinType))
      geneRegionStore.setLocusValue(selectedFilterLocusValue)
    }

    if (!isRedactorMode) {
      geneRegionStore.resetLocusValue()
      geneRegionStore.resetCurrentMode()
    }
  }, [isRedactorMode, selectedFilter])

  // update data
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
        <div className="flex justify-between items-center mb-2">
          <span className="text-14 leading-16px text-grey-blue font-bold">
            Locus
          </span>

          <AllNotMods
            isNotModeChecked={geneRegionStore.currentMode === ModeTypes.Not}
            isNotModeDisabled={
              simpleVariants ? simpleVariants.length === 0 : true
            }
            toggleNotMode={() => geneRegionStore.setCurrentMode(ModeTypes.Not)}
          />
        </div>

        <div className="relative flex">
          <Input
            value={locusValue}
            onChange={e => {
              geneRegionStore.setLocusValue(e.target.value)
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
        resetFields={handleResetFields}
        disabled={!simpleVariants || isErrorVisible}
      />
    </React.Fragment>
  )
})
