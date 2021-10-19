import { ReactElement, useEffect, useRef, useState } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { EditModalVariants } from './edit-modal-variants'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'
import { ModsDivider } from './mods-divider'
import { SelectModalButtons } from './select-modal-buttons'

export const ModalSelectInheritanceMode = observer(
  (): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalSelectInheritanceMode())

    const currentStepIndex = dtreeStore.currentStepIndex

    const currentGroup = dtreeStore.stepData[currentStepIndex].groups

    const groupName = dtreeStore.groupNameToChange

    const variants = dtreeStore.statFuncData.variants

    let attrData: any

    const subGroups = Object.values(dtreeStore.getQueryBuilder)

    subGroups.map(subGroup => {
      subGroup.map((item, currNo) => {
        if (item.name === groupName) {
          attrData = subGroup[currNo]
        }
      })
    })

    const problemGroup = attrData.affected

    const [problemGroupData, setProblemGroupData] = useState<string[]>(
      problemGroup,
    )

    useEffect(() => {
      const indexForApi = dtreeStore.getStepIndexForApi(currentStepIndex)

      const params = `{"problem_group":["${problemGroup
        .toString()
        .split(',')
        .join('","')}"]}`

      dtreeStore.setCurrentStepIndexForApi(indexForApi)

      const initAsync = async () => {
        await dtreeStore.fetchStatFuncAsync(groupName, params)
      }

      initAsync()

      return () => dtreeStore.resetSelectedFilters()

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClose = () => {
      dtreeStore.closeModalSelectInheritanceMode()
    }

    const handleProblemGroup = (checked: boolean, value: string) => {
      if (checked) {
        setProblemGroupData((prev: any) => {
          const newProblemGroupData = [...prev, value]

          const params = `{"problem_group":["${newProblemGroupData
            .reverse()
            .toString()
            .split(',')
            .join('","')}"]}`

          dtreeStore.fetchStatFuncAsync(groupName, params)

          return newProblemGroupData
        })
      } else {
        setProblemGroupData((prev: any) => {
          const newProblemGroupData = prev.filter(
            (item: string) => item !== value,
          )

          const params = `{"problem_group": ["${newProblemGroupData
            .toString()
            .split(',')
            .join('", "')}"]}`

          dtreeStore.fetchStatFuncAsync(groupName, params)

          return newProblemGroupData
        })
      }
    }

    const handleReset = () => {
      setProblemGroupData(attrData.affected)

      const params = `{"problem_group": ["${attrData.affected
        .toString()
        .split(',')
        .join('", "')}"]}`

      dtreeStore.fetchStatFuncAsync(groupName, params)
    }

    const handleModals = () => {
      dtreeStore.closeModalSelectInheritanceMode()
      dtreeStore.openModalAttribute(currentStepIndex)
      dtreeStore.resetSelectedFilters()
    }

    // TODO:fix
    const handleReplace = () => {
      // dtreeStore.replaceStepData(subGroupName, 'enum')
      dtreeStore.resetSelectedFilters()
      dtreeStore.closeModalSelectInheritanceMode()
    }

    const handleModalJoin = () => {
      dtreeStore.openModalJoin()
    }

    const handleAddAttribute = () => {
      // addAttributeToStep('func', subGroupName)

      dtreeStore.resetSelectedFilters()
      dtreeStore.closeModalSelectInheritanceMode()
    }

    const handleCheckGroupItem = (checked: boolean, name: string) => {
      if (checked) {
        dtreeStore.addSelectedFilter(name)
      } else {
        dtreeStore.removeSelectedFilter(name)
      }
    }

    return (
      <ModalBase refer={ref} minHeight={340}>
        <HeaderModal
          groupName={dtreeStore.groupNameToChange}
          handleClose={handleClose}
        />

        <div className="flex items-center justify-between w-full mt-4 text-14">
          <div>{t('dtree.problemGroup')}</div>

          {attrData.family.map((group: string) => (
            <div key={group}>
              <Checkbox
                onChange={(e: any) =>
                  handleProblemGroup(e.target.checked, group)
                }
                checked={
                  problemGroupData
                    ? problemGroupData.includes(group)
                    : attrData.affected.includes(group)
                }
                className="mx-1 cursor-pointer"
              />
              <span>{group}</span>
            </div>
          ))}

          <Button
            onClick={handleReset}
            text="Reset"
            hasBackground={false}
            className="text-black h-4/5"
          />
        </div>

        <div className="flex justify-between w-full mt-4">
          <div className="text-14 text-grey-blue">
            {dtreeStore.selectedFilters.length} {t('dtree.selected')}
          </div>

          <div className="flex">
            <div
              className="text-14 text-blue-bright cursor-pointer"
              onClick={() => alert('This function is not ready yet')}
            >
              {t('general.selectAll')}
            </div>

            <ModsDivider />

            <div
              className="text-14 text-blue-bright cursor-pointer"
              onClick={() => alert('This function is not ready yet')}
            >
              {t('general.clearAll')}
            </div>
          </div>
        </div>

        <EditModalVariants
          variants={variants}
          disabled={false}
          handleCheckGroupItem={handleCheckGroupItem}
        />

        <SelectModalButtons
          handleAddAttribute={handleAddAttribute}
          handleClose={handleClose}
          handleModals={handleModals}
          handleModalJoin={handleModalJoin}
          handleReplace={handleReplace}
          disabled={dtreeStore.selectedFilters.length === 0}
          currentGroup={currentGroup}
        />
      </ModalBase>
    )
  },
)
