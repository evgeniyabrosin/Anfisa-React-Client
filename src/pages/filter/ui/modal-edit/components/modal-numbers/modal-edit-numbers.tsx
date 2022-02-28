import React, { ReactElement, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { InputNumber } from '@ui/input-number'
import { RangeSlider } from '@ui/range-slider'
import { changeNumericAttribute } from '@utils/changeAttribute/changeNumericAttribute'
import { DropDownSelectSign } from '../../../query-builder/ui/dropdown-select-sign'
import { ExpandContentButton } from '../../../query-builder/ui/expand-content-button'
import { HeaderModal } from '../../../query-builder/ui/header-modal'
import { ModalBase } from '../../../query-builder/ui/modal-base'
import { EditModalButtons } from '../edit-modal-buttons'
import {
  getNumericValue,
  getRangeSliderProps,
  getRangeSliderStrongSide,
} from './utils'

export const ModalEditNumbers = observer((): ReactElement => {
  const ref = useRef(null)

  const groupName = dtreeStore.groupNameToChange

  const currentGroup =
    dtreeStore.stepData[dtreeStore.currentStepIndex].groups[
      dtreeStore.groupIndexToChange
    ]

  const subGroups = Object.values(dtreeStore.getQueryBuilder)

  let attrData: any = {}

  subGroups.map(subGroup => {
    subGroup.map((item, index) => {
      if (item.name === groupName) {
        attrData = subGroup[index]
      }
    })
  })

  const minValue = attrData.min
  const maxValue = attrData.max

  const currentGroupLength: number = currentGroup.length

  const currentValueFrom: number | undefined =
    currentGroup[currentGroupLength - 1][0]

  const currentLeftDropType: boolean = currentGroup[currentGroupLength - 1][1]

  const currentValueTo: number | undefined =
    currentGroup[currentGroupLength - 1][2]

  const currentRightDropType: boolean = currentGroup[currentGroupLength - 1][3]

  const [valueFrom, setValueFrom] = useState(currentValueFrom ?? '')

  const [valueTo, setValueTo] = useState(currentValueTo ?? '')

  const [leftDropType, setLeftDropType] = useState<boolean>(
    currentValueFrom != null ? currentLeftDropType : false,
  )

  const [rightDropType, setRightDropType] = useState<boolean>(
    currentValueTo != null ? currentRightDropType : true,
  )

  const [isVisibleLeftDrop, setIsVisibleLeftDrop] = useState(false)
  const [isVisibleRightDrop, setIsVisibleRightDrop] = useState(false)

  const [isVisibleLeftError, setIsVisibleLeftError] = useState(false)
  const [isVisibleRightError, setIsVisibleRightError] = useState(false)
  const [isVisibleCenterError, setIsVisibleCenterError] = useState(false)

  const toggleIsVisibleLeftDrop = () => {
    setIsVisibleLeftDrop(prev => !prev)
  }

  const toggleIsVisibleRightDrop = () => {
    setIsVisibleRightDrop(prev => !prev)
  }

  const validateValues = (value: string, type: string) => {
    if (type === 'from') {
      value < minValue || value > maxValue || value === '-0'
        ? setIsVisibleLeftError(true)
        : setIsVisibleLeftError(false)

      if (!value) setIsVisibleLeftError(false)
    }

    if (type === 'to') {
      value > maxValue || value < minValue || value === '-0'
        ? setIsVisibleRightError(true)
        : setIsVisibleRightError(false)

      if (!value) setIsVisibleRightError(false)
    }
  }

  const handleClose = () => {
    dtreeStore.closeModalEditNumbers()
  }

  const handleSaveChanges = () => {
    if (isVisibleLeftError || isVisibleRightError || isVisibleCenterError) {
      return
    }

    changeNumericAttribute([
      getNumericValue(valueFrom),
      leftDropType,
      getNumericValue(valueTo),
      rightDropType,
    ])
    dtreeStore.closeModalEditNumbers()
  }

  useEffect(() => {
    if (valueFrom && valueTo && +valueFrom > +valueTo) {
      setIsVisibleCenterError(true)

      return
    }

    if (valueFrom && valueTo && +valueFrom === +valueTo) {
      if (leftDropType !== true || rightDropType !== true) {
        setIsVisibleCenterError(true)
      } else {
        setIsVisibleCenterError(false)
      }

      return
    }

    setIsVisibleCenterError(false)
  }, [valueFrom, valueTo, leftDropType, rightDropType])

  const formatValue = (value: number) => {
    if (value < 1 && value > 0) return value.toFixed(5)

    return value
  }

  return (
    <ModalBase refer={ref} minHeight={200}>
      <HeaderModal groupName={groupName} handleClose={handleClose} />

      <div className="relative flex flex-1 items-center my-4">
        <div className="relative flex items-center justify-start w-1/2 h-20 pr-1 pl-px">
          <div className="absolute top-0 left-0 flex justify-start w-1/2 truncate">
            {dtreeStore.isFiltersLoading
              ? t('dtree.loading')
              : formatValue(minValue)}
          </div>

          <div className="flex w-full flex-col h-8">
            <InputNumber
              value={valueFrom}
              onChange={(e: any) => {
                setValueFrom(e.target.value)
                validateValues(e.target.value, 'from')
              }}
              className="h-8 w-full shadow-dark"
            />

            {isVisibleLeftError && (
              <div className="absolute bottom-1 flex flex-1 items-center h-4 w-full text-10 text-red-secondary">
                {t('dtree.lowerBoundError')}
              </div>
            )}
          </div>

          <div className="flex items-center w-12 p-1 ml-2 shadow-dark rounded">
            <div
              className={cn(
                'flex items-center justify-center w-3/5 h-full rounded',
                {
                  'bg-blue-medium text-blue-bright':
                    valueFrom >= 0 && !isVisibleLeftError,
                  'bg-grey-light text-grey-blue':
                    (!valueFrom && valueFrom !== 0) || isVisibleLeftError,
                },
              )}
            >
              {leftDropType === false ? '<' : '≤'}
            </div>

            <ExpandContentButton
              isVisible={isVisibleLeftDrop}
              expandContent={toggleIsVisibleLeftDrop}
              isDropDown
            />

            {isVisibleLeftDrop && (
              <DropDownSelectSign
                close={toggleIsVisibleLeftDrop}
                setDropType={setLeftDropType}
              />
            )}
          </div>
        </div>

        <div className="w-4 h-px bg-grey-blue" />

        <div className="relative flex items-center justify-end h-20 w-1/2 pl-1 pr-px">
          <div className="absolute top-0 right-0 w-1/2 flex justify-end truncate">
            {dtreeStore.isFiltersLoading
              ? t('dtree.loading')
              : formatValue(maxValue)}
          </div>

          <div className="flex items-center w-12 p-1 mr-2 shadow-dark rounded">
            <div
              className={cn(
                'flex items-center justify-center w-3/5 h-full rounded',
                {
                  'bg-blue-medium text-blue-bright':
                    valueTo >= 0 && !isVisibleRightError,
                  'bg-grey-light text-grey-blue':
                    (!valueTo && valueTo !== 0) || isVisibleRightError,
                },
              )}
            >
              {rightDropType === true ? '≤' : '<'}
            </div>

            <ExpandContentButton
              isVisible={isVisibleRightDrop}
              expandContent={toggleIsVisibleRightDrop}
              isDropDown
            />

            {isVisibleRightDrop && (
              <DropDownSelectSign
                close={toggleIsVisibleRightDrop}
                setDropType={setRightDropType}
              />
            )}
          </div>
          <div className="flex flex-col w-full h-8">
            <InputNumber
              value={valueTo}
              onChange={(e: any) => {
                setValueTo(e.target.value)
                validateValues(e.target.value, 'to')
              }}
              className="h-8 w-full shadow-dark"
            />

            {isVisibleRightError && (
              <div className="absolute bottom-1 flex flex-1 items-center h-4 w-full text-10 text-red-secondary">
                {t('dtree.upperBoundError')}
              </div>
            )}
          </div>
        </div>

        {isVisibleCenterError && (
          <div className="absolute top-0 flex justify-center items-center w-full h-5 px-5 text-10 text-red-secondary">
            <div className="w-1/2 text-center">{t('dtree.conditionError')}</div>
          </div>
        )}
      </div>
      <RangeSlider
        value={[getNumericValue(valueFrom), getNumericValue(valueTo)]}
        onChange={value => {
          setValueFrom(value[0] != null ? value[0].toString() : '')
          setValueTo(value[1] != null ? value[1].toString() : '')
        }}
        strong={getRangeSliderStrongSide(leftDropType, rightDropType)}
        {...getRangeSliderProps(attrData)}
      />
      <EditModalButtons
        handleClose={handleClose}
        handleSaveChanges={handleSaveChanges}
        disabled={!valueFrom && valueFrom !== 0 && !valueTo && valueTo !== 0}
      />
    </ModalBase>
  )
})
