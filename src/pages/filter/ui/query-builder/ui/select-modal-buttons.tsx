import { Fragment } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ActionType } from '@declarations'
import { ModalSources } from '@core/enum/modal-sources'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { DecisionTreeModalDataCy } from '@components/data-testid/decision-tree-modal.cy'
import dtreeModalStore from '../../../modals.store'
import { ModalJoin } from './modal-join'

// TODO: `currentGroup` prop is used only for empty group test
//       may be we can use `isEmptyGroup` boolean prop or
//       isEmptyCurrentGroup getter from dtreeStore
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
          'justify-end': dtreeModalStore.modalSource === ModalSources.TreeStat,
          'justify-between':
            dtreeModalStore.modalSource === ModalSources.TreeStep,
        })}
      >
        {dtreeModalStore.modalSource === ModalSources.TreeStep && (
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
            variant="secondary"
            className="mr-2"
            onClick={() => handleClose()}
            dataTestId={DecisionTreeModalDataCy.cancelButton}
          />
          {currentGroup && currentGroup.length > 0 ? (
            <Fragment>
              <Button
                disabled={disabled}
                text={t('dtree.replace')}
                className="mr-2"
                onClick={() => handleAddAttribute('REPLACE')}
                dataTestId={DecisionTreeModalDataCy.replaceButton}
              />

              <div className="relative">
                <Button
                  disabled={disabled}
                  text={t('dtree.addByJoining')}
                  onClick={handleModalJoin}
                  icon={<Icon name="Arrow" className="transform -rotate-90" />}
                  dataTestId={DecisionTreeModalDataCy.addByJoin}
                />

                {dtreeModalStore.isModalJoinVisible && (
                  <ModalJoin handleAddAttribute={handleAddAttribute} />
                )}
              </div>
            </Fragment>
          ) : (
            <Button
              text={t('dtree.addNewAttribute')}
              onClick={() => handleAddAttribute('INSERT')}
              disabled={disabled}
              dataTestId={DecisionTreeModalDataCy.addSelectedAttributes}
            />
          )}
        </div>
      </div>
    )
  },
)
