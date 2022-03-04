import React, { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import filterStore from '@store/filter'
import { DisabledVariantsAmount } from '@pages/filter/ui/query-builder/ui/disabled-variants-amount'
import { getFilteredRequestCondition } from '@utils/function-panel/getFilteredRequestCondition'
import { getPureRequestString } from '@utils/function-panel/getPureRequestString'
import { getFuncParams } from '@utils/getFuncParams'
import functionPanelStore from '../../function-panel.store'
import { PanelButtons } from '../panelButtons'
import { AprroxAndState } from './approx-state'
import compoundRequestStore from './compound-request.store'
import { ControlButtons } from './control-buttons'
import { RequestConditions } from './RequestConditions'
import { ResetSelect } from './reset-select'

export const resetOptions = [
  'Homozygous Recessive/X-linked',
  'Autosomal Dominant',
  'Compensational',
]

export const CompoundRequest = observer((): ReactElement => {
  const { cachedValues, requestCondition } = compoundRequestStore

  const { filterName, filterGroup, simpleVariants } = functionPanelStore

  const [activeRequestIndex, setActiveRequestIndex] = useState(
    requestCondition.length - 1,
  )

  // check if there is some data in cachedValues from preset
  useEffect(() => {
    const filteredRequestCondition = getFilteredRequestCondition(
      cachedValues?.conditions.request || requestCondition,
    )

    const requestString = getFuncParams(FuncStepTypesEnum.CompoundRequest, {
      request: filteredRequestCondition,
    }).replace(/\s+/g, '')

    const params = `{"approx":${null},"state":${null},"request":${getPureRequestString(
      requestString,
    )}}`

    functionPanelStore.fetchStatFunc(FuncStepTypesEnum.CompoundRequest, params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedValues])

  const handleResetFields = () => {
    setActiveRequestIndex(0)
    filterStore.clearFilterCondition(FuncStepTypesEnum.CompoundRequest)
  }

  return (
    <React.Fragment>
      <AprroxAndState />

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
        selectedFilterName={filterName}
        selectedFilterGroup={filterGroup}
        onSubmit={() => compoundRequestStore.handleSumbitCondtions()}
        resetFields={handleResetFields}
        disabled={!simpleVariants}
      />
    </React.Fragment>
  )
})
