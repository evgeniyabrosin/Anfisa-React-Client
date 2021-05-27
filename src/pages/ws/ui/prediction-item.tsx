import { Fragment, ReactElement } from 'react'
import styled from 'styled-components'

import { getVariantColor } from '@core/get-variant-color'
import { Box } from '@ui/box'
import { CircleSvg } from '@icons/circle'
import { Text } from '@ui/text'

interface Props {
  name: string
  value?: string[]
}

const Root = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`

const StyledName = styled(Text)`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  color: #767272;

  margin: 0px 5px 0px 0px;
`

const StyledValue = styled(Text)`
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  color: #000000;
  margin: 0px;
`

export const PredictionItem = ({ name, value }: Props): ReactElement => {
  if (!value || value?.length === 0) {
    return <Fragment />
  }

  return (
    <Root>
      <CircleSvg
        fill={getVariantColor(value[0][1])}
        style={{ alignSelf: 'center', marginRight: 3 }}
      />
      <StyledName>{`${name}:`}</StyledName>
      <StyledValue>{value[0][0]}</StyledValue>
    </Root>
  )
}
