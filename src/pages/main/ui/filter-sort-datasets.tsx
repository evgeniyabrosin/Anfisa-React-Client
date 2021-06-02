import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { SortDatasets } from '@core/enum/sort-datasets.enum'
import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import { InputSearch } from '@ui/input-search'
import { SortItem } from './sort-item'

export const FilterSortDatasets = observer(
  (): ReactElement => (
    <div className="border-b border-blue-secondary">
      {/* TODO tailwind refactor */}
      <InputSearch
        placeholder={t('home.searchForADataset')}
        value={dirinfoStore.filterValue}
        className="mb-4"
        onChange={e => {
          dirinfoStore.setFilterValue(e.target.value)
        }}
      />

      <div className="flex justify-between my-2">
        <SortItem text={t('home.name')} sortType={SortDatasets.Name} />

        <SortItem
          text={t('home.createdAt')}
          sortType={SortDatasets.CreatedAt}
        />
      </div>
    </div>
  ),
)
