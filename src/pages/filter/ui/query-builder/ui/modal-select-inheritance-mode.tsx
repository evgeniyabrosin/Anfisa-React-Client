import { ReactElement, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import dtreeStore from '@store/dtree'
import { HeaderModal } from './header-modal'
import { InheritanceModeContent } from './inheritance-mode-content'
import { ModalBase } from './modal-base'
import { SelectModalButtons } from './select-modal-buttons'

export const ModalSelectInheritanceMode = observer(
  (): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalSelectInheritanceMode())

    const currentStepIndex = dtreeStore.currentStepIndex

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
