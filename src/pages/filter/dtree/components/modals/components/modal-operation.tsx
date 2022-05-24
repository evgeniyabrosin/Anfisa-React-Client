import { Fragment, ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { ChangeStepActionType } from '@declarations'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import stepStore, { CreateEmptyStepPositions } from '@store/dtree/step.store'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { InstrModifyingActionNames } from '@service-providers/decision-trees'
import { changeStep } from '@utils/changeStep'

interface IModalOperationProps {
  hideModal: () => void
  index: number
}

export const ModalOperation = observer(
  ({ hideModal, index }: IModalOperationProps): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, hideModal)

    const createStep = (
      stepIndex: number,
      position: CreateEmptyStepPositions,
    ) => {
      stepStore.createEmptyStep(stepIndex, position)

      hideModal()
    }

    const deleteStep = (stepIndex: number) => {
      const currentStep = stepStore.steps[stepIndex]

      const stepHasAttribute = currentStep.groups.length > 0

      stepHasAttribute
        ? changeStep(stepIndex, InstrModifyingActionNames.DELETE)
        : stepStore.removeStep(stepIndex)

      hideModal()
    }

    const sendChange = (stepIndex: number, action: ChangeStepActionType) => {
      changeStep(stepIndex, action)
      hideModal()
    }

    const currentStep = stepStore.steps[index]

    const isFirstStep = index === 0

    const hasMoreThanOneAttribute = currentStep.groups?.length > 1
    const isNegateStep = currentStep.negate
    const isSplitPossible = hasMoreThanOneAttribute && !isNegateStep

    return (
      <div ref={ref}>
        <div className="absolute z-50 top-8 w-32 flex flex-col justify-between px-0 py-0 bg-white rounded-md text-14 cursor-pointer shadow-dark">
          <Fragment>
            <div
              onClick={() => createStep(index, CreateEmptyStepPositions.BEFORE)}
              className="rounded-br-none rounded-bl-none rounded-l-md rounded-r-md font-normal py-2 px-2 hover:bg-grey-light"
            >
              {t('dtree.addStepBefore')}
            </div>

            <div
              onClick={() => createStep(index, CreateEmptyStepPositions.AFTER)}
              className="font-normal py-2 px-2 hover:bg-grey-light"
              data-testid={DecisionTreesResultsDataCy.addStepAfter}
            >
              {t('dtree.addStepAfter')}
            </div>

            <div
              onClick={() =>
                sendChange(index, InstrModifyingActionNames.DUPLICATE)
              }
              className="font-normal py-2 px-2 hover:bg-grey-light"
            >
              {t('dtree.duplicate')}
            </div>

            <div
              onClick={() => {
                sendChange(index, InstrModifyingActionNames.NEGATE)
              }}
              className="font-normal py-2 px-2 hover:bg-grey-light"
            >
              {t('dtree.negate')}
            </div>

            <div
              onClick={() => {
                deleteStep(index)
              }}
              className="font-normal py-2 px-2 hover:bg-grey-light"
              data-testid={DecisionTreesResultsDataCy.deleteStep}
            >
              {t('dtree.delete')}
            </div>
            {!isFirstStep && (
              <Fragment>
                <div
                  onClick={() => {
                    sendChange(index, InstrModifyingActionNames.JOIN_AND)
                  }}
                  className="font-normal py-2 px-2 hover:bg-grey-light"
                >
                  {t('dtree.joinByAnd')}
                </div>
                <div
                  onClick={() => {
                    sendChange(index, InstrModifyingActionNames.JOIN_OR)
                  }}
                  className="step-menu-btn"
                >
                  {t('dtree.joinByOr')}
                </div>
              </Fragment>
            )}
          </Fragment>

          {isSplitPossible && (
            <div
              onClick={() => {
                sendChange(index, InstrModifyingActionNames.SPLIT)
              }}
              className="step-menu-btn"
            >
              {t('dtree.split')}
            </div>
          )}
        </div>
      </div>
    )
  },
)
