import { ReactElement } from 'react'

import { t } from '@i18n'

export const NoResultsFound = (): ReactElement => {
  return (
    <div className="flex justify-center items-center">
      {t('general.noResultsFound')}
    </div>
  )
}
