import { ReactElement, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Input } from '@ui/input'
import { AllNotModalMods } from './all-not-modal-mods'
import { EditModalVariants } from './edit-modal-variants'
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

    // TODO:fix
    const handleReplace = () => {
      // dtreeStore.replaceStepData(subGroupName, 'enum')
      dtreeStore.resetSelectedFilters()
      dtreeStore.closeModalSelectGeneRegion()
    }

    const handleModalJoin = () => {
      dtreeStore.openModalJoin()
    }

    const handleAddAttribute = () => {
      // addAttributeToStep('func', subGroupName)

      dtreeStore.resetSelectedFilters()
      dtreeStore.closeModalSelectGeneRegion()
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

        <SelectModalButtons
          handleAddAttribute={handleAddAttribute}
          handleClose={handleClose}
          handleModals={handleModals}
          handleModalJoin={handleModalJoin}
          handleReplace={handleReplace}
          disabled={isErrorVisible}
          currentGroup={currentGroup}
        />
      </ModalBase>
    )
  },
)
