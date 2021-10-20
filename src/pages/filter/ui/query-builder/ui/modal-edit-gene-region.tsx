import { ReactElement, useEffect, useRef, useState } from 'react'
import { get } from 'lodash'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import dtreeStore from '@store/dtree'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { EditModalButtons } from './edit-modal-buttons'
import { GeneRegionContent } from './gene-region-content'
import { HeaderModal } from './header-modal'
import { ModalBase } from './modal-base'

export const ModalEditGeneRegion = observer(
  (): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => dtreeStore.closeModalEditGeneRegion())

    const currentStepIndex = dtreeStore.currentStepIndex
    const currentGroupIndex = dtreeStore.groupIndexToChange

    const currentGroup =
      dtreeStore.stepData[currentStepIndex].groups[currentGroupIndex]

    const groupName = dtreeStore.groupNameToChange

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

    useEffect(() => {
      const indexForApi = dtreeStore.getStepIndexForApi(currentStepIndex)

      const params = `{"locus":"${getDefaultValue()}"}`

      dtreeStore.setCurrentStepIndexForApi(indexForApi)

      dtreeStore.fetchStatFuncAsync(groupName, params)

      return () => dtreeStore.resetStatFuncData()

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClose = () => {
      dtreeStore.closeModalEditGeneRegion()
    }

    const handleSaveChanges = () => {
      const params = { locus: locusCondition }

      changeFunctionalStep(params)
      dtreeStore.closeModalEditGeneRegion()
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

        <EditModalButtons
          handleClose={handleClose}
          handleSaveChanges={handleSaveChanges}
          disabled={isErrorVisible}
        />
      </ModalBase>
    )
  },
)
