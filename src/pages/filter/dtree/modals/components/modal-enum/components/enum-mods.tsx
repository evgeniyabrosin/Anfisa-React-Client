import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import modalEnumStore from '../modal-enum.store'

export const EnumMods = observer((): ReactElement => {
  return (
    <div className="flex">
      <div
        className="cursor-pointer text-blue-bright"
        onClick={() => modalEnumStore.selectAllGroupItems(true)}
      >
        {t('general.selectAll')}
      </div>

      <div
        className="cursor-pointer text-blue-bright ml-3"
        onClick={() => modalEnumStore.selectAllGroupItems(false)}
      >
        {t('general.clearAll')}
      </div>
    </div>
  )
})
