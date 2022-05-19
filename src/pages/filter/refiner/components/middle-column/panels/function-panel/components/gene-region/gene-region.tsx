import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { DisabledVariantsAmount } from '@pages/filter/dtree/components/query-builder/ui/disabled-variants-amount'
import { GeneRegionInput } from '@pages/filter/refiner/components/middle-column/panels/function-panel/components/gene-region/components/gene-region-input/gene-region-input'
import { ConditionJoinMode } from '@service-providers/common'
import { IGeneRegionArgs } from '@service-providers/common/common.interface'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import geneRegionStore from './gene-region.store'

export const GeneRegion = observer(() => {
  const { selectedCondition, isRedactorMode, isFilterTouched } = filterStore

  const { simpleVariants } = functionPanelStore

  const [error, setError] = useState<string>('')
  const [locusValue, setLocusValue] = useState<string>('')

  const handleResetFields = () => {
    geneRegionStore.resetCurrentMode()
    filterStore.setTouched(true)
    setLocusValue('')
  }

  // set/reset data
  useEffect(() => {
    if (selectedCondition && isRedactorMode) {
      const selectedFilterConditions = selectedCondition[4] as IGeneRegionArgs
      const selectedFilterLocusValue = selectedFilterConditions['locus']
      const conditionJoinType = selectedCondition[2] as ConditionJoinMode

      geneRegionStore.setCurrentMode(getCurrentModeType(conditionJoinType))
      setLocusValue(selectedFilterLocusValue)
    }

    if (!isRedactorMode) {
      setLocusValue('')
      geneRegionStore.resetCurrentMode()
    }
  }, [isRedactorMode, selectedCondition])

  const handleSetLocusValue = async (value: string) => {
    if (locusValue !== value) {
      filterStore.setTouched(true)
    }

    setLocusValue(value)

    const result = await functionPanelStore.fetchStatFunc(
      FuncStepTypesEnum.GeneRegion,
      `{"locus":"${value}"}`,
    )

    if (result.err) {
      setError(result.err)
    }

    if (!result.err && error) {
      setError('')
    }
  }

  const handleSumbitCondtions = () => {
    geneRegionStore.handleSumbitCondtions(locusValue)
    setLocusValue('')
    filterStore.setTouched(false)
  }

  const toggleNotMode = () => {
    geneRegionStore.setCurrentMode(ModeTypes.Not)
    filterStore.setTouched(true)
  }

  // to avoid displaying this data on the another func attr
  useEffect(() => {
    return () => filterStore.resetStatFuncData()
  }, [])

  return (
    <>
      <span className="text-14 leading-16px text-grey-blue font-medium mb-1">
        Locus
      </span>

      <GeneRegionInput
        value={locusValue}
        handleChange={handleSetLocusValue}
        error={error}
      />

      <AllNotMods
        isNotModeChecked={geneRegionStore.currentMode === ModeTypes.Not}
        isNotModeDisabled={simpleVariants ? !simpleVariants.length : true}
        toggleNotMode={toggleNotMode}
        classname="flex justify-end items-center mt-[21px] mb-[-41px]"
      />

      <DisabledVariantsAmount
        variants={simpleVariants}
        disabled={true}
        isErrorVisible={!!error}
        classname="mt-[21px] flex-1"
      />

      <PanelButtons
        onSubmit={handleSumbitCondtions}
        resetFields={handleResetFields}
        disabled={!!error || !isFilterTouched}
      />
    </>
  )
})
