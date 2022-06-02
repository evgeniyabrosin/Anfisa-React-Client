import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Dialog } from '@ui/dialog'
import { Input } from '@ui/input'
import { Upload } from '@components/upload/upload'
import handleDatasetStore from '../handle-dataset/handle-dataset.store'

export const ImportDialog = observer(() => {
  useEffect(() => () => handleDatasetStore.resetImportData(), [])

  return (
    <Dialog
      isOpen={handleDatasetStore.isImportModalShown}
      onClose={() => handleDatasetStore.toggleImportModal(false)}
      title={t('home.modals.importDataset')}
      applyText={t('home.modals.applyTextImport')}
      isApplyDisabled={handleDatasetStore.isImportDisabled}
      onApply={handleDatasetStore.importDataset}
      isLoading={handleDatasetStore.isImporting}
    >
      <div className="mb-4">
        <Input
          value={handleDatasetStore.importDatasetName}
          onChange={e => {
            handleDatasetStore.setDatasetName(e.target.value)
          }}
          label="Dataset Name"
          placeholder="Enter Dataset Name"
        />
      </div>
      <div className="flex items-center mb-4">
        <Upload
          onUpload={handleDatasetStore.setUploadedFiles}
          supportedFormats=".tgz, .gz"
        />
      </div>
    </Dialog>
  )
})
