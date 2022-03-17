import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { ModalNumbers } from '@pages/filter/ui/modal-edit/components/modal-numbers'
import dtreeModalStore from './modals.store'
import { ModalConfiramtion } from './ui/modal-confirmation'
import { ModalEditCompoundHet } from './ui/modal-edit/components/modal-edit-compound-het'
import { ModalEditCompoundRequest } from './ui/modal-edit/components/modal-edit-compound-request'
import { ModalEditCustomInheritanceMode } from './ui/modal-edit/components/modal-edit-custom-inheritance-mode'
import { ModalEditFilters } from './ui/modal-edit/components/modal-edit-filters'
import { ModalEditGeneRegion } from './ui/modal-edit/components/modal-edit-gene-region'
import { ModalEditInheritanceMode } from './ui/modal-edit/components/modal-edit-inheritance-mode'
import { ModalTextEditor } from './ui/query-builder/modal-text-editor'
import { ModalSaveDataset } from './ui/query-builder/ui/modal-save-dataset'
import { ModalSelectAttribute } from './ui/query-builder/ui/modal-select-attribute'
import { ModalSelectCompoundHet } from './ui/query-builder/ui/modal-select-compound-het'
import { ModalSelectCompoundRequest } from './ui/query-builder/ui/modal-select-compound-request'
import { ModalSelectCustomInheritanceMode } from './ui/query-builder/ui/modal-select-custom-inheritance-mode'
import { ModalSelectFilters } from './ui/query-builder/ui/modal-select-filters'
import { ModalSelectGeneRegion } from './ui/query-builder/ui/modal-select-gene-region'
import { ModalSelectInheritanceMode } from './ui/query-builder/ui/modal-select-inheritance-mode'
import { TableModal } from './ui/TableModal'

export const ModalsBlock = observer(
  (): ReactElement => (
    <Fragment>
      {dtreeModalStore.isModalAttributeVisible && <ModalSelectAttribute />}

      {dtreeModalStore.isModalEditFiltersVisible && <ModalEditFilters />}
      {dtreeModalStore.isModalSelectFilterVisible && <ModalSelectFilters />}

      {dtreeModalStore.isModalNumbersVisible && <ModalNumbers />}

      {dtreeModalStore.isModalEditInheritanceModeVisible && (
        <ModalEditInheritanceMode />
      )}
      {dtreeModalStore.isModalSelectInheritanceModeVisible && (
        <ModalSelectInheritanceMode />
      )}

      {dtreeModalStore.isModalEditCustomInheritanceModeVisible && (
        <ModalEditCustomInheritanceMode />
      )}
      {dtreeModalStore.isModalSelectCustomInheritanceModeVisible && (
        <ModalSelectCustomInheritanceMode />
      )}

      {dtreeModalStore.isModalEditCompoundHetVisible && (
        <ModalEditCompoundHet />
      )}
      {dtreeModalStore.isModalSelectCompoundHetVisible && (
        <ModalSelectCompoundHet />
      )}

      {dtreeModalStore.isModalEditCompoundRequestVisible && (
        <ModalEditCompoundRequest />
      )}
      {dtreeModalStore.isModalSelectCompoundRequestVisible && (
        <ModalSelectCompoundRequest />
      )}

      {dtreeModalStore.isModalEditGeneRegionVisible && <ModalEditGeneRegion />}
      {dtreeModalStore.isModalSelectGeneRegionVisible && (
        <ModalSelectGeneRegion />
      )}

      {dtreeStore.isTableModalVisible && <TableModal />}
      {dtreeModalStore.isModalTextEditorVisible && <ModalTextEditor />}
      {dtreeStore.isModalSaveDatasetVisible && <ModalSaveDataset />}
      {dtreeModalStore.isModalConfirmationVisible && <ModalConfiramtion />}
    </Fragment>
  ),
)
