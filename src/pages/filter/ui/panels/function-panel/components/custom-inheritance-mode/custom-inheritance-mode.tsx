import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import filterStore from '@store/filter'
import { CustomInheritanceModeContent } from '@pages/filter/ui/query-builder/ui/custom-inheritance-mode-content'
import { getStringScenario } from '@utils/function-panel/getStringScenario'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import customInheritanceModeStore from './custom-inheritance-mode.store'

export const CustomInheritanceMode = observer(() => {
  const { simpleVariants, problemGroups } = functionPanelStore

  const { cachedValues, scenario, reset, selectStates } =
    customInheritanceModeStore

  const setComplexScenario = (resetName: string): void => {
    customInheritanceModeStore.setComplexScenario(resetName)
  }

  const setSingleScenario = (group: string, selectValue: string): void => {
    customInheritanceModeStore.setSingleScenario(group, selectValue)
  }

  // check if there is some data in cachedValues from preset
  useEffect(() => {
    const params = `{"scenario":${
      cachedValues ? `{${getStringScenario(scenario)}}` : '{}'
    }}`

    functionPanelStore.fetchStatFunc('Custom_Inheritance_Mode', params)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedValues])

  // to avoid displaying this data on the another func attr
  useEffect(() => {
    return () => filterStore.resetStatFuncData()
  }, [])

  return (
    <React.Fragment>
      <CustomInheritanceModeContent
        problemGroups={problemGroups}
        handleSetScenario={setSingleScenario}
        selectStates={selectStates}
        handleReset={setComplexScenario}
        resetValue={reset}
        isNotModeChecked={
          customInheritanceModeStore.currentMode === ModeTypes.Not
        }
        toggleNotMode={() =>
          customInheritanceModeStore.setCurrentMode(ModeTypes.Not)
        }
      />

      <PanelButtons
        onSubmit={() => customInheritanceModeStore.handleSumbitCondtions()}
        resetFields={() =>
          functionPanelStore.clearCachedValues(
            FuncStepTypesEnum.CustomInheritanceMode,
          )
        }
        disabled={!simpleVariants}
      />
    </React.Fragment>
  )
})
