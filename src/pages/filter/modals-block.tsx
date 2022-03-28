import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import dtreeStore from '@store/dtree'
import { ModalNumbers } from '@pages/filter/ui/modal-edit/components/modal-numbers'
import dtreeModalStore from './modals.store'
import { ModalConfiramtion } from './ui/modal-confirmation'
import { ModalCompoundHet } from './ui/modal-edit/components/modal-compound-het/modal-compound-het'
import { ModalCompoundRequest } from './ui/modal-edit/components/modal-compound-request/modal-compound-request'
import { ModalCustomInheritanceMode } from './ui/modal-edit/components/modal-custom-inheritance-mode/modal-custom-inheritance-mode'
import { ModalFilters } from './ui/modal-edit/components/modal-filters/modal-filters'
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

      {dtreeModalStore.isModalFiltersVisible && <ModalFilters />}

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
    </Fragment>
  ),
)
