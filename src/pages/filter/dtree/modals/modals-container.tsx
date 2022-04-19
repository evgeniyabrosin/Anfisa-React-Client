import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { ModalNumbers } from '@pages/filter/dtree/modals/components/modal-numbers'
import handleDatasetStore from '@pages/main/components/handle-dataset.store'
import { ExportModal } from '@pages/main/components/modals/export-modal'
import { ImportModal } from '@pages/main/components/modals/import-modal'
import { ModalConfiramtion } from '../ui/modal-confirmation'
import { ModalTextEditor } from '../ui/query-builder/modal-text-editor'
import { ModalSaveDataset } from '../ui/query-builder/ui/modal-save-dataset'
import { ModalSelectAttribute } from '../ui/query-builder/ui/modal-select-attribute'
import { TableModal } from '../ui/TableModal'
import { ModalCompoundHet } from './components/modal-compound-het/modal-compound-het'
import { ModalCompoundRequest } from './components/modal-compound-request/modal-compound-request'
import { ModalCustomInheritanceMode } from './components/modal-custom-inheritance-mode/modal-custom-inheritance-mode'
import { ModalEnum } from './components/modal-enum/modal-enum'
import { ModalGeneRegion } from './components/modal-gene-region/modal-gene-region'
import { ModalInheritanceMode } from './components/modal-inheritance-mode/modal-inheritance-mode'
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
