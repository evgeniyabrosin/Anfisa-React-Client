import { ReactElement, useEffect, useRef } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { EditModalButtons } from './edit-modal-buttons'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'
import { ModsDivider } from './mods-divider'
import { changeEnumAttribute } from '@utils/changeAttribute/changeEnumAttribute'

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
    const groupName = dtreeStore.groupNameToChange

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
      changeEnumAttribute()
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
      <ModalBase refer={ref} minHeight={200}>
        <HeaderModal groupName={groupName} handleClose={handleClose} />

        <div className="flex justify-between items-center w-full mt-4 text-14">
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

            <div className="text-blue-bright">{t('general.selectAll')}</div>

            <ModsDivider />

            <div className="text-blue-bright">{t('general.clearAll')}</div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto my-4 text-14">
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

              <p className="text-black">{variant[0]}</p>

              <p className="text-grey-blue ml-2">
                {variant[1]} {t('dtree.variants')}
              </p>
            </div>
          ))}
        </div>

        <EditModalButtons
          handleClose={handleClose}
          handleSaveChanges={handleSaveChanges}
          disabled={selectedGroupsAmount.length === 0}
        />
      </ModalBase>
    )
  },
)
