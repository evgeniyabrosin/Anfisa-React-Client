import { ReactElement, useEffect, useRef, useState } from 'react'
import { get } from 'lodash'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import activeStepStore from '@pages/filter/active-step.store'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { validateLocusCondition } from '@utils/validation/validateLocusCondition'
import dtreeModalStore from '../../../modals.store'
import { GeneRegionContent } from '../../query-builder/ui/gene-region-content'
import { HeaderModal } from '../../query-builder/ui/header-modal'
import { ModalBase } from '../../query-builder/ui/modal-base'
import { EditModalButtons } from './edit-modal-buttons'

export const ModalEditGeneRegion = observer((): ReactElement => {
  const ref = useRef(null)

  const currentStepIndex = activeStepStore.activeStepIndex
  const currentGroupIndex = dtreeModalStore.groupIndexToChange

  const currentGroup =
    dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

  const groupName = dtreeModalStore.groupNameToChange

  const variants = dtreeStore.statFuncData.variants

  const getDefaultValue = () => {
    const defaultValue = get(currentGroup[currentGroup.length - 1], 'locus')

    return defaultValue || ''
  }

  const [locusCondition, setLocusCondition] = useState(getDefaultValue())

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

  useEffect(() => {
    const params = `{"locus":"${getDefaultValue()}"}`

    dtreeStore.fetchStatFuncAsync(groupName, params)

    return () => dtreeStore.resetStatFuncData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    dtreeModalStore.closeModalEditGeneRegion()
  }

  const handleSaveChanges = () => {
    const params = { locus: locusCondition }

    changeFunctionalStep(params)
    dtreeModalStore.closeModalEditGeneRegion()
  }

  return (
    <ModalBase refer={ref} minHeight={250}>
      <HeaderModal
        groupName={dtreeModalStore.groupNameToChange}
        handleClose={handleClose}
      />

      <GeneRegionContent
        locusCondition={locusCondition}
        validateValue={validateValue}
        handleSetValue={handleSetValue}
        isErrorVisible={isErrorVisible}
        variants={variants}
      />

      <EditModalButtons
        handleClose={handleClose}
        handleSaveChanges={handleSaveChanges}
        disabled={isErrorVisible}
      />
    </ModalBase>
  )
})
