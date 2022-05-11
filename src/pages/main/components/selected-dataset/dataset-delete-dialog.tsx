import { ReactElement } from 'react'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
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
}: IPresetDeleteDialogProps): ReactElement => {
  const { datasetName } = datasetStore

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={t('ds.deleteDialog.title')}
      cancelText={t('ds.deleteDialog.cancel')}
      applyText={t('ds.deleteDialog.confirm')}
      onApply={onDelete}
    >
      <p>{t('ds.deleteDialog.message', { datasetName })}</p>
    </Dialog>
  )
}
