import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'

import { t } from '@i18n'
import dsStore from '@store/dataset'
import { Box } from '@ui/box'
import { Input } from '@ui/input'
import { Text } from '@ui/text'
import { ColumnsList } from './columns-list'
import { TableVisualization } from './table-visualization'

const Root = styled(Box)`
  background-color: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 12px;
  width: 286px;
`

const StyledText = styled(Text)`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 12px;
  color: #0c65fd;
  margin-top: 0px;
  margin-bottom: 16px;
`

export const SettingsPanel = observer(
  (): ReactElement => (
    <Root>
      <StyledText>{t('ds.columns')}</StyledText>

      <Input
        placeholder={t('ds.searchColumns')}
        value={dsStore.searchColumnValue}
        onChange={e => {
          dsStore.setSearchColumnValue(e.target.value)
        }}
      />

      <ColumnsList />

      <TableVisualization />
    </Root>
  ),
)
