import { ReactElement, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import dtreeStore from '@store/dtree'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { GeneRegionContent } from './gene-region-content'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'
import { SelectModalButtons } from './select-modal-buttons'

export const ModalSelectGeneRegion = observer(
  (): ReactElement => {
    const ref = useRef(null)

    useEffect(() => {
      return () => dtreeStore.resetStatFuncData()
    }, [])

    useOutsideClick(ref, () => dtreeStore.closeModalSelectGeneRegion())

    const currentStepIndex = dtreeStore.currentStepIndex

    const currentGroup = dtreeStore.stepData[currentStepIndex].groups

    const groupName = dtreeStore.groupNameToChange

    const variants = dtreeStore.statFuncData.variants

    const [locusCondition, setLocusCondition] = useState('')

    const [isErrorVisible, setIsErrorVisible] = useState(false)

    const handleSetValue = (value: string) => {
      setLocusCondition(value)
    }

    const validateValue = (value: string) => {
      let numberValue = value[3]
      let lastIndexOfName = 3

      if (+value[4] && value.length > 4) numberValue = value.slice(3, 5)

      if (numberValue) lastIndexOfName = 2 + numberValue.length

      if (
        value.slice(0, 3) !== 'chr' ||
        !+numberValue ||
        +numberValue > 23 ||
        value[lastIndexOfName + 1] !== ':' ||
        (!+value.slice(lastIndexOfName + 2) &&
          value.slice(lastIndexOfName + 2) !== '')
      ) {
        setIsErrorVisible(true)
      } else {
        setIsErrorVisible(false)

        const indexForApi = dtreeStore.getStepIndexForApi(currentStepIndex)

        const params = `{"locus":"${value}"}`

        dtreeStore.setCurrentStepIndexForApi(indexForApi)

        dtreeStore.fetchStatFuncAsync(groupName, params)
      }
    }

    const handleClose = () => {
      dtreeStore.closeModalSelectGeneRegion()
    }

    const handleModals = () => {
      dtreeStore.closeModalSelectGeneRegion()
      dtreeStore.openModalAttribute(currentStepIndex)
      dtreeStore.resetSelectedFilters()
    }

    const handleModalJoin = () => {
      dtreeStore.openModalJoin()
    }

    const handleAddAttribute = (action: ActionType) => {
      dtreeStore.addSelectedFilter(variants[0][0])
      const params = { locus: locusCondition }

      addAttributeToStep(action, 'func', null, params)
      dtreeStore.resetSelectedFilters()
      dtreeStore.closeModalSelectGeneRegion()
    }

    return (
      <ModalBase refer={ref} minHeight={250}>
        <HeaderModal
          groupName={dtreeStore.groupNameToChange}
          handleClose={handleClose}
        />

        <GeneRegionContent
          locusCondition={locusCondition}
          validateValue={validateValue}
          handleSetValue={handleSetValue}
          isErrorVisible={isErrorVisible}
          variants={variants}
        />

        <SelectModalButtons
          handleClose={handleClose}
          handleModals={handleModals}
          handleModalJoin={handleModalJoin}
          handleAddAttribute={handleAddAttribute}
          disabled={isErrorVisible}
          currentGroup={currentGroup}
        />
      </ModalBase>
    )
  },
)
