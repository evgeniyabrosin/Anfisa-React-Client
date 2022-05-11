import { ReactElement } from 'react'

import { t } from '@i18n'
import { Dialog } from '@ui/dialog'

interface IPresetDeleteDialogProps {
  isOpen?: boolean
  onClose: () => void
  onDelete: () => void
  datasetName?: string
}

export const DatasetDeleteDialog = ({
  isOpen,
  onClose,
  onDelete,
  datasetName,
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
      <p>{t('presetControl.deleteDialog.message', { datasetName })}</p>
    </Dialog>
  )
}
