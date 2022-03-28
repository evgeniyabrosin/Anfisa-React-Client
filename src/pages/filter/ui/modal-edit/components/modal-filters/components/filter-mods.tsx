import { ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { ModsDivider } from '@pages/filter/ui/query-builder/ui/mods-divider'
import modalFiltersStore from '../modal-filters.store'

export const FiltersMods = observer((): ReactElement => {
  return (
    <div className="flex">
      {/* Temporarily removed. Not yet implemented */}
      {/* <div className="flex items-center">
            <Checkbox checked={false} className="mr-1 cursor-pointer" />
            <div className="font-normal">{t('ds.notMode')}</div>
          </div>
          <ModsDivider /> */}
      <div className="flex items-center">
        <Checkbox checked={false} className="mr-1 cursor-pointer" />
        <div className="text-14 font-normal">{t('ds.notMode')}</div>
      </div>

      <ModsDivider />

      <div
        className="cursor-pointer text-blue-bright"
        onClick={() => modalFiltersStore.selectAllGroupItems(true)}
      >
        {t('general.selectAll')}
      </div>

      <ModsDivider />

      <div
        className="cursor-pointer text-blue-bright"
        onClick={() => modalFiltersStore.selectAllGroupItems(false)}
      >
        {t('general.clearAll')}
      </div>
    </div>
  )
})
