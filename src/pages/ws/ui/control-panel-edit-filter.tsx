import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Switch } from '@ui/switch'
import { ControlPanelTitle } from './control-panel-title'

export const EditFilter = observer(
  (): ReactElement => {
    const histroy = useHistory()
    const params = useParams()

    const handleClick = () => {
      histroy.push(`${Routes.Filter}?ds=${params.get('ds')}`)
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
