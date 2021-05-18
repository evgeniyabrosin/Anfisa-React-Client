import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '../../ui/box'
import { FilterRefinerGroups } from './filter-refiner-groups'
import { QuerySelected } from './query-selected'
import { SelectedGroup } from './selected-group'

const Root = styled(Box)`
  display: flex;
  padding: 24px 16px;
`

export const FilterRefiner = (): ReactElement => {
  return (
    <Root>
      <FilterRefinerGroups />

      <SelectedGroup />
      <QuerySelected />
    </Root>
  )
}
