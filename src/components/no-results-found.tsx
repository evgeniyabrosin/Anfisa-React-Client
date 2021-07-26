import { ReactElement } from 'react'

import { t } from '@i18n'

export const NoResultsFound = (): ReactElement => (
  <div className="flex justify-center items-center h-full text-grey-blue">
    {t('general.noResultsFound')}
  </div>
)
