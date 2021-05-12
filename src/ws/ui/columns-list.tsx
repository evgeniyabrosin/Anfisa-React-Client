import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import styled from 'styled-components'

import datasetStore from '../../store/dataset'
import { Box } from '../../ui/box'
import { ColumnNameItem } from './column-name-item'

const Root = styled(Box)`
  border-bottom: 1px solid #bfbfbf;
  margin-top: 12px;
  padding-bottom: 19px;
`

export const ColumnsList = observer(
  (): ReactElement => (
    <Root>
      {datasetStore.getColumns.map(item => (
        <ColumnNameItem name={item} key={item} />
      ))}
    </Root>
  ),
)
