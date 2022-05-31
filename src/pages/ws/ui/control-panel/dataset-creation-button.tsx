import { ReactElement } from 'react'

import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { DecisionTreesMenuDataCy } from '@components/data-testid/decision-tree-menu.cy'
import { ModalCreateDataset } from '@pages/filter/dtree/components/modals/components/modal-create-dataset'

export const DatasetCreationButton = (): ReactElement => {
  const [creationDialog, openCreationDialog, closeCreationDialog] = useModal()
  const { isOpen } = creationDialog

  return (
    <>
      <Button
        text={t('dsCreation.createDeriveDS')}
        onClick={openCreationDialog}
        dataTestId={DecisionTreesMenuDataCy.saveDataset}
      />

      {isOpen && (
        <ModalCreateDataset closeModal={closeCreationDialog} isOpen={isOpen} />
      )}
    </>
  )
}
