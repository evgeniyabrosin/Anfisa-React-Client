import { ReactElement, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import dtreeStore from '@store/dtree'
import { addAttributeToStep } from '@utils/addAttributeToStep'
import { validateLocusCondition } from '@utils/validation/validateLocusCondition'
import { GeneRegionContent } from './gene-region-content'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'
import { SelectModalButtons } from './select-modal-buttons'

export const ModalSelectGeneRegion = observer((): ReactElement => {
  const ref = useRef(null)

  useEffect(() => {
    return () => dtreeStore.resetStatFuncData()
  }, [])

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
    validateLocusCondition({
      value,
      setIsErrorVisible,
      groupName,
      currentStepIndex,
    })
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
})
