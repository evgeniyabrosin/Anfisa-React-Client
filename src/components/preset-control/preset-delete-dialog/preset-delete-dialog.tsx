import { ReactElement } from 'react'

import { t } from '@i18n'
import { Dialog } from '@ui/dialog'

interface IPresetDeleteDialogProps {
  isOpen?: boolean
  onClose: () => void
  onDelete: () => void
  presetName?: string
}

export const PresetDeleteDialog = ({
  isOpen,
  onClose,
  onDelete,
  presetName,
}: IPresetDeleteDialogProps): ReactElement => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('presetControl.deleteDialog.title')}
      cancelText={t('presetControl.deleteDialog.cancel')}
      applyText={t('presetControl.deleteDialog.confirm')}
      onApply={onDelete}
    >
      <p>{t('presetControl.deleteDialog.message', { presetName })}</p>
    </Dialog>
  )
}
