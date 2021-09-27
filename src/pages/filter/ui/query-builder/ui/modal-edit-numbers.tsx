/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactElement, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { InputNumber } from '@ui/input-number'
import { DropDownSelectSign } from './dropdown-select-sign'
import { ExpandContentButton } from './expand-content-button'

const ModalContainer = styled.div`
  display: block;
`

const ModalView = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 10;
  opacity: 0.7;
`

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 580px;
  height: 190px;
  background: white;
  transform: translate(-50%, -50%);
  border-radius: 0.5rem;
  z-index: 10;
`

export const ModalEditNumbers = observer(
  (): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalEditNumbers())

    const groupName = dtreeStore.groupNameToChange
    const indexOfCurrentGroup = dtreeStore.groupIndexToChange

    const subGroups = Object.values(dtreeStore.getQueryBuilder)

    let attrData: any

    subGroups.map(subGroup => {
      subGroup.map((item, index) => {
        if (item.name === groupName) {
          attrData = subGroup[index]
        }
      })
    })

    const minValue = attrData.min
    const maxValue = attrData.max

    const currentGroupLength: number =
      dtreeStore.stepData[dtreeStore.currentStepIndex].groups[0].length

    const currentValueFrom: number | undefined =
      dtreeStore.stepData[dtreeStore.currentStepIndex].groups[0][
        currentGroupLength - 1
      ][0]

    const currentLeftDropType: boolean =
      dtreeStore.stepData[dtreeStore.currentStepIndex].groups[0][
        currentGroupLength - 1
      ][1]

    const currentValueTo: number | undefined =
      dtreeStore.stepData[dtreeStore.currentStepIndex].groups[0][
        currentGroupLength - 1
      ][2]

    const currentRightDropType: boolean =
      dtreeStore.stepData[dtreeStore.currentStepIndex].groups[0][
        currentGroupLength - 1
      ][3]

    const [valueFrom, setValueFrom] = useState(currentValueFrom || '')
    const [valueTo, setValueTo] = useState(currentValueTo || '')

    const [leftDropType, setLeftDropType] = useState<boolean>(
      currentValueFrom ? currentLeftDropType : false,
    )

    const [rightDropType, setRightDropType] = useState<boolean>(
      currentValueTo ? currentRightDropType : true,
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

    const validateValues = (value: number | string, type: string) => {
      if (type === 'from') {
        value <= minValue || value > maxValue || value === '-0'
          ? setIsVisibleLeftError(true)
          : setIsVisibleLeftError(false)

        if (!value) setIsVisibleLeftError(false)
      }

      if (type === 'to') {
        value > maxValue || value <= minValue || value === '-0'
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

      const numericData: any[] = [
        valueFrom || null,
        leftDropType,
        valueTo || null,
        rightDropType,
      ]

      numericData.map((item: any, index: number) => {
        if (typeof item === 'string') {
          numericData[index] = +item
        }
      })

      dtreeStore.updateNumericStepData(indexOfCurrentGroup, numericData)
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

    return (
      <ModalContainer>
        <ModalView className="bg-grey-blue" />

        <ModalContent ref={ref} className="py-4 px-4">
          <div className="flex w-full justify-between items-center font-medium mb-3">
            <div>{groupName}</div>

            <Icon
              name="Close"
              size={16}
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>

          <div className="relative flex items-center h-3/5 pt-3">
            <div className="relative flex items-center justify-start w-1/2 h-20 pr-1 pl-px">
              <div className="absolute top-0 left-0 flex justify-start w-1/2 truncate">
                {minValue}
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
                        valueFrom && !isVisibleLeftError,
                      'bg-grey-light text-grey-blue':
                        !valueFrom || isVisibleLeftError,
                    },
                  )}
                >
                  {leftDropType === false ? `<` : `≤`}
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
                {maxValue}
              </div>

              <div className="flex items-center w-12 p-1 mr-2 shadow-dark rounded">
                <div
                  className={cn(
                    'flex items-center justify-center w-3/5 h-full rounded',
                    {
                      'bg-blue-medium text-blue-bright':
                        valueTo && !isVisibleRightError,
                      'bg-grey-light text-grey-blue':
                        !valueTo || isVisibleRightError,
                    },
                  )}
                >
                  {rightDropType === true ? `≤` : `<`}
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
              <div className="absolute top-3 flex justify-center items-center w-full h-5 px-5 text-10 text-red-secondary">
                <div className="w-1/2 text-center">
                  {t('dtree.conditionError')}
                </div>
              </div>
            )}
          </div>

          <div className="flex h-1/5 justify-between items-center">
            <Button
              text={t('dtree.deleteAttribute')}
              hasBackground={false}
              className="text-black border-red-secondary"
              onClick={() => {
                dtreeStore.closeModalEditNumbers()
                dtreeStore.removeStepData(indexOfCurrentGroup)
              }}
            />

            <div className="flex">
              <Button
                text={t('general.cancel')}
                hasBackground={false}
                className="mr-2 text-black hover:bg-blue-bright hover:text-white"
                onClick={handleClose}
              />
              <div className="relative">
                <Button
                  disabled={!valueFrom && !valueTo}
                  text={t('dtree.saveChanges')}
                  onClick={handleSaveChanges}
                />
              </div>
            </div>
          </div>
        </ModalContent>
      </ModalContainer>
    )
  },
)
