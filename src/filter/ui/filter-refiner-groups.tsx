import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import styled from 'styled-components'

import { StatList } from '../../..'
import datasetStore from '../../store/dataset'
import filterStore from '../../store/filter'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import { FilterRefinerGroupItem } from './filter-refiner-group-item'

const GroupName = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #78909c;
  margin: 0;
  margin-top: 12px;
  margin-bottom: 10px;
  padding-left: 24px;
  padding-right: 180px;
`

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
      <Box>
        {keys.map(group => (
          <Box key={group}>
            <GroupName>{group}</GroupName>

            {datasetStore.getFilterRefiner[group].map((item: StatList) => {
              const amout = item.variants
                ? item.variants.reduce((prev, cur) => prev + cur[1], 0)
                : 0

              return (
                <FilterRefinerGroupItem
                  onChange={checked =>
                    handleCheckGroupItem(checked, group, item.name)
                  }
                  {...item}
                  key={item.name}
                  amount={amout}
                  group={group}
                />
              )
            })}
          </Box>
        ))}
      </Box>
    )
  },
)
