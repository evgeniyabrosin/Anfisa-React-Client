import { ReactElement } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { StatList } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { InputSearch } from '@components/input-search'
import { FilterRefinerGroupItem } from './filter-refiner-group-item'

export const FilterRefinerGroups = observer(
  (): ReactElement => {
    const keys = Object.keys(datasetStore.getFilterRefiner)
    const values = Object.values(datasetStore.getFilterRefiner)

    const handleCheckGroupItem = (
      checked: boolean,
      group: string,
      name: string,
    ) => {
      if (checked) {
        const filterItem =
          datasetStore.getFilterRefiner[group] &&
          datasetStore.getFilterRefiner[group].find(item => item.name === name)

        const filterItemVariants = get(filterItem, 'variants', []) as [
          string,
          number,
        ][]

        filterStore.addSelectedFilterGroup(group, name, filterItemVariants)

        datasetStore.setConditionsAsync([
          [
            FilterKindEnum.enum,
            name,
            '',
            filterItemVariants.map(item => item[0]),
          ],
        ])
      } else {
        filterStore.removeSelectedFiltersGroup(group, name)
        datasetStore.removeConditionGroup({ subGroup: name })
      }
    }

    const parent = document.querySelector('#parent')

    parent?.addEventListener('DOMSubtreeModified', () => {
      for (const item of parent.children) {
        if (item.children.length === 1 && item.id !== 'input') {
          item.className = 'hidden'
        } else if (item.id !== 'input') {
          item.className = 'block'
        }
      }
    })

    return (
      <div
        id="parent"
        className="pt-4 w-1/3 overflow-y-scroll border-gre"
        style={{ maxHeight: 'calc(100vh - 170px)' }}
      >
        <div id="input" className="mx-4 mb-3">
          <InputSearch
            placeholder={t('filter.searchForAField')}
            value={datasetStore.searchField}
            filter
            onChange={e => {
              datasetStore.addSearchField(e.target.value)
            }}
          />
        </div>

        {keys.map((group, index) => (
          <div key={group}>
            <p className="text-14 font-500 text-grey-blue pl-4">{group}</p>

            {values[index].map((item: StatList) => {
              const numericAmount =
                item.kind === FilterKindEnum.numeric
                  ? get(datasetStore, 'dsStat.total-counts.0', 0)
                  : 0

              return (
                <FilterRefinerGroupItem
                  className="pl-4"
                  onChange={checked =>
                    handleCheckGroupItem(checked, group, item.name)
                  }
                  {...item}
                  key={item.name}
                  isFunc={item.kind === FilterKindEnum.func}
                  isNumeric={item.kind === FilterKindEnum.numeric}
                  amount={
                    item.variants
                      ? item.variants.reduce((prev, cur) => prev + cur[1], 0)
                      : numericAmount
                  }
                  group={group}
                />
              )
            })}
          </div>
        ))}
      </div>
    )
  },
)
