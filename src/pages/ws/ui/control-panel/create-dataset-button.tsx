import { ReactElement } from 'react'

import { useModal } from '@core/hooks/use-modal'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { DecisionTreesMenuDataCy } from '@components/data-testid/decision-tree-menu.cy'
import { CreateDatasetDialog } from '@pages/filter/dtree/components/modals/components/create-dataset-dialog'

export const CreateDatasetButton = (): ReactElement => {
  const [creationDialog, openCreationDialog, closeCreationDialog] = useModal()
  const { isOpen } = creationDialog

  return (
    <>
      <Button
        text={t('dsCreation.createDerivedDS')}
        onClick={openCreationDialog}
        dataTestId={DecisionTreesMenuDataCy.saveDataset}
      />

      <CreateDatasetDialog onClose={closeCreationDialog} isOpen={isOpen} />
    </>
  )
}
