import get from 'lodash/get'
import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '@ui/box'
import { Tag } from '@ui/tag'
import { CellI } from './variant-cell'

const Root = styled(Box)`
  padding-right: 56px;
  max-width: 120px;
  display: flex;
  flex-wrap: wrap;
`

export const TagsCell = ({ cell }: CellI): ReactElement => {
  const tags = Object.keys(get(cell, 'value', {}) || {}) || []

  if (tags.length === 0) {
    return <Root>-</Root>
  }

  return (
    <Root>
      {tags.map(tag => (
        <Tag key={tag} text={tag} />
      ))}
    </Root>
  )
}
