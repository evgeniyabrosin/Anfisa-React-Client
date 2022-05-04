import React, { ReactElement } from 'react'
import cn from 'classnames'

import { useToggle } from '@core/hooks/use-toggle'
import { t } from '@i18n'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { FilterDatasetDataCy } from '@components/data-testid/filter-dataset.cy'
import { DatasetsList } from './datasets-list/datasets-list'
import { DocLinks } from './doc-links'
import { FilterSortDatasets } from './filter-sort-datasets'
import { HandleDataset } from './handle-dataset/handle-dataset'

export const Datasets = (): ReactElement => {
  const [isOpen, open, close] = useToggle(true)

  return (
    <div
      className={cn(
        'bg-blue-lighter flex flex-col flex-shrink-0 pt-[18px] h-full overflow-auto',
        {
          'w-[372px]': isOpen,
          'w-auto': !isOpen,
        },
      )}
    >
      <div
        className={cn('flex justify-between mb-3', isOpen ? 'px-4' : 'px-2')}
      >
        {isOpen && (
          <div
            data-testid={FilterDatasetDataCy.leftPanelHeader}
            className="font-bold text-white text-20 leading-6"
          >
            {t('home.datasets')}
          </div>
        )}
        <Button
          dataTestId={FilterDatasetDataCy.leftPanelArrowButton}
          size="md"
          icon={<Icon name="Arrow" />}
          className={cn('bg-blue-bright transform rounded-md', {
            'rotate-180': !isOpen,
          })}
          onClick={isOpen ? close : open}
        />
      </div>
      {isOpen && (
        <>
          <FilterSortDatasets />

          <DatasetsList />

          <div className="flex flex-col flex-1 w-full justify-end">
            <HandleDataset />

            <DocLinks />
          </div>
        </>
      )}
    </div>
  )
}
