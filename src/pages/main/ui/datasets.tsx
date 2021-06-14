import React, { ReactElement } from 'react'
import cn from 'classnames'

import { useToggle } from '@core/hooks/use-toggle'
import { t } from '@i18n'
import { ArrowSvg } from '@icons/arrow'
import { Button } from '@ui/button'
import { DatasetsList } from './datasets-list'
import { FilterSortDatasets } from './filter-sort-datasets'

export const Datasets = (): ReactElement => {
  const [isOpen, open, close] = useToggle(true)

  return (
    <div
      className={cn([
        'bg-blue-lighter',
        'flex-shrink-0',
        'py-4',
        isOpen ? 'px-4' : 'px-2',
      ])}
    >
      <div className="flex justify-between mb-3">
        {isOpen && (
          <div className="font-bold text-white text-20 leading-6">
            {t('home.datasets')}
          </div>
        )}

        <Button
          size="sm"
          icon={<ArrowSvg />}
          className={cn('bg-blue-dark transform', { 'rotate-180': !isOpen })}
          onClick={isOpen ? close : open}
        />
      </div>

      {isOpen && (
        <React.Fragment>
          <FilterSortDatasets />

          <DatasetsList />
        </React.Fragment>
      )}
    </div>
  )
}
