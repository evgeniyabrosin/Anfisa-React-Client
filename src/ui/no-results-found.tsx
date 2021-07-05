import { ReactElement } from 'react'

import { t } from '@i18n'

export const NoResultsFound = (): ReactElement => {
  return (
    <div className="flex justify-center items-center h-full">
      {t('general.noResultsFound')}
    </div>
  )
}
