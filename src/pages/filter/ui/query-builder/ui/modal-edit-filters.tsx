import { ReactElement, useEffect, useRef } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
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
`

export const ModalEditFilters = observer(
  (): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalEditFilters())

    let currentGroup = ''

    dtreeStore.stepData[dtreeStore.currentStepIndex].groups.map(
      (item: string, index: number) => {
        if (item[1] === dtreeStore.groupNameToChange) {
          currentGroup =
            dtreeStore.stepData[dtreeStore.currentStepIndex].groups[index]
        }
      },
    )

    const indexOfCurrentGroup = dtreeStore.groupIndexToChange

    const currentGroupLength =
      dtreeStore.stepData[dtreeStore.currentStepIndex].groups[
        indexOfCurrentGroup
      ].length

    useEffect(() => {
      dtreeStore.stepData[dtreeStore.currentStepIndex].groups[
        indexOfCurrentGroup
      ][currentGroupLength - 1].map((item: string) =>
        dtreeStore.addSelectedFilter(item),
      )

      return () => {
        dtreeStore.resetSelectedFilters()
      }
    }, [indexOfCurrentGroup, currentGroupLength])

    const handleCheckGroupItem = (checked: boolean, name: string) => {
      if (checked) {
        dtreeStore.addSelectedFilter(name)
      } else {
        dtreeStore.removeSelectedFilter(name)
      }
    }

    const handleSaveChanges = () => {
      dtreeStore.updateStepData(indexOfCurrentGroup)
      dtreeStore.closeModalEditFilters()
    }

    const handleClose = () => {
      dtreeStore.closeModalEditFilters()
      dtreeStore.resetSelectedFilters()
    }

    const selectedGroupsAmount =
      currentGroup.length > 0 ? dtreeStore.selectedFilters : []

    const name = dtreeStore.groupNameToChange

    const subGroups = Object.values(dtreeStore.getQueryBuilder)

    let variants: (string | number)[][] = []

    subGroups.map(subGroup => {
      subGroup.map((item, index) => {
        if (item.name === name) {
          variants = subGroup[index].variants
        }
      })
    })

    return (
      <ModalContainer>
        <ModalView className="bg-grey-blue" />

        <ModalContent ref={ref} className="py-4 px-4 z-10">
          <div className="flex w-full justify-between items-center font-medium mb-3">
            <div>{dtreeStore.selectedGroups[1]}</div>

            <Icon
              name="Close"
              size={16}
              className="cursor-pointer"
              onClick={() => handleClose()}
            />
          </div>

          <div className="flex justify-between w-full">
            <div className="text-14 text-grey-blue">
              {currentGroup.length > 0 ? dtreeStore.selectedFilters.length : 0}{' '}
              {t('dtree.selected')}
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
            {variants.map((variant: any) => (
              <div key={variant} className="flex items-center mb-2">
                <Checkbox
                  checked={
                    currentGroup.length > 0
                      ? dtreeStore.selectedFilters.includes(variant[0])
                      : false
                  }
                  className="-mt-0.5 mr-1"
                  onChange={e =>
                    handleCheckGroupItem(e.target.checked, variant[0])
                  }
                />

                <p className="text-14 text-black">{variant[0]}</p>

                <p className="text-14 text-grey-blue ml-2">
                  {variant[1]} {t('dtree.variants')}
                </p>
              </div>
            ))}
          </div>

          <div className="flex mt-1 justify-between items-center">
            <Button
              text={t('dtree.deleteInstruction')}
              hasBackground={false}
              className="text-black border-red-secondary"
              onClick={() => dtreeStore.removeStepData(indexOfCurrentGroup)}
            />

            <div className="flex">
              <Button
                text={t('general.cancel')}
                hasBackground={false}
                className="text-black mr-2"
                onClick={handleClose}
              />
              <Button
                disabled={selectedGroupsAmount.length === 0}
                text={t('dtree.saveChanges')}
                onClick={() => handleSaveChanges()}
              />
            </div>
          </div>
        </ModalContent>
      </ModalContainer>
    )
  },
)
