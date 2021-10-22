import { ReactElement, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { cloneDeep } from 'lodash'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { InputNumber } from '@ui/input-number'
import { Select } from '@ui/select'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { getFuncParams } from '@utils/getFuncParams'
import { getRequestData } from '@utils/getRequestData'
import { getResetRequestData } from '@utils/getResetRequestData'
import { getSortedArray } from '@utils/getSortedArray'
import { AllNotModalMods } from './all-not-modal-mods'
import { ApproxStateModalMods } from './approx-state-modal-mods'
import { EditModalVariants } from './edit-modal-variants'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'
import { IParams } from './modal-edit-compound-het'
import { selectOptions } from './modal-edit-custom-inheritance-mode'
import { SelectModalButtons } from './select-modal-buttons'

export const ModalSelectCompoundRequest = observer(
  (): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalSelectCompoundRequest())

    useEffect(() => {
      return () => dtreeStore.resetStatFuncData()
    }, [])

    // important variables

    const currentStepIndex = dtreeStore.currentStepIndex

    const currentGroup = dtreeStore.stepData[currentStepIndex].groups

    const groupName = dtreeStore.groupNameToChange

    const variants = dtreeStore.statFuncData.variants

    const approxValues: string[] = []
    const approxOptions: string[] = []

    let attrData: any
    let resetData: any

    const subGroups = Object.values(dtreeStore.getQueryBuilder)

    subGroups.map(subGroup => {
      subGroup.map((item, currNo) => {
        if (item.name === groupName) {
          attrData = subGroup[currNo]
        }

        if (item.name === FuncStepTypesEnum.InheritanceMode) {
          resetData = subGroup[currNo]
        }
      })
    })

    // approx-condition & state-condition & request-condition functions

    attrData['approx-modes'].map((mode: string[]) => {
      approxOptions.push(mode[1])
      approxValues.push(mode[0])
    })

    const [requestCondition, setRequestCondition] = useState([[1, {}]])

    const [stateCondition, setStateCondition] = useState('-current-')

    const [approxCondition, setApproxCondition] = useState('transcript')

    const stateOptions: string[] = [stateCondition]

    const handleSetCondition = (value: string, type: string) => {
      const indexForApi = dtreeStore.getStepIndexForApi(currentStepIndex)

      if (type === 'approx') {
        setApproxCondition(value)

        const request = getFuncParams(groupName, {
          approx: value,
          request: requestCondition,
        })
          .slice(10)
          .replace(/\s+/g, '')

        const params = `{"approx":"${value}","state":${
          stateCondition !== '-current-' ? `"${stateCondition}"` : null
        },"request":${request}}`

        dtreeStore.setCurrentStepIndexForApi(indexForApi)

        dtreeStore.fetchStatFuncAsync(groupName, params)
      }

      if (type === 'state') {
        setStateCondition(value)

        const params = `{"approx":"${approxCondition}","state":${
          value !== '-current-' ? `"${value}"` : null
        }}`

        dtreeStore.setCurrentStepIndexForApi(indexForApi)

        dtreeStore.fetchStatFuncAsync(groupName, params)
      }
    }

    // request condition functions

    const [activeRequestIndex, setActiveRequestIndex] = useState(
      requestCondition.length - 1,
    )

    const handleActiveRequest = (requestBlockIndex: number, event: any) => {
      const classList = Array.from(event.target.classList)

      const shouldMakeActive = classList.includes('step-content-area')

      if (shouldMakeActive) {
        setActiveRequestIndex(requestBlockIndex)
      }
    }

    const handleRequestBlocksAmount = (type: string) => {
      if (type === 'ADD') {
        const emptyBlock: [number, any] = [1, {}]
        const newRequestCondition = [...cloneDeep(requestCondition), emptyBlock]

        setRequestCondition(newRequestCondition)
        setActiveRequestIndex(newRequestCondition.length - 1)
      } else {
        const newRequestCondition = cloneDeep(requestCondition).filter(
          (_item: any[], index: number) => index !== activeRequestIndex,
        )

        setRequestCondition(newRequestCondition)
        setActiveRequestIndex(newRequestCondition.length - 1)

        sendRequest(newRequestCondition)
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
    }

    // common UI functions

    const handleClose = () => {
      dtreeStore.closeModalSelectCompoundRequest()
    }

    function sendRequest(newRequestCondition: any[]) {
      const indexForApi = dtreeStore.getStepIndexForApi(currentStepIndex)

      const requestString = getFuncParams(groupName, {
        request: newRequestCondition,
      })
        .slice(10)
        .replace(/\s+/g, '')

      const params = `{"approx":"${approxCondition}","state":${
        stateCondition === '-current-' || !stateCondition
          ? null
          : `"${stateCondition}"`
      },"request":${requestString}}`

      dtreeStore.setCurrentStepIndexForApi(indexForApi)

      dtreeStore.fetchStatFuncAsync(groupName, params)
    }

    const handleModals = () => {
      dtreeStore.closeModalSelectCompoundRequest()
      dtreeStore.openModalAttribute(currentStepIndex)
      dtreeStore.resetSelectedFilters()
    }

    const handleModalJoin = () => {
      dtreeStore.openModalJoin()
    }

    const handleAddAttribute = (action: ActionType) => {
      const params: IParams = {
        approx: approxCondition,
      }

      if (stateCondition) {
        params.state =
          JSON.stringify(stateOptions) === JSON.stringify(['-current-'])
            ? null
            : stateOptions
      }

      params.request = requestCondition

      addAttributeToStep(action, 'func', null, params)
      dtreeStore.resetSelectedFilters()
      dtreeStore.closeModalSelectCompoundRequest()
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
              hasBackground={false}
              className={cn(
                'text-black hover:text-white hover:bg-blue-bright mr-4',
              )}
              disabled={requestCondition.length === 5}
            />

            <Button
              onClick={() => handleRequestBlocksAmount('REMOVE')}
              text="Remove"
              hasBackground={false}
              className={cn(
                'text-black border-red-secondary hover:text-white hover:bg-red-secondary',
              )}
              disabled={requestCondition.length === 1}
            />
          </div>

          <div className="flex w-1/2">
            <span>{t('dtree.reset')}</span>

            <Select
              options={resetData.available}
              onChange={(e: any) => handleReset(e.target.value)}
              className="w-full ml-2"
              reset
            />
          </div>
        </div>

        <EditModalVariants variants={variants} disabled={true} />

        <SelectModalButtons
          handleClose={handleClose}
          handleModals={handleModals}
          handleModalJoin={handleModalJoin}
          disabled={!variants}
          currentGroup={currentGroup}
          handleAddAttribute={handleAddAttribute}
        />
      </ModalBase>
    )
  },
)
