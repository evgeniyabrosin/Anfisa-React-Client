import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '@ui/box'
import { Text } from '@ui/text'
import { QualityI } from './quality-cell'
import { QualityIcon } from './quality-icon'

type Props = QualityI & {
  iconVariant: 'fill-circle' | 'outline-circle' | 'fill-rect' | 'outline-rect'
}

const Root = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const StyledText = styled(Text)`
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  color: #000000;
  margin: 0;
  margin-right: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 280px;
  margin-left: 10px;
`

export const QualityItem = ({
  genotype,
  g_quality,
  iconVariant,
}: Props): ReactElement => (
  <Root>
    <Box>
      <QualityIcon iconVariant={iconVariant} />
      <StyledText>{genotype}</StyledText>
    </Box>
    <StyledText>{g_quality}</StyledText>
  </Root>
)
