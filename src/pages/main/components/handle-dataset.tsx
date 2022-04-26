import { observer } from 'mobx-react-lite'

import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { PopperButton } from '@components/popper-button'
import handleDatasetStore from './handle-dataset.store'
import { ExportModal } from './modals/export-modal'
import { HandleDatasetModal } from './modals/handle-dataset-modal'
import { ImportModal } from './modals/import-modal'

const HandleDatasetButton = ({ refEl, onClick }: any) => {
  return (
    <Button
      refEl={refEl}
      onClick={onClick}
      className="rounded"
      prepend={<Icon name="Ellipsis" />}
      style={{
        width: '36px',
        height: '28px',
        justifyContent: 'center',
      }}
    />
  )
}

export const HandleDataset = observer(() => {
  return (
    <div className="absolute" style={{ bottom: 90 }}>
      <PopperButton
        ModalElement={HandleDatasetModal}
        ButtonElement={HandleDatasetButton}
      />
      {handleDatasetStore.isImportModalShown && <ImportModal />}
      {handleDatasetStore.isExportModalShown && <ExportModal />}
    </div>
  )
})
