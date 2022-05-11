/* eslint-disable react/display-name */
import React, { useRef } from 'react'
import cn, { Argument } from 'classnames'
import noop from 'lodash/noop'

import { useOutsideClick } from '@core/hooks/use-outside-click'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { MainTableDataCy } from '@components/data-testid/main-table.cy'
import { Loader } from '@components/loader'

export interface IPopupCardProps {
  title: string
  cancelText?: string
  applyText?: string
  className?: Argument
  onClose?: () => void
  onApply?: () => void
  isApplyDisabled?: boolean
  isLoading?: boolean
  shouldCloseOnOutsideClick?: boolean
}

export const PopupCard = ({
  title,
  cancelText,
  applyText,
  children,
  className,
  onClose,
  onApply,
  isLoading,
  isApplyDisabled = false,
  shouldCloseOnOutsideClick = false,
}: React.PropsWithChildren<IPopupCardProps>) => {
  const ref = useRef(null)

  const handleOutsideClick =
    onClose && shouldCloseOnOutsideClick ? onClose : noop

  useOutsideClick(ref, handleOutsideClick)
  return (
    <div
      style={{ minWidth: 342 }}
      className={cn('bg-white shadow-card rounded-lg', className)}
      ref={ref}
    >
      <div className="px-4 pt-4">
        <div className="flex justify-between mb-4 items-center">
          <span className="text-blue-dark font-medium">{title}</span>
          <Icon
            name="Close"
            onClick={onClose}
            size={16}
            className="cursor-pointer"
          />
        </div>

        <div className="w-full">{children}</div>
        <div className="flex justify-end pb-4 mt-3">
          <Button
            text={cancelText || t('general.cancel')}
            variant="tertiary"
            onClick={onClose}
          />

          <Button
            disabled={isApplyDisabled || isLoading}
            variant="secondary"
            text={
              isLoading ? (
                <Loader size="xs" color="white" />
              ) : (
                applyText || t('general.applyFilters')
              )
            }
            className="ml-3"
            onClick={onApply}
            dataTestId={MainTableDataCy.applyButton}
          />
        </div>
      </div>
    </div>
  )
}
