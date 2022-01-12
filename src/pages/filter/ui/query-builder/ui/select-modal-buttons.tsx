import { Fragment } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ModalSources } from '@core/enum/modal-sources'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { DecisionTreeModal } from '@components/data-testid/decision-tree-modal.cy'
import { ModalJoin } from './modal-join'

interface IProps {
  handleModals: () => void
  handleClose: () => void
  handleModalJoin: () => void
  currentGroup: any[]
  disabled: any
  handleAddAttribute: (action: ActionType) => void
}

export const SelectModalButtons = observer(
  ({
    handleModals,
    handleClose,
    handleModalJoin,
    currentGroup,
    disabled,
    handleAddAttribute,
  }: IProps) => {
    return (
      <div
        className={cn('flex mt-1 items-center', {
          'justify-end': dtreeStore.modalSource === ModalSources.TreeStat,
          'justify-between': dtreeStore.modalSource === ModalSources.TreeStep,
        })}
      >
        {dtreeStore.modalSource === ModalSources.TreeStep && (
          <div
            className="text-14 text-blue-bright font-medium cursor-pointer"
            onClick={handleModals}
          >
            {t('dtree.backToAttribute')}
          </div>
        )}

        <div className="flex">
          <Button
            text={t('general.cancel')}
            variant={'secondary'}
            className={'mr-2'}
            onClick={() => handleClose()}
            dataTestId={DecisionTreeModal.cancelButton}
          />
          {currentGroup && currentGroup.length > 0 ? (
            <Fragment>
              <Button
                disabled={disabled}
                text={t('dtree.replace')}
                onClick={() => handleAddAttribute('REPLACE')}
                dataTestId={DecisionTreeModal.replaceButton}
              />

              <div className="relative">
                <Button
                  disabled={disabled}
                  text={t('dtree.addByJoining')}
                  onClick={handleModalJoin}
                  icon={<Icon name="Arrow" className="transform -rotate-90" />}
                  dataTestId={DecisionTreeModal.addByJoin}
                />

                {dtreeStore.isModalJoinVisible && (
                  <ModalJoin handleAddAttribute={handleAddAttribute} />
                )}
              </div>
            </Fragment>
          ) : (
            <Button
              text={t('dtree.addNewAttribute')}
              onClick={() => handleAddAttribute('INSERT')}
              disabled={disabled}
              dataTestId={DecisionTreeModal.addSelectedAttributes}
            />
          )}
        </div>
      </div>
    )
  },
)
