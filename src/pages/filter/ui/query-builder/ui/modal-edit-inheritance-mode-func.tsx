import { ReactElement, useEffect, useRef, useState } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { ModsDivider } from './mods-divider'

const ModalView = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.8);
`

const ModalContent = styled.div`
  width: 580px;
  height: 340px;
  background: white;
  border-radius: 0.5rem;
`

export const ModalEditInheritanceModeFunc = observer(
  (): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalEditInheritanceModeFunc())

    const currentStepIndex = dtreeStore.currentStepIndex
    const currentGroupIndex = dtreeStore.groupIndexToChange

    const currentGroup =
      dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

    const groupName = dtreeStore.groupNameToChange

    const selectedGroupsAmount =
      currentGroup && currentGroup.length > 0 ? dtreeStore.selectedFilters : []

    const currentGroupLength =
      dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex].length

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

    const problemGroup =
      Object.keys(currentGroup[currentGroup.length - 1]).length > 0
        ? Object.values(currentGroup[currentGroup.length - 1])[0]
        : attrData.affected

    const [problemGroupData, setProblemGroupData] = useState<string[]>(
      problemGroup,
    )

    useEffect(() => {
      dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]
        .find((elem: any) => Array.isArray(elem))
        .map((item: string) => dtreeStore.addSelectedFilter(item))

      return () => {
        dtreeStore.resetSelectedFilters()
      }
    }, [currentGroupIndex, currentGroupLength, currentStepIndex])

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

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCheckGroupItem = (checked: boolean, name: string) => {
      if (checked) {
        dtreeStore.addSelectedFilter(name)
      } else {
        dtreeStore.removeSelectedFilter(name)
      }
    }

    const handleClose = () => {
      dtreeStore.closeModalEditInheritanceModeFunc()
    }

    const handleDeleteInstruction = () => {
      dtreeStore.removeStepData(currentGroupIndex)
      dtreeStore.closeModalEditInheritanceModeFunc()
    }

    const handleSaveChanges = () => {
      const params = { problem_group: problemGroupData }

      dtreeStore.updateStepData(currentGroupIndex, params)
      dtreeStore.closeModalEditInheritanceModeFunc()
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

    return (
      <ModalView className="bg-grey-blue">
        <ModalContent
          ref={ref}
          className="flex flex-col justify-between py-4 px-4"
        >
          <div className="flex w-full justify-between items-center font-medium mb-5">
            <div>{dtreeStore.groupNameToChange}</div>

            <Icon
              name="Close"
              size={16}
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>

          <div className="flex items-center justify-between w-full mb-1">
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
                  className="mx-1"
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

          <div className="flex my-2 justify-between w-full mb-2">
            <div className="text-14 text-grey-blue">
              {currentGroup.length > 0 &&
              problemGroupData &&
              problemGroupData.length > 0
                ? dtreeStore.selectedFilters.length
                : 0}{' '}
              {t('dtree.selected')}
            </div>

            <div className="flex">
              <div className="text-14 text-blue-bright">
                {t('general.selectAll')}
              </div>

              <ModsDivider />

              <div className="text-14 text-blue-bright">
                {t('general.clearAll')}
              </div>
            </div>
          </div>

          <div className="h-full overflow-y-auto">
            {variants ? (
              variants.map((variant: any) => (
                <div key={variant} className="flex items-center mb-2 text-14">
                  <Checkbox
                    checked={
                      currentGroup.length > 0
                        ? dtreeStore.selectedFilters.includes(variant[0])
                        : false
                    }
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
              ))
            ) : (
              <div className="flex justify-center items-center text-14 text-grey-blue">
                {t('dtree.noFilters')}
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <Button
              text={t('dtree.deleteInstruction')}
              hasBackground={false}
              className="text-black border-red-secondary hover:text-white hover:bg-red-secondary"
              onClick={handleDeleteInstruction}
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
                  disabled={
                    selectedGroupsAmount.length === 0 ||
                    (problemGroupData && problemGroupData.length === 0)
                  }
                  text={t('dtree.saveChanges')}
                  onClick={handleSaveChanges}
                />
              </div>
            </div>
          </div>
        </ModalContent>
      </ModalView>
    )
  },
)
