import { ReactElement } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { StatList } from '@declarations'
import { FilterKindEnum } from '@core/enum/filter-kind.enum'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { FilterRefinerGroupItem } from './filter-refiner-group-item'

export const FilterRefinerGroups = observer(
  (): ReactElement => {
    const keys = Object.keys(datasetStore.getFilterRefiner)

    const handleCheckGroupItem = (
      checked: boolean,
      group: string,
      name: string,
    ) => {
      if (checked) {
        const filterItem =
          datasetStore.getFilterRefiner[group] &&
          datasetStore.getFilterRefiner[group].find(item => item.name === name)

        filterStore.addSelectedFilterGroup(
          group,
          name,
          get(filterItem, 'variants', []) as [string, number][],
        )
      } else {
        filterStore.removeSelectedFiltersGroup(group, name)
      }
    }

    return (
      <div
        className="mt-4 w-1/3 overflow-y-scroll"
        style={{ maxHeight: 'calc(100vh - 170px)' }}
      >
        {keys.map(group => (
          <div key={group}>
            <p className="text-14 font-500 text-grey-blue pl-4">{group}</p>

            {datasetStore.getFilterRefiner[group].map((item: StatList) => (
              <FilterRefinerGroupItem
                onChange={checked =>
                  handleCheckGroupItem(checked, group, item.name)
                }
                {...item}
                key={item.name}
                isFunc={item.kind === FilterKindEnum.func}
                amount={
                  item.variants
                    ? item.variants.reduce((prev, cur) => prev + cur[1], 0)
                    : 0
                }
                group={group}
              />
            ))}
          </div>
        ))}
      </div>
    )
  },
)
