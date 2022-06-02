import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { ExportDialog } from '@pages/main/components/dialogs/export-dialog'
import { ImportDialog } from '@pages/main/components/dialogs/import-dialog'
import { EnumDialog } from './components/enum-dialog/enum-dialog'
import { ModalCompoundHet } from './components/modal-compound-het/modal-compound-het'
import { ModalCompoundRequest } from './components/modal-compound-request/modal-compound-request'
import { ModalCustomInheritanceMode } from './components/modal-custom-inheritance-mode/modal-custom-inheritance-mode'
import { ModalGeneRegion } from './components/modal-gene-region/modal-gene-region'
import { ModalInheritanceMode } from './components/modal-inheritance-mode/modal-inheritance-mode'
import { ModalSelectAttribute } from './components/modal-select-attribute'
import { ModalViewVariants } from './components/modal-view-variants'
import { NumericDialog } from './components/numeric-dialog'
import modalsVisibilityStore from './modals-visibility-store'

export const ModalsContainer = observer(
  (): ReactElement => (
    <>
      {modalsVisibilityStore.isModalAttributeVisible && (
        <ModalSelectAttribute />
      )}

      <EnumDialog />

      <NumericDialog />

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

      {modalsVisibilityStore.isModalViewVariantsVisible && (
        <ModalViewVariants />
      )}

      <ExportDialog />

      <ImportDialog />
    </>
  ),
)
