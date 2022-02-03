import { ReactElement, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { cloneDeep, get } from 'lodash'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { InputNumber } from '@ui/input-number'
import { Select } from '@ui/select'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { getFuncParams } from '@utils/getFuncParams'
import { getRequestData } from '@utils/getRequestData'
import { getResetRequestData } from '@utils/getResetRequestData'
import { getResetType } from '@utils/getResetType'
import { getSortedArray } from '@utils/getSortedArray'
import { resetOptions } from '../../compound-request'
import { AllNotModalMods } from './all-not-modal-mods'
import { ApproxStateModalMods } from './approx-state-modal-mods'
import { DisabledVariantsAmount } from './disabled-variants-amount'
import { EditModalButtons } from './edit-modal-buttons'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'
import { IParams } from './modal-edit-compound-het'
import { selectOptions } from './modal-select-custom-inheritance-mode'

export const ModalEditCompoundRequest = observer((): ReactElement => {
  const ref = useRef(null)

  // important variables

  const currentStepIndex = dtreeStore.currentStepIndex
  const currentGroupIndex = dtreeStore.groupIndexToChange

  const currentGroup =
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

  const groupName = dtreeStore.groupNameToChange

  const variants = dtreeStore.statFuncData.variants

  const approxValues: string[] = []
  const approxOptions: string[] = []

  let attrData: any

  const subGroups = Object.values(dtreeStore.getQueryBuilder)

  subGroups.map(subGroup => {
    subGroup.map((item, currNo) => {
      if (item.name === groupName) {
        attrData = subGroup[currNo]
      }
    })
  })

  // approx-condition & state-condition & request-condition functions

  const [resetValue, setResetValue] = useState('')

  attrData['approx-modes'].map((mode: string[]) => {
    approxOptions.push(mode[1])
    approxValues.push(mode[0])
  })

  const [stateCondition, setStateCondition] = useState(getDefaultValue('state'))

  const [approxCondition, setApproxCondition] = useState(
    getDefaultValue('approx'),
  )

  const [requestCondition, setRequestCondition] = useState(
    currentGroup[currentGroup.length - 1].request,
  )

  const getStateOptions = () => {
    const state = get(currentGroup[currentGroup.length - 1], 'state')
    const defaultValue = get(currentGroup[currentGroup.length - 1], 'default')

    if (!state) return ['-current-']

    return defaultValue === null || defaultValue ? state : ['-current-', state]
  }

  const stateOptions: string[] = getStateOptions()

  function getDefaultValue(type: string) {
    const approx = get(currentGroup[currentGroup.length - 1], 'approx')
    const state = get(currentGroup[currentGroup.length - 1], 'state')
    const defaultValue = get(currentGroup[currentGroup.length - 1], 'default')

    if (type === 'approx') {
      if (approx === null) return 'transcript'

      if (!approx) return 'transcript'

      return `${approx}`
    }

    if (type === 'state') {
      if (state === undefined) return '-current-'

      if (defaultValue === null) return '-current-'

      return defaultValue ? defaultValue : state
    }
  }

  const handleSetCondition = (value: string, type: string) => {
    const indexForApi = dtreeStore.getStepIndexForApi(currentStepIndex)

    if (type === 'approx') {
      setApproxCondition(value)

      const approx = value === 'transcript' ? null : `"${value}"`

      const request = getFuncParams(groupName, {
        approx: value,
        request: requestCondition,
      })
        .slice(10)
        .replace(/\s+/g, '')

      const params = `{"approx":${approx},"state":${
        stateCondition !== '-current-' ? `"${stateCondition}"` : null
      },"request":${request}}`

      dtreeStore.setCurrentStepIndexForApi(indexForApi)

      dtreeStore.fetchStatFuncAsync(groupName, params)
    }

    if (type === 'state') {
      setStateCondition(value)

      const approx =
        approxCondition === 'transcript' ? null : `"${approxCondition}"`

      const params = `{"approx":${approx},"state":${
        value !== '-current-' ? `"${value}"` : null
      }}`

      dtreeStore.setCurrentStepIndexForApi(indexForApi)

      dtreeStore.fetchStatFuncAsync(groupName, params)
    }
  }

  const [activeRequestIndex, setActiveRequestIndex] = useState(
    requestCondition.length - 1,
  )

  const handleActiveRequest = (requestBlockIndex: number, event: any) => {
    const classList = Array.from(event.target.classList)

    const shouldMakeActive = classList.includes('step-content-area')

    if (shouldMakeActive) {
      setActiveRequestIndex(requestBlockIndex)
    }

    const currentRequest = requestCondition[requestBlockIndex]

    setResetValue(getResetType(currentRequest[1]))
  }

  const handleRequestBlocksAmount = (type: string) => {
    if (type === 'ADD') {
      const emptyBlock: [number, any] = [1, {}]
      const newRequestCondition = [...cloneDeep(requestCondition), emptyBlock]

      setRequestCondition(newRequestCondition)
      setActiveRequestIndex(newRequestCondition.length - 1)
      setResetValue('')
    } else {
      const newRequestCondition = cloneDeep(requestCondition).filter(
        (_item: any[], index: number) => index !== activeRequestIndex,
      )

      setRequestCondition(newRequestCondition)
      setActiveRequestIndex(newRequestCondition.length - 1)

      sendRequest(newRequestCondition)

      setResetValue(
        getResetType(newRequestCondition[newRequestCondition.length - 1][1]),
      )
    }
  }

  function getSelectedValue(group: string, index: number): any {
    let value = '--'

    const currentRequestBlock = requestCondition[index][1]

    Object.entries(currentRequestBlock).map((item: any[]) => {
      if (item[1].includes(group)) {
        value = item[0]
      }
    })

    return value
  }

  const handleRequestConditionNumber = (
    requestBlockIndex: number,
    value: number,
  ) => {
    if (value < 0) return

    const newRequestCondition: any[] = cloneDeep(requestCondition)

    newRequestCondition.map((item: any[], index: number) => {
      if (index === requestBlockIndex) {
        item[0] = +value
      }
    })

    setRequestCondition(newRequestCondition)

    sendRequest(newRequestCondition)
  }

  const handleRequestCondition = (
    requestBlockIndex: number,
    currentSelectIndex: number,
    target: any,
  ) => {
    const requestData = getRequestData(target, currentSelectIndex, attrData)

    const newRequest = Object.fromEntries(getSortedArray(requestData))

    const newRequestCondition: any[] = cloneDeep(requestCondition)

    newRequestCondition.map((item: any[], index: number) => {
      if (index === requestBlockIndex) {
        item[1] = newRequest
      }
    })

    setRequestCondition(newRequestCondition)

    sendRequest(newRequestCondition)

    setResetValue('')
  }

  const handleReset = (name: string) => {
    const resetRequestData = getResetRequestData(name, attrData)

    const newRequest = Object.fromEntries(getSortedArray(resetRequestData))

    const newRequestCondition: any[] = cloneDeep(requestCondition)

    newRequestCondition.map((item: any[], index: number) => {
      if (index === activeRequestIndex) {
        item[1] = newRequest
      }
    })

    setRequestCondition(newRequestCondition)

    sendRequest(newRequestCondition)

    setResetValue(name)
  }

  // get start variants

  useEffect(() => {
    const indexForApi = dtreeStore.getStepIndexForApi(currentStepIndex)

    const approx =
      approxCondition === 'transcript' ? null : `"${approxCondition}"`

    const requestString = getFuncParams(
      groupName,
      currentGroup[currentGroup.length - 1],
    )
      .slice(10)
      .replace(/\s+/g, '')

    setResetValue(
      getResetType(
        currentGroup[currentGroup.length - 1].request[
          currentGroup[currentGroup.length - 1].request.length - 1
        ][1],
      ),
    )

    const params = `{"approx":${approx},"state":${
      stateCondition === '-current-' || !stateCondition
        ? null
        : `"${stateCondition}"`
    },"request":${requestString}}`

    dtreeStore.setCurrentStepIndexForApi(indexForApi)

    dtreeStore.fetchStatFuncAsync(groupName, params)

    return () => dtreeStore.resetStatFuncData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // common UI functions

  const handleClose = () => {
    dtreeStore.closeModalEditCompoundRequest()
  }

  const handleSaveChanges = () => {
    const approx =
      approxCondition === 'transcript' ? null : `"${approxCondition}"`

    const params: IParams = {
      approx,
    }

    if (stateCondition) {
      params.state =
        JSON.stringify(stateOptions) === JSON.stringify(['-current-'])
          ? null
          : stateOptions
    }

    params.request = requestCondition

    changeFunctionalStep(params)
    dtreeStore.closeModalEditCompoundRequest()
  }

  function sendRequest(newRequestCondition: any[]) {
    const indexForApi = dtreeStore.getStepIndexForApi(currentStepIndex)

    const requestString = getFuncParams(groupName, {
      request: newRequestCondition,
    })
      .slice(10)
      .replace(/\s+/g, '')

    const approx =
      approxCondition === 'transcript' || !approxCondition
        ? null
        : `"${approxCondition}"`

    const state =
      stateCondition === '-current-' || !stateCondition
        ? null
        : `"${stateCondition}"`

    const params = `{"approx":${approx},"state":${state},"request":${requestString}}`

    dtreeStore.setCurrentStepIndexForApi(indexForApi)

    dtreeStore.fetchStatFuncAsync(groupName, params)
  }

  return (
    <ModalBase refer={ref} minHeight={300}>
      <HeaderModal
        groupName={dtreeStore.groupNameToChange}
        handleClose={handleClose}
      />

      <div className="flex justify-between w-full mt-4 text-14">
        <ApproxStateModalMods
          approxOptions={approxOptions}
          approxValues={approxValues}
          approxCondition={approxCondition}
          stateOptions={stateOptions}
          stateCondition={stateCondition}
          handleSetCondition={handleSetCondition}
        />

        <AllNotModalMods />
      </div>

      <div className="flex flex-col w-full mt-4 text-14">
        {requestCondition.map((item: any[], index: number) => (
          <div
            className={cn(
              'flex justify-between w-full shadow-dark py-2 my-2 px-2 cursor-pointer step-content-area',
              index === activeRequestIndex ? 'bg-blue-medium' : 'bg-white',
            )}
            key={Math.random()}
            onClick={(e: any) => handleActiveRequest(index, e)}
          >
            <div className="flex cursor-pointer step-content-area">
              <InputNumber
                value={item[0]}
                onChange={(e: any) =>
                  handleRequestConditionNumber(index, e.target.value)
                }
                className="shadow-dark w-1/3 h-5"
              />
            </div>

            <div className="flex flex-1 justify-between step-content-area">
              {attrData.family.map((group: string, currNo: number) => (
                <div
                  className="step-content-area"
                  onClick={(e: any) => handleActiveRequest(index, e)}
                  key={group}
                >
                  <span className="cursor-pointer step-content-area">
                    {group}
                  </span>

                  <Select
                    onChange={(e: any) =>
                      handleRequestCondition(index, currNo, e.target)
                    }
                    className="w-auto ml-1"
                    options={selectOptions}
                    value={getSelectedValue(group, index)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between w-full mt-4 text-14">
        <div className="flex">
          <Button
            onClick={() => handleRequestBlocksAmount('ADD')}
            text="Add"
            variant={'secondary'}
            className={cn('mr-4')}
            disabled={requestCondition.length === 5}
            dataTestId={DecisionTreeModalDataCy.addButton}
          />

          <Button
            onClick={() => handleRequestBlocksAmount('REMOVE')}
            text="Remove"
            variant={'secondary'}
            className={cn(
              'border-red-secondary hover:text-white hover:bg-red-secondary',
            )}
            disabled={requestCondition.length === 1}
            dataTestId={DecisionTreeModalDataCy.removeButton}
          />
        </div>

        <div className="flex w-1/2">
          <span>{t('dtree.reset')}</span>

          <Select
            options={resetOptions}
            value={resetValue}
            onChange={(e: any) => handleReset(e.target.value)}
            className="w-full ml-2"
            reset
            data-testid={DecisionTreeModalDataCy.selectReset}
          />
        </div>
      </div>

      <DisabledVariantsAmount variants={variants} disabled={true} />

      <EditModalButtons
        handleClose={handleClose}
        handleSaveChanges={handleSaveChanges}
        disabled={!variants}
      />
    </ModalBase>
  )
})
