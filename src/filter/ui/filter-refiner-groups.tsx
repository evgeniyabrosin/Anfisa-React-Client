import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import styled from 'styled-components'

import { StatList } from '../../..'
import datasetStore from '../../store/dataset'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import { FilterRefinerGroupItem } from './filter-refiner-group-item'

const Root = styled(Box)`
  /* width: 100%; */
`

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

    return (
      <Root>
        {keys.map(group => (
          <Box key={group}>
            <GroupName>{group}</GroupName>

            {datasetStore.getFilterRefiner[group].map((item: StatList) => (
              <FilterRefinerGroupItem {...item} key={item.name} />
            ))}
          </Box>
        ))}
      </Root>
    )
  },
)
