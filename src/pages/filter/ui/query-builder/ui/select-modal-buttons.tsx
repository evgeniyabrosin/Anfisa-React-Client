import { Fragment } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { ModalSources } from '@core/enum/modal-sources'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { ModalJoin } from './modal-join'

interface IProps {
  handleModals: () => void
  handleReplace: () => void
  handleClose: () => void
  handleModalJoin: () => void
  handleAddAttribute: () => void
  currentGroup: string
  getNumericData?: () => any[]
  disabled: any
}

export const SelectModalButtons = observer(
  ({
    handleModals,
    handleReplace,
    handleClose,
    handleModalJoin,
    handleAddAttribute,
    currentGroup,
    getNumericData,
    disabled,
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
            hasBackground={false}
            className="mr-2 text-black hover:bg-blue-bright hover:text-white"
            onClick={() => handleClose()}
          />
          {currentGroup && currentGroup.length > 0 ? (
            <Fragment>
              <Button
                disabled={disabled}
                text={t('dtree.replace')}
                className="mr-2 cursor-pointer"
                onClick={handleReplace}
              />

              <div className="relative">
                <Button
                  disabled={disabled}
                  text={t('dtree.addByJoin')}
                  className="cursor-pointer rounded-full"
                  onClick={handleModalJoin}
                  icon={<Icon name="Arrow" className="transform -rotate-90" />}
                />

                {dtreeStore.isModalJoinVisible &&
                  (getNumericData ? (
                    <ModalJoin numericData={getNumericData()} />
                  ) : (
                    <ModalJoin />
                  ))}
              </div>
            </Fragment>
          ) : (
            <Button
              text={t('dtree.addNewAttribute')}
              onClick={handleAddAttribute}
              disabled={disabled}
            />
          )}
        </div>
      </div>
    )
  },
)
