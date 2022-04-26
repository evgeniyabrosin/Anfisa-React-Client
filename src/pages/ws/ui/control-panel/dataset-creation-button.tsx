import { Fragment } from 'react'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { DecisionTreesMenuDataCy } from '@components/data-testid/decision-tree-menu.cy'
import { GlbPagesNames } from '@glb/glb-names'
import { ControlPanelDivider } from './control-panel-divider'

export const DatasetCreationButton = () => {
  const handleClick = () => {
    dtreeStore.openModalSaveDataset()
  }

  return (
    <Fragment>
      <ControlPanelDivider />

      <div className="self-stretch flex flex-col justify-center items-center">
        {/*TODO: remove after filter's pages control panels are redesigned*/}

        {filterStore.method !== GlbPagesNames.Table && (
          <div className="text-grey-blue text-14 font-bold mb-2 whitespace-nowrap">
            {t('dsCreation.createDeriveDS')}
          </div>
        )}

        <Button
          text={t('dsCreation.createDeriveDS')}
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
