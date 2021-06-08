import { ReactElement } from 'react'
import styled from 'styled-components'

import { t } from '@i18n'
import { GridSvg } from '@icons/grid'
import { RowsSvg } from '@icons/rows'
import { Box } from '@ui/box'
import { Text } from '@ui/text'
import { TableVisualizationItem } from './table-visualization-item'

const StyledText = styled(Text)`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 12px;
  color: #0c65fd;
  margin-top: 16px;
  margin-bottom: 16px;
`

const ConteinerList = styled(Box)`
  display: flex;
  align-items: center;
`

export const TableVisualization = (): ReactElement => (
  <Box>
    <StyledText>{t('ds.tableVisualization')}</StyledText>

    <ConteinerList>
      <TableVisualizationItem
        isChecked={false}
        text={t('ds.grid')}
        Icon={GridSvg}
      />
      <TableVisualizationItem isChecked text={t('ds.rows')} Icon={RowsSvg} />
    </ConteinerList>
  </Box>
)
