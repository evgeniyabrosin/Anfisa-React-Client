import { ReactElement } from 'react'
import styled from 'styled-components'

import { SelectedFiltersType } from '@store/filter'
import { Box } from '../../ui/box'
import { FilterItem } from './filter-item'

interface Props {
  filters: SelectedFiltersType
}

const Root = styled(Box)`
  display: flex;
`

export const FilterList = ({ filters }: Props): ReactElement => {
  const groups = Object.keys(filters)

  return (
    <Root>
      {groups.slice(0, 2).map(group => (
        <FilterItem key={group} group={group} variants={filters[group]} />
      ))}
    </Root>
  )
}
