import { ReactElement, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { InputNumber } from '@ui/input-number'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { DropDownSelectSign } from './dropdown-select-sign'
import { ExpandContentButton } from './expand-content-button'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'
import { SelectModalButtons } from './select-modal-buttons'

export const ModalSelectNumbers = observer(
  (): ReactElement => {
    const ref = useRef(null)

    const currentGroup = dtreeStore.stepData[dtreeStore.currentStepIndex].groups

    const subGroups = Object.values(dtreeStore.getQueryBuilder)
    const groupName = dtreeStore.groupNameToChange

    let attrData: any

    subGroups.map(subGroup => {
      subGroup.map((item, index) => {
        if (item.name === dtreeStore.selectedGroups[1]) {
          attrData = subGroup[index]
        }
      })
    })

    const minValue = attrData.min
    const maxValue = attrData.max

    const [valueFrom, setValueFrom] = useState('')
    const [valueTo, setValueTo] = useState('')

    const [leftDropType, setLeftDropType] = useState<boolean>(false)

    const [rightDropType, setRightDropType] = useState<boolean>(true)

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

    const handleModals = () => {
      dtreeStore.closeModalSelectNumbers()
      dtreeStore.openModalAttribute(dtreeStore.currentStepIndex)
    }

    const getNumericData = () => {
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

      return numericData
    }

    const handleAddAttribute = (action: ActionType) => {
      if (isVisibleLeftError || isVisibleRightError || isVisibleCenterError) {
        return
      }

      const numericData = getNumericData()

      addAttributeToStep(action, 'numeric', numericData)

      dtreeStore.closeModalSelectNumbers()
    }

    const handleModalJoin = () => {
      if (isVisibleLeftError || isVisibleRightError || isVisibleCenterError) {
        return
      }

      dtreeStore.openModalJoin()
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

    const handleClose = () => {
      dtreeStore.closeModalSelectNumbers()
    }

    return (
      <ModalBase refer={ref} minHeight={200}>
        <HeaderModal groupName={groupName} handleClose={handleClose} />

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

        <SelectModalButtons
          handleClose={handleClose}
          handleModals={handleModals}
          handleModalJoin={handleModalJoin}
          disabled={!valueFrom && !valueTo}
          currentGroup={currentGroup}
          handleAddAttribute={handleAddAttribute}
        />
      </ModalBase>
    )
  },
)
