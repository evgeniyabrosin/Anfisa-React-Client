import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { ModalNumbers } from '@pages/filter/ui/modal-edit/components/modal-numbers'
import { ExportModal } from '@pages/main/components/modals/export-modal'
import { ImportModal } from '@pages/main/components/modals/import-modal'
import handleDatasetStore from '../main/components/handle-dataset.store'
import dtreeModalStore from './modals.store'
import { ModalConfiramtion } from './ui/modal-confirmation'
import { ModalCompoundHet } from './ui/modal-edit/components/modal-compound-het/modal-compound-het'
import { ModalCompoundRequest } from './ui/modal-edit/components/modal-compound-request/modal-compound-request'
import { ModalCustomInheritanceMode } from './ui/modal-edit/components/modal-custom-inheritance-mode/modal-custom-inheritance-mode'
import { ModalEnum } from './ui/modal-edit/components/modal-enum/modal-enum'
import { ModalGeneRegion } from './ui/modal-edit/components/modal-gene-region/modal-gene-region'
import { ModalInheritanceMode } from './ui/modal-edit/components/modal-inheritance-mode/modal-inheritance-mode'
import { ModalTextEditor } from './ui/query-builder/modal-text-editor'
import { ModalSaveDataset } from './ui/query-builder/ui/modal-save-dataset'
import { ModalSelectAttribute } from './ui/query-builder/ui/modal-select-attribute'
import { TableModal } from './ui/TableModal'

export const ModalsBlock = observer(
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
