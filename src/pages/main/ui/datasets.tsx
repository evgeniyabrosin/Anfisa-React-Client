import React, { ReactElement } from 'react'
import cn from 'classnames'

import { useToggle } from '@core/hooks/use-toggle'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
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
        isOpen ? 'pl-4' : 'pl-2',
      ])}
      style={{
        width: isOpen ? '320px' : 'auto',
      }}
    >
      <div
        className={cn('flex justify-between mb-3', isOpen ? 'pr-4' : 'pr-2')}
      >
        {isOpen && (
          <div className="font-bold text-white text-20 leading-6">
            {t('home.datasets')}
          </div>
        )}

        <Button
          size="sm"
          icon={<Icon name="Arrow" />}
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
