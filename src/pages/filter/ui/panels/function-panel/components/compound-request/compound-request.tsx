import React, { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import filterStore from '@store/filter'
import { DisabledVariantsAmount } from '@pages/filter/ui/query-builder/ui/disabled-variants-amount'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import { AprroxAndState } from './approx-state'
import compoundRequestStore from './compound-request.store'
import { ControlButtons } from './control-buttons'
import { RequestConditions } from './request-conditions'
import { ResetSelect } from './reset-select'

export const resetOptions = [
  'Homozygous Recessive/X-linked',
  'Autosomal Dominant',
  'Compensational',
]

export const CompoundRequest = observer((): ReactElement => {
  const { cachedValues, requestCondition, selectedFilterValue } =
    compoundRequestStore

  const { simpleVariants } = functionPanelStore

  const [activeRequestIndex, setActiveRequestIndex] = useState<number>(
    requestCondition.length - 1,
  )

  // check if there is some data in cachedValues from preset
  useEffect(() => {
    const params = `{"approx":${null},"state":${null},${selectedFilterValue}`

    functionPanelStore.fetchStatFunc(FuncStepTypesEnum.CompoundRequest, params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedValues])

  const handleResetFields = () => {
    setActiveRequestIndex(0)
    filterStore.clearFilterCondition(FuncStepTypesEnum.CompoundRequest)
  }

  return (
    <React.Fragment>
      <AprroxAndState simpleVariants={simpleVariants} />

      <RequestConditions
        activeRequestIndex={activeRequestIndex}
        setActiveRequestIndex={setActiveRequestIndex}
      />

      <div className="flex items-center justify-between w-full mt-4 text-14">
        <ControlButtons
          activeRequestIndex={activeRequestIndex}
          setActiveRequestIndex={setActiveRequestIndex}
        />

        <ResetSelect activeRequestIndex={activeRequestIndex} />
      </div>

      <DisabledVariantsAmount variants={simpleVariants} disabled={true} />

      <PanelButtons
        onSubmit={() => compoundRequestStore.handleSumbitCondtions()}
        resetFields={handleResetFields}
        disabled={!simpleVariants}
        selectedFilterValue={selectedFilterValue}
      />
    </React.Fragment>
  )
})
