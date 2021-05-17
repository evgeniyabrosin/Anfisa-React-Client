import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '../ui/box'
import { FilterHeader } from './filter-header'

const Root = styled(Box)``

export const FilterPage = (): ReactElement => {
  return (
    <Root>
      <FilterHeader />
    </Root>
  )
}
