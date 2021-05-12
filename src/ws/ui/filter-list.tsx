import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '../../ui/box'
import { FilterItem } from './filter-item'

const Root = styled(Box)`
  display: flex;
`

export const FilterList = (): ReactElement => {
  return (
    <Root>
      <FilterItem />
      <FilterItem />
    </Root>
  )
}
