import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import handleDatasetStore from '@pages/main/components/handle-dataset.store'
import { ExportModal } from '@pages/main/components/modals/export-modal'
import { ImportModal } from '@pages/main/components/modals/import-modal'
import { ModalCompoundHet } from './components/modal-compound-het/modal-compound-het'
import { ModalCompoundRequest } from './components/modal-compound-request/modal-compound-request'
import { ModalConfiramtion } from './components/modal-confirmation'
import { ModalCustomInheritanceMode } from './components/modal-custom-inheritance-mode/modal-custom-inheritance-mode'
import { ModalEnum } from './components/modal-enum/modal-enum'
import { ModalGeneRegion } from './components/modal-gene-region/modal-gene-region'
import { ModalInheritanceMode } from './components/modal-inheritance-mode/modal-inheritance-mode'
import { ModalNumbers } from './components/modal-numbers'
import { ModalSaveDataset } from './components/modal-save-dataset'
import { ModalSelectAttribute } from './components/modal-select-attribute'
import { ModalTextEditor } from './components/modal-text-editor'
import { TableModal } from './components/TableModal'
import dtreeModalStore from './modals-visibility.store'

export const ModalsContainer = observer(
  (): ReactElement => (
    <Fragment>
      {dtreeModalStore.isModalAttributeVisible && <ModalSelectAttribute />}

      {dtreeModalStore.isModalEnumVisible && <ModalEnum />}

      {dtreeModalStore.isModalNumbersVisible && <ModalNumbers />}

      {dtreeModalStore.isModalInheritanceModeVisible && (
        <ModalInheritanceMode />
      )}

      {dtreeModalStore.isModalCustomInheritanceModeVisible && (
        <ModalCustomInheritanceMode />
      )}

      {dtreeModalStore.isModalCompoundHetVisible && <ModalCompoundHet />}

      {dtreeModalStore.isModalCompoundRequestVisible && (
        <ModalCompoundRequest />
      )}

      {dtreeModalStore.isModalGeneRegionVisible && <ModalGeneRegion />}

      {dtreeStore.isTableModalVisible && <TableModal />}
      {dtreeModalStore.isModalTextEditorVisible && <ModalTextEditor />}
      {dtreeStore.isModalSaveDatasetVisible && <ModalSaveDataset />}
      {dtreeModalStore.isModalConfirmationVisible && <ModalConfiramtion />}
      {handleDatasetStore.isExportModalShown}
      {handleDatasetStore.isExportModalShown && <ExportModal />}
      {handleDatasetStore.isImportModalShown && <ImportModal />}
    </Fragment>
  ),
)
