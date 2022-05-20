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
    <>
      <ControlPanelDivider />

      <div className="self-stretch flex flex-col justify-center items-center">
        <Button
          text={t('dsCreation.createDeriveDS')}
          size="sm"
          variant="secondary-dark"
          className="w-full"
          onClick={handleClick}
          dataTestId={DecisionTreesMenuDataCy.saveDataset}
        />
      </div>
    </>
  )
}
