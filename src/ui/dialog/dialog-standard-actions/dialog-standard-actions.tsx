import { ReactElement } from 'react'

import { t } from '@i18n'
import { Button } from '@ui/button'
import { Loader } from '@components/loader'
import { TEditorTheme } from '@pages/filter/dtree/components/modals/components/text-editor-dialog'

export interface IDialogStandardActionsProps {
  cancelText?: string
  applyText?: string
  onClose?: () => void
  onApply?: () => void
  handleChangeTheme?: () => void
  isApplyDisabled?: boolean
  isLoading?: boolean
  theme?: TEditorTheme
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
        className="relative"
        disabled={isApplyDisabled || isLoading}
        text={
          <>
            {isLoading && (
              <Loader
                size="xs"
                color="white"
                className="absolute inset-0 flex items-center justify-center"
              />
            )}
            <span className={isLoading ? 'invisible' : ''}>
              {applyText || t('general.apply')}
            </span>
          </>
        }
        onClick={onApply}
      />
    </>
  )
}
