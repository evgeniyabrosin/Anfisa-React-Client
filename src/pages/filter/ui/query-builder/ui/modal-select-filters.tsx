import { Fragment, ReactElement, useRef } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { ModalJoin } from './modal-join'
import { ModsDivider } from './mods-divider'

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
  height: 260px;
  background: white;
  transform: translate(-50%, -50%);
  border-radius: 0.5rem;
  z-index: 1000;
`

export const ModalSelectFilters = observer(
  (): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalSelectFilter())

    const currentGroup = dtreeStore.stepData[dtreeStore.currentStepIndex].groups

    const handleCheckGroupItem = (checked: boolean, name: string) => {
      if (checked) {
        dtreeStore.addSelectedFilter(name)
      } else {
        dtreeStore.removeSelectedFilter(name)
      }
    }

    const handleAddAttribute = (subGroupName: string) => {
      dtreeStore.addStepData(subGroupName, 'enum')
      dtreeStore.closeModalSelectFilter()
    }

    const handleClose = () => {
      dtreeStore.closeModalSelectFilter()
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

    return (
      <ModalContainer>
        <ModalView className="bg-grey-blue" />

        <ModalContent ref={ref} className="py-4 px-4">
          <div className="flex w-full justify-between items-center font-medium mb-3">
            <div>{dtreeStore.selectedGroups[1]}</div>

            <Icon
              name="Close"
              size={16}
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>

          <div className="flex justify-between w-full">
            <div className="text-14 text-grey-blue">
              {dtreeStore.selectedFilters.length} selected
            </div>

            <div className="flex">
              <div className="flex items-center">
                <Checkbox checked={false} className="mr-1 cursor-pointer" />
                <div className="text-14 font-normal">{t('ds.notMode')}</div>
              </div>

              <ModsDivider />

              <div className="text-14 text-blue-bright">
                {t('general.selectAll')}
              </div>

              <ModsDivider />

              <div className="text-14 text-blue-bright">
                {t('general.clearAll')}
              </div>
            </div>
          </div>

          <div className="h-3/5 pt-3 overflow-y-auto">
            {dtreeStore.selectedGroups[2] ? (
              dtreeStore.selectedGroups[2].map(
                (variant: any) =>
                  variant[1] !== 0 && (
                    <div
                      key={variant}
                      className="flex items-center mb-2 text-14"
                    >
                      <Checkbox
                        checked={dtreeStore.selectedFilters.includes(
                          variant[0],
                        )}
                        className="-mt-0.5 mr-1 cursor-pointer"
                        onChange={e =>
                          handleCheckGroupItem(e.target.checked, variant[0])
                        }
                      />

                      <span className="text-black">{variant[0]}</span>

                      <span className="text-grey-blue ml-2">
                        {variant[1]} {t('dtree.variants')}
                      </span>
                    </div>
                  ),
              )
            ) : (
              <div className="flex justify-center items-center text-14 text-grey-blue">
                There are no filters to show
              </div>
            )}
          </div>

          <div className="flex mt-1 justify-between items-center">
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
