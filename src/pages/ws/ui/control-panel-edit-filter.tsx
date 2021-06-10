import { ReactElement } from 'react'
import { useHistory } from 'react-router'

import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Switch } from '@ui/switch'
import { ControlPanelTitle } from './control-panel-title'

export const EditFilter = (): ReactElement => {
  const histroy = useHistory()
  const params = useParams()

  const handleClick = () => {
    histroy.push(`${Routes.Filter}?ds=${params.get('ds')}`)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const switchHandler = () => {}

  return (
    <div style={{ minWidth: '144px' }}>
      <ControlPanelTitle title={t('ds.filters')}>
        <Switch isChecked size="sm" onChange={switchHandler} disabled />
      </ControlPanelTitle>

      <Button
        text={t('ds.editFilters')}
        size="md"
        className="w-full"
        onClick={handleClick}
      />
    </div>
  )
}
