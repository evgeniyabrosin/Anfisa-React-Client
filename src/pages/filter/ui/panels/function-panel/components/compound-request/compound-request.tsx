import React, { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { AllNotMods } from '@pages/filter/ui/query-builder/ui/all-not-mods'
import { DisabledVariantsAmount } from '@pages/filter/ui/query-builder/ui/disabled-variants-amount'
import { ConditionJoinMode } from '@service-providers/common'
import { ICompoundRequestArgs } from '@service-providers/common/common.interface'
import { getApproxName } from '@utils/getApproxName'
import { getApproxValue } from '@utils/getApproxValue'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import { AprroxAndState } from './approx-state'
import compoundRequestStore from './compound-request.store'
import { ControlButtons } from './control-buttons'
import { RequestConditions } from './request-conditions'
import { ResetSelect } from './reset-select'

export const CompoundRequest = observer((): ReactElement => {
  const { selectedCondition, isRedactorMode } = filterStore

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

  return (
    <React.Fragment>
      <div className="flex justify-between items-center w-full mt-4 text-14">
        <AprroxAndState
          approx={approx}
          setApprox={compoundRequestStore.setApprox}
        />

        <AllNotMods
          isNotModeChecked={compoundRequestStore.currentMode === ModeTypes.Not}
          isNotModeDisabled={
            simpleVariants ? simpleVariants.length === 0 : true
          }
          toggleNotMode={() =>
            compoundRequestStore.setCurrentMode(ModeTypes.Not)
          }
        />
      </div>

      <RequestConditions activeRequestIndex={activeRequestIndex} />

      <div className="flex items-center justify-between w-full mt-4 text-14">
        <ControlButtons activeRequestIndex={activeRequestIndex} />

        <ResetSelect />
      </div>

      <DisabledVariantsAmount variants={simpleVariants} disabled={true} />

      <PanelButtons
        onSubmit={() => compoundRequestStore.handleSumbitCondtions()}
        resetFields={() => compoundRequestStore.clearData()}
        disabled={!simpleVariants}
      />
    </React.Fragment>
  )
})
