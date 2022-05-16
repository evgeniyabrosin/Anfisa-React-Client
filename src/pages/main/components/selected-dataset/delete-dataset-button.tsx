import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import dirinfoStore from '@store/dirinfo'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Dialog } from '@ui/dialog'

interface IProps {
  className?: string
}

export const DeleteDatasetButton = observer(
  ({ className }: IProps): ReactElement => {
    const { isPossibleDeleteDataset, datasetName } = datasetStore

    const [deleteDialog, openDeleteDialog, closeDeleteDialog] = useModal()
    const { isOpen } = deleteDialog

    const history = useHistory()

    const handleOnDelete = () => {
      closeDeleteDialog()
      dirinfoStore.deleteDataset(datasetName)
      history.push(Routes.Root)
      dirinfoStore.dirinfo.invalidate()
    }

    return (
      <>
        {isPossibleDeleteDataset && (
          <Button
            text={t('ds.deleteDataset')}
            onClick={() => {
              openDeleteDialog()
            }}
            className={className}
          />
        )}

        <Dialog
          isOpen={isOpen}
          onClose={closeDeleteDialog}
          title={t('ds.deleteDialog.title')}
          cancelText={t('ds.deleteDialog.cancel')}
          applyText={t('ds.deleteDialog.confirm')}
          onApply={handleOnDelete}
        >
          <p>{t('ds.deleteDialog.message', { datasetName })}</p>
        </Dialog>
      </>
    )
  },
)
