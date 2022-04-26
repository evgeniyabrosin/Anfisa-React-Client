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
  coordinates?: { x: number; y: number } | null
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
  coordinates,
  shouldCloseOnOutsideClick,
}: React.PropsWithChildren<IPopupCardProps>) => {
  const ref = useRef<HTMLDivElement>(null)

  const onCloseForOutsideClick =
    shouldCloseOnOutsideClick && onClose ? onClose : noop

  useOutsideClick(ref, onCloseForOutsideClick)

  return (
    <div
      className={cn('bg-white shadow-card rounded', className)}
      style={{
        inset: '0px auto auto 0px',
        position: `${coordinates ? 'absolute' : 'relative'}`,
        transform: `translate(${coordinates?.x}px, ${coordinates?.y}px)`,
      }}
      ref={ref}
    >
      <div className="px-4 pt-4">
        <div className="flex justify-between mb-5 items-center">
          <p className="text-blue-dark  font-medium ">{title}</p>
          <Icon
            name="Close"
            onClick={onClose}
            size={16}
            className="cursor-pointer"
          />
        </div>
      </div>
      <div className="w-full px-4">{children}</div>
      <div className="flex justify-end pb-4 px-4 mt-4">
        <Button
          text={cancelText || t('general.cancel')}
          variant="secondary"
          onClick={onClose}
        />

        <Button
          disabled={isApplyDisabled || isLoading}
          text={
            isLoading ? (
              <Loader size="xs" color="white" />
            ) : (
              applyText || t('general.apply')
            )
          }
          className="ml-3"
          onClick={onApply}
          dataTestId={MainTableDataCy.applyButton}
        />
      </div>
    </div>
  )
}
