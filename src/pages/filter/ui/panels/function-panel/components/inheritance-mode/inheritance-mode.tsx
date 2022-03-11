import React, { ChangeEvent, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import filterStore from '@store/filter'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import { ComplexVariants } from './complex-variants'
import inheritanceModeStore from './inheritance-mode.store'
import { ProblemGroups } from './problem-groups'

export const InheritanceMode = observer(() => {
  const { problemGroups, filteredComplexVariants } = functionPanelStore

  const {
    cachedValues,
    problemGroupValues,
    variantsValues,
    selectedFilterValue,
  } = inheritanceModeStore

  const handleChangeProblemGroups = (
    e: ChangeEvent<HTMLInputElement>,
    problemGroup: string,
  ) => {
    inheritanceModeStore.handleChangeProblemGroups(e, problemGroup)
  }

  const handleChangeVariants = (
    e: ChangeEvent<HTMLInputElement>,
    variantName: string,
  ) => {
    inheritanceModeStore.handleChangeVariants(e, variantName)
  }

  // check if there is some data in cachedValues from preset
  useEffect(() => {
    functionPanelStore.fetchStatFunc(
      FuncStepTypesEnum.InheritanceMode,
      JSON.stringify({
        problem_group: problemGroupValues || [],
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedValues])

  // to avoid displaying this data on the another func attr
  useEffect(() => {
    return () => filterStore.resetStatFuncData()
  }, [])

  return (
    <React.Fragment>
      <ProblemGroups
        problemGroups={problemGroups}
        problemGroupValues={problemGroupValues}
        handleChangeProblemGroups={handleChangeProblemGroups}
      />

      <div className="h-px w-full bg-white my-4" />

      <ComplexVariants
        variantsValues={variantsValues}
        problemGroupValues={problemGroupValues}
        filteredComplexVariants={filteredComplexVariants}
        handleChangeVariants={handleChangeVariants}
      />

      <PanelButtons
        onSubmit={inheritanceModeStore.handleSumbitCondtions}
        resetFields={() =>
          inheritanceModeStore.handleResetAllFieldsLocally(problemGroupValues)
        }
        disabled={variantsValues.length === 0}
        selectedFilterValue={selectedFilterValue}
      />
    </React.Fragment>
  )
})
