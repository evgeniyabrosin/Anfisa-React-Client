import { ReactElement } from 'react'

import { t } from '@i18n'
import { InfoList } from './info-list'

export const DatasetGeneral = (): ReactElement => {
  return (
    <div className="text-sm">
      <div className="leading-18px font-medium text-grey-blue">
        {t('home.general')}
      </div>

      <InfoList />
    </div>
  )
}
