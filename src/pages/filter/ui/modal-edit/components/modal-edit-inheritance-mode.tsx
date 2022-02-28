import { ReactElement, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import activeStepStore from '@store/dtree/active-step.store'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { HeaderModal } from '../../query-builder/ui/header-modal'
import { InheritanceModeContent } from '../../query-builder/ui/inheritance-mode-content'
import { ModalBase } from '../../query-builder/ui/modal-base'
import { EditModalButtons } from './edit-modal-buttons'

export const ModalEditInheritanceMode = observer((): ReactElement => {
  const ref = useRef(null)

  const currentStepIndex = activeStepStore.activeStepIndex
  const currentGroupIndex = dtreeStore.groupIndexToChange

  const currentGroup =
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

  const groupName = dtreeStore.groupNameToChange

  const selectedGroupsAmount =
    currentGroup && currentGroup.length > 0 ? dtreeStore.selectedFilters : []

  const currentGroupLength =
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex].length

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

  const [problemGroupData, setProblemGroupData] =
    useState<string[]>(problemGroup)

  useEffect(() => {
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]
      .find((elem: any) => Array.isArray(elem))
      .map((item: string) => dtreeStore.addSelectedFilter(item))

    return () => {
      dtreeStore.resetSelectedFilters()
    }
  }, [currentGroupIndex, currentGroupLength, currentStepIndex])

  useEffect(() => {
    const params = `{"problem_group":["${problemGroup
      .toString()
      .split(',')
      .join('","')}"]}`

    const initAsync = async () => {
      await dtreeStore.fetchStatFuncAsync(groupName, params)
    }

    initAsync()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    dtreeStore.closeModalEditInheritanceMode()
  }

  const handleSaveChanges = () => {
    const params = { problem_group: problemGroupData }

    changeFunctionalStep(params, true)
    dtreeStore.closeModalEditInheritanceMode()
    dtreeStore.resetSelectedFilters()
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
    <ModalBase refer={ref} minHeight={340}>
      <HeaderModal
        groupName={dtreeStore.groupNameToChange}
        handleClose={handleClose}
      />

      <InheritanceModeContent
        attrData={attrData}
        handleProblemGroup={handleProblemGroup}
        problemGroupData={problemGroupData}
        handleReset={handleReset}
      />

      <EditModalButtons
        handleClose={handleClose}
        handleSaveChanges={handleSaveChanges}
        disabled={
          selectedGroupsAmount.length === 0 ||
          (problemGroupData && problemGroupData.length === 0)
        }
      />
    </ModalBase>
  )
})
