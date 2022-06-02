import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { Checkbox } from '@ui/checkbox/checkbox'
import { Dialog } from '@ui/dialog'
import handleDatasetStore from '../handle-dataset/handle-dataset.store'

export const ExportDialog = observer(() => {
  useEffect(() => () => handleDatasetStore.resetExportData(), [])

  return (
    <Dialog
      isOpen={handleDatasetStore.isExportModalShown}
      onClose={() => handleDatasetStore.toggleExportModal(false)}
      title={t('home.modals.exportDataset')}
      applyText={t('home.modals.applyTextExport')}
      isApplyDisabled={handleDatasetStore.isExportDisabled}
      onApply={handleDatasetStore.exportDataset}
      isLoading={handleDatasetStore.isExporting}
      width="xs"
    >
      <Checkbox
        id={'with-support-checkbox'}
        checked={handleDatasetStore.isSupportSelected}
        className="mb-4 text-12"
        onChange={e => handleDatasetStore.toggleSupport(e.target.checked)}
      >
        {t('home.modals.withSupport')}
      </Checkbox>

      <Checkbox
        id={'with-documentation-checkbox'}
        checked={handleDatasetStore.isDocumentationSelected}
        className="mb-4 text-12"
        onChange={e => handleDatasetStore.toggleDocumentation(e.target.checked)}
      >
        {t('home.modals.withDocumentation')}
      </Checkbox>
    </Dialog>
  )
})
