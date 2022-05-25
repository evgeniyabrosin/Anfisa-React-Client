import { ReactElement, useEffect, useMemo } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ApproxNameTypes } from '@core/enum/approxNameTypes'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import datasetStore from '@store/dataset/dataset'
import filterStore from '@store/filter'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { DisabledVariantsAmount } from '@pages/filter/dtree/components/query-builder/ui/disabled-variants-amount'
import { ConditionJoinMode } from '@service-providers/common'
import { ICompoundHetArgs } from '@service-providers/common/common.interface'
import { getApproxName } from '@utils/getApproxName'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import functionPanelStore from '../../function-panel.store'
import { AprroxAndState } from '../compound-request/components/approx-state'
import { PanelButtons } from '../panelButtons'
import compoundHetStore from './compound-het.store'

export const CompundHet = observer((): ReactElement => {
  const { selectedCondition, isRedactorMode, isFilterTouched } = filterStore

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
    filterStore.setTouched(true)
  }

  const onSubmit = () => {
    compoundHetStore.handleSumbitCondtions()
    filterStore.setTouched(false)
  }

  const setApprox = (newApprox: ApproxNameTypes) => {
    if (newApprox !== approx) filterStore.setTouched(true)
    compoundHetStore.setApprox(newApprox)
  }

  const toggleNotMode = () => {
    compoundHetStore.setCurrentMode(ModeTypes.Not)
    filterStore.setTouched(true)
  }

  const isButtonDisabled = useMemo(() => {
    if (!filterStore.conditions.length) {
      return !simpleVariants
    }

    if (
      filterStore.conditions.some(
        ([, filterName]) => filterName === FuncStepTypesEnum.CompoundHet,
      )
    ) {
      return !isFilterTouched
    }

    return !simpleVariants
  }, [isFilterTouched, simpleVariants])

  return (
    <>
      {compoundHetStore.statFuncStatus && (
        <div className="text-red-secondary">
          {compoundHetStore.statFuncStatus}
        </div>
      )}
      <AprroxAndState
        approx={approx}
        setApprox={setApprox}
        className={cn('mb-4', compoundHetStore.statFuncStatus && 'mt-2')}
      />

      <div className="flex justify-end mb-[-21px]">
        <AllNotMods
          isNotModeChecked={compoundHetStore.currentMode === ModeTypes.Not}
          isNotModeDisabled={!simpleVariants?.length}
          toggleNotMode={toggleNotMode}
        />
      </div>

      <div className="flex-1">
        <DisabledVariantsAmount variants={simpleVariants} disabled={true} />
      </div>

      <PanelButtons
        onSubmit={onSubmit}
        resetFields={handleClear}
        disabled={isButtonDisabled}
      />
    </>
  )
})
