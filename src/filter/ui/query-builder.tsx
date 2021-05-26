import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '@ui/box'
import { QueryEditor } from './query-editor'
import { QuerySelected } from './query-selected'

const Root = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 24px;
`

export const QueryBuilder = (): ReactElement => {
  return (
    <Root>
      <QueryEditor />

      <QuerySelected />
    </Root>
  )
}
