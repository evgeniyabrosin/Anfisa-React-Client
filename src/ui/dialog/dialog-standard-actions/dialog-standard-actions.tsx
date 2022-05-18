import React, { ReactElement } from 'react'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Loader } from '@components/loader'

export interface IDialogStandardActionsProps {
  cancelText?: string
  applyText?: string
  onClose?: () => void
  onApply?: () => void
  isApplyDisabled?: boolean
  isLoading?: boolean
}

export const DialogStandardActions = ({
  cancelText,
  applyText,
  onClose,
  onApply,
  isApplyDisabled,
  isLoading,
}: IDialogStandardActionsProps): ReactElement => {
  return (
    <>
      <Button
        text={cancelText || t('general.cancel')}
        variant="tertiary"
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
        onClick={onApply}
      />
    </>
  )
}
