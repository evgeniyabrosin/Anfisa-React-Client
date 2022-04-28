import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { CustomInheritanceModeContent } from '@pages/filter/dtree/components/query-builder/ui/custom-inheritance-mode-content'
import { ConditionJoinMode } from '@service-providers/common'
import { ICustomInheritanceModeArgs } from '@service-providers/common/common.interface'
import { getStringScenario } from '@utils/function-panel/getStringScenario'
import { getCurrentModeType } from '@utils/getCurrentModeType'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import customInheritanceModeStore from './custom-inheritance-mode.store'

export const CustomInheritanceMode = observer(() => {
  const { selectedCondition, isRedactorMode, isFilterTouched } = filterStore

  const { simpleVariants, problemGroups } = functionPanelStore

  const { selectStates, scenario, resetValue } = customInheritanceModeStore

  const setComplexScenario = (resetName: string): void => {
    if (resetValue !== resetName) filterStore.setTouched(true)
    customInheritanceModeStore.setComplexScenario(resetName)
  }

  const setSingleScenario = (group: string, selectValue: string): void => {
    problemGroups.forEach((gName, index) => {
      if (gName === group && selectStates[index] !== selectValue) {
        filterStore.setTouched(true)
      }
    })
    customInheritanceModeStore.setSingleScenario(group, selectValue)
  }

  // set/reset data
  useEffect(() => {
    if (selectedCondition && isRedactorMode) {
      const selectedFilterScenario =
        selectedCondition[4] as ICustomInheritanceModeArgs
      const selectedFilterScenarioArray = Object.entries(
        selectedFilterScenario['scenario'],
      )
      const conditionJoinType = selectedCondition[2] as ConditionJoinMode

      customInheritanceModeStore.setCurrentMode(
        getCurrentModeType(conditionJoinType),
      )
      customInheritanceModeStore.setScenario(selectedFilterScenarioArray)
    }

    if (!isRedactorMode) {
      customInheritanceModeStore.clearScenario()
      customInheritanceModeStore.clearResetValue()
      customInheritanceModeStore.resetCurrentMode()
    }
  }, [isRedactorMode, selectedCondition])

  // update data
  useEffect(() => {
    const params = `{"scenario":${
      scenario.length > 0 ? `{${getStringScenario(scenario)}}` : '{}'
    }}`

    functionPanelStore.fetchStatFunc('Custom_Inheritance_Mode', params)
  }, [scenario])

  // to avoid displaying this data on the another func attr
  useEffect(() => {
    return () => filterStore.resetStatFuncData()
  }, [])

  const onSubmit = () => {
    customInheritanceModeStore.handleSumbitCondtions()
    filterStore.setTouched(false)
  }

  const resetFields = () => {
    customInheritanceModeStore.clearData()
    filterStore.setTouched(true)
  }

  const toggleNotMode = () => {
    customInheritanceModeStore.setCurrentMode(ModeTypes.Not)
    filterStore.setTouched(true)
  }

  return (
    <>
      <CustomInheritanceModeContent
        problemGroups={problemGroups}
        handleSetScenario={setSingleScenario}
        selectStates={selectStates}
        handleReset={setComplexScenario}
        resetValue={resetValue}
        isNotModeChecked={
          customInheritanceModeStore.currentMode === ModeTypes.Not
        }
        toggleNotMode={toggleNotMode}
      />

      <PanelButtons
        onSubmit={onSubmit}
        resetFields={resetFields}
        disabled={!simpleVariants || !isFilterTouched}
      />
    </>
  )
})
