import React, { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset/dataset'
import filterStore from '@store/filter'
import { InheritanceModeSelect } from '@pages/filter/dtree/components/query-builder/components/inheritance-mode-select'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { DisabledVariantsAmount } from '@pages/filter/dtree/components/query-builder/ui/disabled-variants-amount'
import { DividerHorizontal } from '@pages/filter/refiner/components/middle-column/components/divider-horizontal'
import { ConditionJoinMode } from '@service-providers/common'
import { ICompoundRequestArgs } from '@service-providers/common/common.interface'
import { getApproxName } from '@utils/getApproxName'
import { getApproxValue } from '@utils/getApproxValue'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import { AprroxAndState } from './components/approx-state'
import { ControlButtons } from './components/control-buttons'
import { RequestConditions } from './components/request-conditions'
import compoundRequestStore from './compound-request.store'

export const CompoundRequest = observer((): ReactElement => {
  const { selectedCondition, isRedactorMode, isFilterTouched } = filterStore

  const { simpleVariants } = functionPanelStore

  const { selectedFilterValue, requestCondition, activeRequestIndex, approx } =
    compoundRequestStore

  // set/reset data
  useEffect(() => {
    if (selectedCondition && isRedactorMode) {
      const selectedFilterConditions =
        selectedCondition[4] as ICompoundRequestArgs
      const selectedFilterRequest = selectedFilterConditions['request']
      const conditionJoinType = selectedCondition[2] as ConditionJoinMode

      compoundRequestStore.setCurrentMode(getCurrentModeType(conditionJoinType))
      compoundRequestStore.setRequestCondition(selectedFilterRequest)

      if (!datasetStore.isXL) {
        const selectedFilterApprox =
          selectedCondition[4] as ICompoundRequestArgs

        const approxName = getApproxName(
          selectedFilterApprox['approx'] || undefined,
        )

        compoundRequestStore.setApprox(approxName)
      }
    }

    if (!isRedactorMode) {
      compoundRequestStore.clearData()
    }
  }, [isRedactorMode, selectedCondition])

  // update data
  useEffect(() => {
    filterStore.fetchStatFuncAsync(
      FuncStepTypesEnum.CompoundRequest,
      JSON.stringify({
        approx: datasetStore.isXL ? null : getApproxValue(approx),
        state: null,
        request: JSON.parse(selectedFilterValue),
      }),
    )
  }, [requestCondition, selectedFilterValue, approx])

  // to avoid displaying this data on the another func attr
  useEffect(() => {
    return () => filterStore.resetStatFuncData()
  }, [])

  const setApprox = (newApprox: ApproxNameTypes) => {
    if (newApprox !== approx) filterStore.setTouched(true)
    compoundRequestStore.setApprox(newApprox)
  }

  const toggleNotMode = () => {
    compoundRequestStore.setCurrentMode(ModeTypes.Not)
    filterStore.setTouched(true)
  }

  const onSubmit = () => {
    compoundRequestStore.handleSumbitCondtions()
    filterStore.setTouched(false)
  }

  const resetFields = () => {
    compoundRequestStore.clearData()
    filterStore.setTouched(true)
  }

  const handleReset = (value: string) => {
    if (compoundRequestStore.resetValue !== value) {
      filterStore.setTouched(true)
    }
    compoundRequestStore.handleSetComplexRequest(value)
  }

  return (
    <>
      <AprroxAndState approx={approx} setApprox={setApprox} />

      <DividerHorizontal />

      <RequestConditions activeRequestIndex={activeRequestIndex} />

      <div className="flex items-center justify-end w-full text-14">
        <ControlButtons activeRequestIndex={activeRequestIndex} />
      </div>

      <DividerHorizontal />

      <InheritanceModeSelect
        handleReset={handleReset}
        resetValue={compoundRequestStore.resetValue}
      />

      <DividerHorizontal />

      <div className="flex justify-end mb-[-21px]">
        <AllNotMods
          isNotModeChecked={compoundRequestStore.currentMode === ModeTypes.Not}
          isNotModeDisabled={simpleVariants ? !simpleVariants.length : true}
          toggleNotMode={toggleNotMode}
        />
      </div>

      <div className="flex-1">
        <DisabledVariantsAmount variants={simpleVariants} disabled={true} />
      </div>

      <PanelButtons
        onSubmit={onSubmit}
        resetFields={resetFields}
        disabled={!simpleVariants || !isFilterTouched}
      />
    </>
  )
})
