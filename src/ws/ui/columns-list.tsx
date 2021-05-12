import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '../../ui/box'
import { ColumnNameItem } from './column-name-item'

const columns = ['text1', 'text2', 'text3', 'text4']

const Root = styled(Box)`
  border-bottom: 1px solid #bfbfbf;
  margin-top: 12px;
  padding-bottom: 19px;
`

export const ColumnsList = (): ReactElement => (
  <Root>
    {columns.map(item => (
      <ColumnNameItem name={item} key={item} />
    ))}
  </Root>
)
