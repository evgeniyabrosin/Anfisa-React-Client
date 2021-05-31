import { ReactElement } from 'react'

import { t } from '@i18n'
import { CardTitle } from '@ui/card'
import { DatasetsList } from './datasets-list'
import { FilterSortDatasets } from './filter-sort-datasets'

export const Datasets = (): ReactElement => {
  return (
    <div>
      <div className="mb-3">
        <CardTitle text={t('home.datasets')} />
      </div>

      <FilterSortDatasets />

      <DatasetsList />
    </div>
  )
}
