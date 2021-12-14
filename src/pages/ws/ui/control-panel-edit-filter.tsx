import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import { Button } from '@ui/button'
import { Switch } from '@ui/switch'
import { ControlPanelTitle } from './control-panel-title'
export const EditFilter = observer(
  (): ReactElement => {
    const handleClick = () => {
      datasetStore.showModalRefiner()
    }

    const switchHandler = (checked: boolean) => {
      datasetStore.setIsFilterDisabled(!checked)
      datasetStore.fetchWsListAsync(datasetStore.isXL)
    }

    return (
      <div style={{ minWidth: '144px' }}>
        <ControlPanelTitle title={t('ds.filters')}>
          <Switch
            isChecked={!datasetStore.isFilterDisabled}
            size="sm"
            onChange={switchHandler}
          />
        </ControlPanelTitle>

        <Button
          text={t('ds.editFilters')}
          size="md"
          className="w-full"
          onClick={handleClick}
        />
      </div>
    )
  },
)
