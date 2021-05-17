import { ReactElement } from 'react'
import styled from 'styled-components'

import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import { QualityI } from './quality-cell'

type Props = QualityI & {
  iconVariant: 'fill-circle' | 'outline-circle' | 'fill-rect' | 'outline-rect'
}

const Root = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

const StyledText = styled(Text)`
  font-family: 'Roboto', sans-serif;
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
  max-width: 210px;
`

export const QualityItem = ({
  genotype,
  g_quality,
  iconVariant,
}: Props): ReactElement => {
  return (
    <Root>
      <Box>{iconVariant}</Box>
      <StyledText>{genotype}</StyledText>
      <StyledText>{g_quality}</StyledText>
    </Root>
  )
}
