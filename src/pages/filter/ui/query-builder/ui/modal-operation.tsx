import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { deleteAttributeFromStep } from '@utils/deleteAttributeFromStep'

interface IProps {
  hideModal: () => void
  index: number
}

export const ModalOperation = observer(
  ({ hideModal, index }: IProps): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, hideModal)

    const code = dtreeStore.dtreeCode

    const createStep = (stepIndex: number, position: 'BEFORE' | 'AFTER') => {
      dtreeStore.insertStep(position, stepIndex)

      const currentIndex = position === 'BEFORE' ? stepIndex : stepIndex + 1
      const indexForApi = dtreeStore.getStepIndexForApi(currentIndex)

      dtreeStore.setCurrentStepIndexForApi(indexForApi)
      dtreeStore.fetchDtreeStatAsync(code, String(indexForApi))
    }

    const deleteStep = (stepIndex: number) => {
      deleteAttributeFromStep(stepIndex, 'POINT')

      hideModal()
    }

    return (
      <div ref={ref}>
        <div className="absolute z-50 top-8 w-32 flex flex-col justify-between px-0 py-0 bg-white rounded-md text-14 cursor-pointer shadow-dark">
          <div
            onClick={() => createStep(index, 'BEFORE')}
            className="rounded-br-none rounded-bl-none rounded-l-md rounded-r-md font-normal py-2 px-2 hover:bg-grey-light"
          >
            {t('dtree.addStepBefore')}
          </div>

          <div
            onClick={() => createStep(index, 'AFTER')}
            className="font-normal py-2 px-2 hover:bg-grey-light"
          >
            {t('dtree.addStepAfter')}
          </div>

          <div
            onClick={() => {
              dtreeStore.duplicateStep(index)
              hideModal()
            }}
            className="font-normal py-2 px-2 hover:bg-grey-light"
          >
            {t('dtree.duplicate')}
          </div>

          <div
            onClick={() => {
              dtreeStore.negateStep(index)
              hideModal()
            }}
            className="font-normal py-2 px-2 hover:bg-grey-light"
          >
            {t('dtree.negate')}
          </div>

          <div
            onClick={() => {
              deleteStep(index)
            }}
            className="rounded-tr-none rounded-tl-none rounded-bl-md rounded-br-md rounded-md font-normal py-2 px-2 hover:bg-grey-light"
          >
            {t('dtree.delete')}
          </div>
        </div>
      </div>
    )
  },
)
