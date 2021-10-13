import { ReactElement, useEffect, useRef, useState } from 'react'
import { get } from 'lodash'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Input } from '@ui/input'
import { changeFunctionalStep } from '@utils/changeAttribute/changeFunctionalStep'
import { AllNotModalMods } from './all-not-modal-mods'
import { EditModalButtons } from './edit-modal-buttons'
import { EditModalVariants } from './edit-modal-variants'
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

        <div className="flex justify-between w-full mt-4 text-14">
          <div className="flex h-9">
            <span>{t('dtree.locus')}</span>

            <div className="relative flex h-9 ml-2">
              <Input
                value={locusCondition}
                onChange={(e: any) => {
                  validateValue(e.target.value)
                  handleSetValue(e.target.value)
                }}
                className="h-5"
              />

              {isErrorVisible && (
                <div className="absolute bottom-0 flex items-center h-3 text-10 text-red-secondary">
                  {t('dtree.chromosomeNameIsNotCorrect')}
                </div>
              )}
            </div>
          </div>

          <AllNotModalMods />
        </div>

        <EditModalVariants variants={variants} disabled={true} />

        <EditModalButtons
          handleClose={handleClose}
          handleSaveChanges={handleSaveChanges}
          disabled={isErrorVisible}
        />
      </ModalBase>
    )
  },
)
