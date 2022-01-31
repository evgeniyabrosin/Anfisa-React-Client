import React, { ReactElement, useEffect, useState } from 'react'
import cn from 'classnames'
import { FormikProps } from 'formik'
import cloneDeep from 'lodash/cloneDeep'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { InputNumber } from '@ui/input-number'
import { Select } from '@ui/select'
import { getFuncParams } from '@utils/getFuncParams'
import { getQueryBuilder } from '@utils/getQueryBuilder'
import { getRequestData } from '@utils/getRequestData'
import { getResetRequestData } from '@utils/getResetRequestData'
import { getResetType } from '@utils/getResetType'
import { getSortedArray } from '@utils/getSortedArray'
import { AllNotModalMods } from './query-builder/ui/all-not-modal-mods'
import { DisabledVariantsAmount } from './query-builder/ui/disabled-variants-amount'
import { selectOptions } from './query-builder/ui/modal-select-custom-inheritance-mode'

export interface ICompoundRequestFormValues {
  requestCondition: TRequestCondition[]
  reset: string
}

export type TRequestCondition = [number, TSelectValues]

export type TSelectValues = {
  [key: string]: string[]
}
export interface ICompoundRequestProps {
  variants: string[]
  approx: string | null
  state: string | null
}

const approxOptions = [
  'shared transcript',
  'shared gene',
  'non-intersecting transcripts',
]

export const resetOptions = [
  'Homozygous Recessive/X-linked',
  'Autosomal Dominant',
  'Compensational',
]

export const CompoundRequest = observer(
  ({ setFieldValue }: FormikProps<ICompoundRequestProps>): ReactElement => {
    const cachedValues = filterStore.readFilterCondition<ICompoundRequestFormValues>(
      FuncStepTypesEnum.CompoundRequest,
    )

    const [requestCondition, setRequestCondition] = useState(
      cachedValues?.requestCondition || [[1, {}] as TRequestCondition],
    )

    const [resetValue, setResetValue] = useState(cachedValues?.reset || '')

    let attrData: any
    const variants = filterStore.statFuncData.variants

    const statList = toJS(datasetStore.dsStat['stat-list'])
    const subGroups = Object.values(getQueryBuilder(statList))

    subGroups.map(subGroup => {
      subGroup.map((item, currNo) => {
        if (item.name === FuncStepTypesEnum.CustomInheritanceMode) {
          attrData = subGroup[currNo]
        }
      })
    })

    useEffect(() => {
      if (variants) setFieldValue('variants', variants)
    }, [setFieldValue, variants])

    useEffect(() => {
      filterStore.fetchStatFuncAsync(
        FuncStepTypesEnum.CompoundRequest,
        JSON.stringify({ request: [] }),
      )

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      filterStore.setFilterCondition<ICompoundRequestFormValues>(
        FuncStepTypesEnum.CompoundRequest,
        {
          reset: resetValue,
          requestCondition,
        },
      )
    }, [resetValue, requestCondition])

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

      sendRequestAsync(newRequestCondition)

      setFieldValue('request', newRequestCondition)

      setResetValue('')
    }

    async function sendRequestAsync(newRequestCondition: any[]) {
      const requestString = getFuncParams(FuncStepTypesEnum.CompoundRequest, {
        request: newRequestCondition,
      })
        .slice(10)
        .replace(/\s+/g, '')

      const params = `{"approx":${null},"state":${null},"request":${requestString}}`

      filterStore.fetchStatFuncAsync(FuncStepTypesEnum.CompoundRequest, params)
    }

    const [activeRequestIndex, setActiveRequestIndex] = useState(
      requestCondition.length - 1,
    )

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

        setResetValue(
          getResetType(newRequestCondition[newRequestCondition.length - 1][1]),
        )

        sendRequestAsync(newRequestCondition)
      }
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

      sendRequestAsync(newRequestCondition)
    }

    const handleActiveRequest = (requestBlockIndex: number, event: any) => {
      const classList = Array.from(event.target.classList)

      const shouldMakeActive = classList.includes('step-content-area')

      if (shouldMakeActive) {
        setActiveRequestIndex(requestBlockIndex)
      }

      const currentRequest = requestCondition[requestBlockIndex]

      setResetValue(getResetType(currentRequest[1]))
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

      sendRequestAsync(newRequestCondition)

      setFieldValue('request', newRequestCondition)

      setResetValue(name)
    }

    const renderConditions = (): JSX.Element => {
      return (
        <div className="flex flex-col w-full mt-4 text-14">
          {requestCondition.map((item: any[], index: number) => (
            <div
              className={cn(
                'flex justify-between w-full shadow-dark py-2 my-2 px-2 cursor-pointer step-content-area',
                index === activeRequestIndex ? ' bg-white' : 'bg-blue-medium',
              )}
              key={index}
              onClick={(e: any) => handleActiveRequest(index, e)}
            >
              <div className="flex cursor-pointer step-content-area">
                <InputNumber
                  value={item[0]}
                  onChange={(e: any) =>
                    handleRequestConditionNumber(index, e.target.value)
                  }
                  className="shadow-dark w-1/3 h-5 bg-blue-medium"
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
      )
    }

    return (
      <React.Fragment>
        <div className="flex justify-between items-center w-full mt-4 text-14">
          <div className="flex">
            <div className="flex items-center">
              <span className="mr-2 text-18 leading-14px">Approx:</span>

              <Select
                value={approxOptions[2]}
                options={approxOptions}
                disabled={true}
              />
            </div>

            <div className="flex items-center ml-3">
              <span>{t('dtree.state')}</span>

              <Select
                options={['-current-']}
                value={'-current-'}
                className="w-full ml-2"
                disabled={true}
              />
            </div>
          </div>

          <AllNotModalMods />
        </div>

        {renderConditions()}

        <div className="flex items-center justify-between w-full mt-4 text-14">
          <div className="flex">
            <Button
              onClick={() => handleRequestBlocksAmount('ADD')}
              text="Add"
              variant={'secondary'}
              className={cn('mr-4')}
              disabled={requestCondition.length === 5}
            />

            <Button
              onClick={() => handleRequestBlocksAmount('REMOVE')}
              text="Remove"
              variant={'secondary'}
              className={cn(
                'border-red-secondary hover:text-white hover:bg-red-secondary',
              )}
              disabled={requestCondition.length === 1}
            />
          </div>

          <div className="flex w-1/2">
            <span>{t('dtree.reset')}</span>

            <Select
              options={resetOptions}
              onChange={(e: any) => handleReset(e.target.value)}
              className="w-full ml-2"
              value={resetValue}
              reset
            />
          </div>
        </div>

        <DisabledVariantsAmount variants={variants} disabled={true} />
      </React.Fragment>
    )
  },
)
