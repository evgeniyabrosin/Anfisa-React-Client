import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { ExportModal } from '@pages/main/components/modals/export-modal'
import { ImportModal } from '@pages/main/components/modals/import-modal'
import handleDatasetStore from '../../../../main/components/handle-dataset/handle-dataset.store'
import { ViewVariantsModal } from '../../../common/view-variants'
import { ModalCompoundHet } from './components/modal-compound-het/modal-compound-het'
import { ModalCompoundRequest } from './components/modal-compound-request/modal-compound-request'
import { ModalCustomInheritanceMode } from './components/modal-custom-inheritance-mode/modal-custom-inheritance-mode'
import { ModalEnum } from './components/modal-enum/modal-enum'
import { ModalGeneRegion } from './components/modal-gene-region/modal-gene-region'
import { ModalInheritanceMode } from './components/modal-inheritance-mode/modal-inheritance-mode'
import { ModalNumeric } from './components/modal-numeric'
import { ModalSaveDataset } from './components/modal-save-dataset'
import { ModalSelectAttribute } from './components/modal-select-attribute'
import { ModalTextEditor } from './components/modal-text-editor'
import modalsVisibilityStore from './modals-visibility-store'

export const ModalsContainer = observer(
  (): ReactElement => (
    <Fragment>
      {modalsVisibilityStore.isModalAttributeVisible && (
        <ModalSelectAttribute />
      )}

      {modalsVisibilityStore.isModalEnumVisible && <ModalEnum />}

      {modalsVisibilityStore.isModalNumericVisible && <ModalNumeric />}

      {modalsVisibilityStore.isModalInheritanceModeVisible && (
        <ModalInheritanceMode />
      )}

      {modalsVisibilityStore.isModalCustomInheritanceModeVisible && (
        <ModalCustomInheritanceMode />
      )}

      {modalsVisibilityStore.isModalCompoundHetVisible && <ModalCompoundHet />}

      {modalsVisibilityStore.isModalCompoundRequestVisible && (
        <ModalCompoundRequest />
      )}

      {modalsVisibilityStore.isModalGeneRegionVisible && <ModalGeneRegion />}

      {modalsVisibilityStore.isModalTextEditorVisible && <ModalTextEditor />}
      {dtreeStore.isModalSaveDatasetVisible && <ModalSaveDataset />}

      {handleDatasetStore.isExportModalShown}
      {handleDatasetStore.isExportModalShown && <ExportModal />}
      {handleDatasetStore.isImportModalShown && <ImportModal />}
      <ViewVariantsModal
        query={dtreeStore.variantsModalQuery}
        isOpen={dtreeStore.isModalViewVariantsVisible}
        onClose={dtreeStore.closeModalViewVariants}
      />
    </Fragment>
  ),
)
