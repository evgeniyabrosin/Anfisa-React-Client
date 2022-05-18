import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { GlbPagesNames } from '@glb/glb-names'

export const EditFilter = observer((): ReactElement => {
  const histroy = useHistory()
  const params = useParams()

  const handleClick = () => {
    histroy.push(`${Routes.Refiner}?ds=${params.get('ds')}`)
    filterStore.setMethod(GlbPagesNames.Refiner)
  }

  return (
    <div style={{ minWidth: '114px' }}>
      <Button
        text={t('ds.editFilters')}
        size="md"
        className="w-full justify-around text-14 min-h-32"
        onClick={handleClick}
      />
    </div>
  )
})
