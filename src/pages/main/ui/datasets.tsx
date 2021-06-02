import { ReactElement } from 'react'
import cn from 'classnames'

import { t } from '@i18n'
import { ArrowSvg } from '@icons/arrow'
import { Button } from '@ui/button'
import { DatasetsList } from './datasets-list'
import { FilterSortDatasets } from './filter-sort-datasets'

const FoldButton = () => (
  <Button
    size="sm"
    icon={<ArrowSvg fill={'white'} />}
    className="bg-blue-dark"
  />
)

export const Datasets = (): ReactElement => {
  return (
    <div className={cn(['bg-blue-lighter', 'flex-shrink-0', 'p-4'])}>
      <div className="flex justify-between mb-3">
        <div className="font-bold text-white text-20 leading-6">
          {t('home.datasets')}
        </div>

        <FoldButton />
      </div>

      <FilterSortDatasets />

      <DatasetsList />
    </div>
  )
}
