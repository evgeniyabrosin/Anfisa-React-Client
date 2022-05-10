import { observer } from 'mobx-react-lite'

import { PopperButton } from '@components/popper-button'
import { HandleDatasetButton } from '@pages/main/components/handle-dataset/handle-dataset-button'
import { ExportModal } from '../modals/export-modal'
import { HandleDatasetModal } from '../modals/handle-dataset-modal'
import { ImportModal } from '../modals/import-modal'
import handleDatasetStore from './handle-dataset.store'

export const HandleDataset = observer(() => {
  return (
    <div className="ml-4 flex">
      <PopperButton
        ModalElement={HandleDatasetModal}
        ButtonElement={HandleDatasetButton}
      />
      {handleDatasetStore.isImportModalShown && <ImportModal />}
      {handleDatasetStore.isExportModalShown && <ExportModal />}
    </div>
  )
})
