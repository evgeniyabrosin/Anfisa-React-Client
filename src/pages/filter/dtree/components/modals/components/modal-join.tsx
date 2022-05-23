import { ReactElement, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import { InstrModifyingActionNames } from '@service-providers/decision-trees'
import activeStepStore, { ActiveStepOptions } from '../../active-step.store'
import modalsVisibilityStore from '../modals-visibility-store'

interface IProps {
  handleAddAttribute: (action: ActionType) => void
}

export const ModalJoin = observer(
  ({ handleAddAttribute }: IProps): ReactElement => {
    const ref = useRef(null)

    useOutsideClick(ref, () => modalsVisibilityStore.closeModalJoin())

    const isReturnedVariants =
      activeStepStore.activeStepOption === ActiveStepOptions.ReturnedVariants

    const handleJoin = (typeOfJoin: ActionType) => {
      handleAddAttribute(typeOfJoin)

      modalsVisibilityStore.closeModalJoin()
      modalsVisibilityStore.closeModalEnum()
      modalsVisibilityStore.closeModalNumeric()
      modalsVisibilityStore.closeModalInheritanceMode()
      modalsVisibilityStore.closeModalCustomInheritanceMode()
    }

    return (
      <div ref={ref} className="top-10 absolute z-50 text-14 font-normal">
        <div className="top-8 w-28 flex flex-col justify-between px-0 py-0 bg-white rounded-md shadow-dark">
          <div
            onClick={() =>
              handleJoin(
                isReturnedVariants
                  ? InstrModifyingActionNames.UP_JOIN_AND
                  : InstrModifyingActionNames.JOIN_AND,
              )
            }
            className="cursor-pointer rounded-br-none rounded-bl-none rounded-l-md rounded-r-md py-2 px-2 hover:bg-blue-bright hover:text-white"
            data-testid={DecisionTreeModalDataCy.joinByAnd}
          >
            {t('dtree.joinByAnd')}
          </div>

          <div
            onClick={() =>
              handleJoin(
                isReturnedVariants
                  ? InstrModifyingActionNames.UP_JOIN_OR
                  : InstrModifyingActionNames.JOIN_OR,
              )
            }
            className="cursor-pointer py-2 px-2 hover:bg-blue-bright hover:text-white rounded-bl-md rounded-br-md"
            data-testid={DecisionTreeModalDataCy.joinByOr}
          >
            {t('dtree.joinByOr')}
          </div>
        </div>
      </div>
    )
  },
)
