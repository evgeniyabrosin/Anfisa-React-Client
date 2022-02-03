import { Fragment } from 'react'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { DecisionTreesMenuDataCy } from '@components/data-testid/decision-tree-menu.cy'
import { ControlPanelDivider } from './control-panel-divider'

export const DatasetCreationButton = () => {
  const handleClick = () => {
    dtreeStore.openModalSaveDataset()
  }

  return (
    <Fragment>
      <ControlPanelDivider />

      <div className="self-stretch">
        <div className="text-grey-blue text-14 font-bold mb-2 whitespace-nowrap">
          {t('dsCreation.datasetCreation')}
        </div>

        <Button
          text={t('dsCreation.saveDataset')}
          size="md"
          variant="secondary-dark"
          className="w-full"
          onClick={handleClick}
          dataTestId={DecisionTreesMenuDataCy.saveDataset}
        />
      </div>
    </Fragment>
  )
}
