import { ReactElement, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import activeStepStore from '@store/dtree/active-step.store'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { HeaderModal } from './header-modal'
import { InheritanceModeContent } from './inheritance-mode-content'
import { ModalBase } from './modal-base'
import { SelectModalButtons } from './select-modal-buttons'

export const ModalSelectInheritanceMode = observer((): ReactElement => {
  const ref = useRef(null)

  const currentStepIndex = activeStepStore.activeStepIndex

  const currentGroup = dtreeStore.stepData[currentStepIndex].groups

  const groupName = dtreeStore.groupNameToChange

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

  const [problemGroupData, setProblemGroupData] =
    useState<string[]>(problemGroup)

  useEffect(() => {
    const params = `{"problem_group":["${problemGroup
      .toString()
      .split(',')
      .join('","')}"]}`

    const initAsync = async () => {
      await dtreeStore.fetchStatFuncAsync(groupName, params)
    }

    initAsync()

    return () => {
      dtreeStore.resetSelectedFilters()
      dtreeStore.resetStatFuncData()
    }

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
    dtreeStore.openModalAttribute()
    dtreeStore.resetSelectedFilters()
  }

  const handleModalJoin = () => {
    dtreeStore.openModalJoin()
  }

  const handleAddAttribute = (action: ActionType) => {
    const params = { problem_group: problemGroupData }

    addAttributeToStep(action, 'func', null, params)

    dtreeStore.resetSelectedFilters()
    dtreeStore.closeModalSelectInheritanceMode()
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

      <SelectModalButtons
        handleClose={handleClose}
        handleModals={handleModals}
        handleModalJoin={handleModalJoin}
        handleAddAttribute={handleAddAttribute}
        disabled={dtreeStore.selectedFilters.length === 0}
        currentGroup={currentGroup}
      />
    </ModalBase>
  )
})
