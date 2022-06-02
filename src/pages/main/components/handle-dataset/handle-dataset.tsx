import { observer } from 'mobx-react-lite'

import { PopperButton } from '@components/popper-button'
import { HandleDatasetButton } from '@pages/main/components/handle-dataset/handle-dataset-button'
import { ExportDialog } from '../dialogs/export-dialog'
import { HandleDatasetModal } from '../dialogs/handle-dataset-modal'
import { ImportDialog } from '../dialogs/import-dialog'

export const HandleDataset = observer(() => {
  return (
    <div className="ml-4 flex">
      <PopperButton
        ModalElement={HandleDatasetModal}
        ButtonElement={HandleDatasetButton}
      />
      <ImportDialog />

      <ExportDialog />
    </div>
  )
})
