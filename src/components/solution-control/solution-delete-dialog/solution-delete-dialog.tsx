import { ReactElement } from 'react'

import { t } from '@i18n'
import { Dialog } from '@ui/dialog'

interface ISolutionDeleteDialogProps {
  isOpen?: boolean
  onClose: () => void
  onDelete: () => void
  solutionName?: string
  controlName: string
}

export const SolutionDeleteDialog = ({
  isOpen,
  onClose,
  onDelete,
  solutionName,
  controlName,
}: ISolutionDeleteDialogProps): ReactElement => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('solutionControl.deleteDialog.title', { controlName })}
      cancelText={t('solutionControl.deleteDialog.cancel', { controlName })}
      applyText={t('solutionControl.deleteDialog.confirm', { controlName })}
      onApply={onDelete}
    >
      <p>
        {t('solutionControl.deleteDialog.message', {
          controlName,
          solutionName,
        })}
      </p>
    </Dialog>
  )
}
