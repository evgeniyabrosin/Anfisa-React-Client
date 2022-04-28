import React, { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { DisabledVariantsAmount } from '@pages/filter/dtree/components/query-builder/ui/disabled-variants-amount'
import { ConditionJoinMode } from '@service-providers/common'
import { ICompoundHetArgs } from '@service-providers/common/common.interface'
import { getApproxName } from '@utils/getApproxName'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import functionPanelStore from '../../function-panel.store'
import { AprroxAndState } from '../compound-request/approx-state'
import { PanelButtons } from '../panelButtons'
import compoundHetStore from './compound-het.store'

export const CompundHet = observer((): ReactElement => {
  const { selectedCondition, isRedactorMode } = filterStore

  const { simpleVariants } = functionPanelStore

  const { approx } = compoundHetStore

  // set/reset data
  useEffect(() => {
    if (selectedCondition && isRedactorMode) {
      const conditionJoinType = selectedCondition[2] as ConditionJoinMode

      compoundHetStore.setCurrentMode(getCurrentModeType(conditionJoinType))

      if (!datasetStore.isXL) {
        const selectedFilterApprox = selectedCondition[4] as ICompoundHetArgs
        const approxName = getApproxName(
          selectedFilterApprox['approx'] || undefined,
        )
        compoundHetStore.setApprox(approxName)
      }
    }

    if (!isRedactorMode) {
      compoundHetStore.resetApprox()
      compoundHetStore.resetCurrentMode()
    }
  }, [isRedactorMode, selectedCondition])

  // update data
  useEffect(() => {
    compoundHetStore.getStatFuncStatusAsync()
  }, [approx])

  // to avoid displaying this data on the another func attr
  useEffect(() => {
    return () => filterStore.resetStatFuncData()
  }, [])

  const handleClear = () => {
    compoundHetStore.handleResetFields()
    compoundHetStore.resetCurrentMode()
  }

  return (
    <React.Fragment>
      <div className="text-red-secondary">
        {compoundHetStore.statFuncStatus}
      </div>
      <div className="flex justify-between items-center w-full mt-4 text-14">
        <AprroxAndState
          approx={approx}
          setApprox={compoundHetStore.setApprox}
        />

        <AllNotMods
          isNotModeChecked={compoundHetStore.currentMode === ModeTypes.Not}
          isNotModeDisabled={
            simpleVariants ? simpleVariants.length === 0 : true
          }
          toggleNotMode={() => compoundHetStore.setCurrentMode(ModeTypes.Not)}
        />
      </div>

      <div className="mt-4">
        <DisabledVariantsAmount variants={simpleVariants} disabled={true} />
      </div>

      <PanelButtons
        onSubmit={() => compoundHetStore.handleSumbitCondtions()}
        resetFields={handleClear}
        disabled={!simpleVariants}
      />
    </React.Fragment>
  )
})
