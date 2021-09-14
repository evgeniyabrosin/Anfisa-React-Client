import { Fragment, ReactElement, useRef, useState } from 'react'
// import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { Input } from '@ui/input'
import { InputNumber } from '@ui/input-number'
import { DropDownSelectSign } from './dropdown-select-sign'
import { ExpandContentButton } from './expand-content-button'
import { ModalJoin } from './modal-join'

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

export const ModalSelectNumbers = observer(
  (): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalSelectNumbers())

    const currentGroup = dtreeStore.stepData[dtreeStore.currentStepIndex].groups

    const handleAddAttribute = (subGroupName: string) => {
      dtreeStore.addStepData(subGroupName, 'enum')
      dtreeStore.closeModalSelectFilter()
    }

    const handleClose = () => {
      dtreeStore.closeModalSelectNumbers()
      dtreeStore.resetSelectedFilters()
    }

    const handleModals = () => {
      dtreeStore.closeModalSelectFilter()
      dtreeStore.openModalAttribute(dtreeStore.currentStepIndex)
      dtreeStore.resetSelectedFilters()
    }

    const handleReplace = (subGroupName: string) => {
      dtreeStore.replaceStepData(subGroupName, 'enum')
      dtreeStore.resetSelectedFilters()
      dtreeStore.closeModalSelectFilter()
    }

    const [leftDropValue, setLeftDropValue] = useState(0)
    const [rightDropValue, setRightDropValue] = useState(0)

    const [leftDropType, setLeftDropType] = useState(0)
    const [rightDropType, setRightDropType] = useState(1)

    const [isVisibleLeftDrop, setIsVisibleLeftDrop] = useState(false)
    const [isVisibleRightDrop, setIsVisibleRightDrop] = useState(false)

    const toggleIsVisibleLeftDrop = () => {
      setIsVisibleLeftDrop(prev => !prev)
    }

    const toggleIsVisibleRightDrop = () => {
      setIsVisibleRightDrop(prev => !prev)
    }

    const minValue = 10
    const maxValue = 100

    return (
      <ModalContainer>
        <ModalView className="bg-grey-blue" />

        <ModalContent ref={ref} className="py-4 px-4">
          <div className="flex w-full justify-between items-center font-medium mb-3">
            <div>Number group name</div>

            <Icon
              name="Close"
              size={16}
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>

          <div className="flex items-center h-2/5 pt-3 overflow-y-auto">
            <div className="mr-1">{minValue}</div>

            <div className="flex justify-end h-8 w-1/2 pr-4 pl-px">
              <InputNumber
                value={leftDropValue}
                onChange={(e: any) => setLeftDropValue(e.target.value)}
                className="shadow-dark border-grey-blue"
              />

              <div className="flex items-center w-12 p-1 ml-2 shadow-dark rounded">
                <div className="flex items-center justify-center w-3/5 h-full bg-blue-medium rounded text-blue-bright">
                  {/* <Icon name="LessSign" className="ml-auto mt-auto" /> */}
                  {leftDropType === 0 ? `<` : `≤`}
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

            <div className="flex justify-start h-8 w-1/2 pl-4 pr-px">
              <div className="flex items-center w-12 p-1 mr-2 shadow-dark rounded">
                <div className="flex items-center justify-center w-3/5 h-full bg-blue-medium rounded text-blue-bright">
                  {/* <Icon name="LessEqualSign" className="ml-auto mt-auto" /> */}
                  {rightDropType === 1 ? `≤` : `<`}
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

              <InputNumber
                value={rightDropValue}
                onChange={(e: any) => setRightDropValue(e.target.value)}
                className="shadow-dark border-grey-blue"
              />
            </div>
            <div className="ml-1">{maxValue}</div>
          </div>

          <div className="flex h-3/5 justify-between items-center">
            <div
              className="text-14 text-blue-bright font-medium cursor-pointer"
              onClick={handleModals}
            >
              {t('dtree.backToAttribute')}
            </div>

            <div className="flex">
              <Button
                text={t('general.cancel')}
                hasBackground={false}
                className="mr-2 text-black hover:bg-blue-bright hover:text-white"
                onClick={handleClose}
              />
              {currentGroup && currentGroup.length > 0 ? (
                <Fragment>
                  <Button
                    disabled={dtreeStore.selectedFilters.length === 0}
                    text={t('dtree.replace')}
                    className="mr-2 cursor-pointer"
                    onClick={() => handleReplace(dtreeStore.selectedGroups[1])}
                  />

                  <div className="relative">
                    <Button
                      disabled={dtreeStore.selectedFilters.length === 0}
                      text={t('dtree.addByJoin')}
                      className="cursor-pointer rounded-full"
                      onClick={() => dtreeStore.openModalJoin()}
                      icon={
                        <Icon name="Arrow" className="transform -rotate-90" />
                      }
                    />

                    {dtreeStore.isModalJoinVisible && <ModalJoin />}
                  </div>
                </Fragment>
              ) : (
                <Button
                  text={t('dtree.addNewAttribute')}
                  onClick={() =>
                    handleAddAttribute(dtreeStore.selectedGroups[1])
                  }
                  disabled={dtreeStore.selectedFilters.length === 0}
                />
              )}
            </div>
          </div>
        </ModalContent>
      </ModalContainer>
    )
  },
)
{
  /* <div className="flex justify-center items-center text-14 text-grey-blue">
                There are no filters to show
              </div> */
}
