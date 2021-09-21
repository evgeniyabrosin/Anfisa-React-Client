import { Fragment, ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { ChangeStepActionType } from '@declarations'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { changeStep } from '@utils/changeStep'

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

    const sendChange = (stepIndex: number, action: ChangeStepActionType) => {
      changeStep(stepIndex, action)
      hideModal()
    }

    const isFirstelement = index === 0

    // TODO: add split
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
            onClick={() => sendChange(index, 'DUPLICATE')}
            className="font-normal py-2 px-2 hover:bg-grey-light"
          >
            {t('dtree.duplicate')}
          </div>

          <div
            onClick={() => {
              sendChange(index, 'NEGATE')
            }}
            className="font-normal py-2 px-2 hover:bg-grey-light"
          >
            {t('dtree.negate')}
          </div>

          <div
            onClick={() => {
              sendChange(index, 'DELETE')
            }}
            className="rounded-tr-none rounded-tl-none rounded-bl-md rounded-br-md rounded-md font-normal py-2 px-2 hover:bg-grey-light"
          >
            {t('dtree.delete')}
          </div>
          {/* UI is not yet ready for such functionality */}
          {!isFirstelement && (
            <Fragment>
              <div
                onClick={() => {
                  sendChange(index, 'JOIN-AND')
                }}
                className="rounded-tr-none rounded-tl-none rounded-bl-md rounded-br-md rounded-md font-normal py-2 px-2 hover:bg-grey-light"
              >
                {t('dtree.joinByAnd')}
              </div>
              <div
                onClick={() => {
                  sendChange(index, 'JOIN-OR')
                }}
                className="rounded-tr-none rounded-tl-none rounded-bl-md rounded-br-md rounded-md font-normal py-2 px-2 hover:bg-grey-light"
              >
                {t('dtree.joinByOr')}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    )
  },
)
