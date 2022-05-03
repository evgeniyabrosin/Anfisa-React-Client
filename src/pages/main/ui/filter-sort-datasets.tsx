import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { SortDatasets } from '@core/enum/sort-datasets.enum'
import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import { FilterDatasetDataCy } from '@components/data-testid/filter-dataset.cy'
import { InputSearch } from '@components/input-search/input-search'
import { SortItem } from './sort-item'

export const FilterSortDatasets = observer(
  (): ReactElement => (
    <div className="mb-2 px-4">
      <div className="border-b border-blue-secondary">
        <InputSearch
          data-testid={FilterDatasetDataCy.searchInput}
          placeholder={t('home.searchForADataset')}
          value={dirinfoStore.filterValue}
          className="mb-2.5"
          big
          onChange={e => {
            dirinfoStore.setFilterValue(e.target.value)
          }}
        />

        <div className="flex justify-between mt-2.5 mb-1.5">
          <SortItem text={t('home.name')} sortType={SortDatasets.Name} />

          <SortItem
            text={t('home.createdAt')}
            sortType={SortDatasets.CreatedAt}
          />
        </div>
      </div>
    </div>
  ),
)
