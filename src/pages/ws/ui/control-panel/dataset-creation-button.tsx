import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { DecisionTreesMenuDataCy } from '@components/data-testid/decision-tree-menu.cy'

export const DatasetCreationButton = observer(
  (): ReactElement => (
    <Button
      text={t('dsCreation.createDeriveDS')}
      onClick={dtreeStore.openModalSaveDataset}
      dataTestId={DecisionTreesMenuDataCy.saveDataset}
    />
  ),
)
