import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import { Button } from '@ui/button'
import { DatasetDeleteDialog } from './dataset-delete-dialog'

export const DeleteDatasetButton = observer((): ReactElement => {
  const { isPossibleDeleteDataset, datasetName } = datasetStore

  const [deleteDialog, openDeleteDialog, closeDeleteDialog] = useModal()

  return (
    <>
      {isPossibleDeleteDataset && (
        <Button
          text={t('ds.deleteDataset')}
          onClick={() => {
            openDeleteDialog()
          }}
        />
      )}

      <DatasetDeleteDialog
        {...deleteDialog}
        onClose={closeDeleteDialog}
        onDelete={() => {
          closeDeleteDialog()
          dirinfoStore.deleteDataset(datasetName)
        }}
      />
    </>
  )
})
