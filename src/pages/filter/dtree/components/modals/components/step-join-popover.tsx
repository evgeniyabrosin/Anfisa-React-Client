import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { t } from '@i18n'
import { Popover } from '@ui/popover'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import { InstrModifyingActionNames } from '@service-providers/decision-trees'
import activeStepStore, { ActiveStepOptions } from '../../active-step.store'
import modalsVisibilityStore from '../modals-visibility-store'

interface IStepJoinPopoverProps {
  isPopoverOpen: boolean
  popoverAnchor: HTMLElement | null
  handleAddAttribute: (action: ActionType) => void
  closePopover: () => void
}

export const StepJoinPopover = observer(
  ({
    isPopoverOpen,
    popoverAnchor,
    handleAddAttribute,
    closePopover,
  }: IStepJoinPopoverProps): ReactElement => {
    const isReturnedVariants =
      activeStepStore.activeStepOption === ActiveStepOptions.ReturnedVariants

    const handleJoin = (typeOfJoin: ActionType) => {
      handleAddAttribute(typeOfJoin)
      closePopover()
      modalsVisibilityStore.closeEnumDialog()
      modalsVisibilityStore.closeNumericDialog()
      modalsVisibilityStore.closeModalInheritanceMode()
      modalsVisibilityStore.closeModalCustomInheritanceMode()
    }

    return (
      <Popover
        isOpen={isPopoverOpen}
        anchorEl={popoverAnchor}
        onClose={closePopover}
      >
        <div className="top-2 left-2 absolute text-14 font-normal">
          <div className="w-28 flex flex-col justify-between px-0 py-0 bg-white rounded-md shadow-dark">
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
      </Popover>
    )
  },
)
