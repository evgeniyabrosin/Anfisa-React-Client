import { ReactElement } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { StatList } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import { useFilterQueryBuilder } from '@core/hooks/use-filter-query-builder'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { InputSearch } from '@components/input-search'
import { FilterRefinerGroupItem } from './filter-refiner-group-item'

export const FilterRefinerGroups = observer(
  (): ReactElement => {
    const {
      filterValue,
      setFilterValue,
      filteredQueryBuilder,
    } = useFilterQueryBuilder()

    const keys = Object.keys(filteredQueryBuilder)

    const values = Object.values(filteredQueryBuilder)

    const handleCheckGroupItem = (
      checked: boolean,
      group: string,
      name: string,
    ) => {
      if (checked) {
        const filterItem =
          filteredQueryBuilder[group] &&
          filteredQueryBuilder[group].find(item => item.name === name)

        const filterItemVariants = get(filterItem, 'variants', []) as [
          string,
          number,
        ][]

        filterStore.addSelectedFilterGroup(group, name, filterItemVariants)

        datasetStore.setConditionsAsync([
          [
            FilterKindEnum.Enum,
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

    return (
      <div className="pt-4 w-1/3 ">
        <InputSearch
          placeholder={t('filter.searchForAField')}
          value={filterValue}
          filter
          onChange={event => {
            setFilterValue(event.target.value)
          }}
        />

        <div
          className="overflow-y-scroll border-gre"
          style={{ maxHeight: 'calc(100vh - 250px)' }}
        >
          <div id="input" className="mx-4 mb-3" />

          {keys.map((group, index) => (
            <div key={group}>
              <p className="text-14 font-500 text-grey-blue pl-4">{group}</p>

              {values[index].map((item: StatList) => {
                const incomplete = item?.incomplete ?? false

                return (
                  <FilterRefinerGroupItem
                    className="pl-4"
                    onChange={checked =>
                      handleCheckGroupItem(checked, group, item.name)
                    }
                    {...item}
                    key={item.name}
                    isFunc={item.kind === FilterKindEnum.Func}
                    isNumeric={item.kind === FilterKindEnum.Numeric}
                    group={group}
                    incomplete={incomplete}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  },
)
