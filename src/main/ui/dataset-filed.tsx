import { CSSProperties, Fragment, ReactElement } from 'react'
import styled from 'styled-components'

import { theme } from '../../theme'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'

interface Props {
  label: string
  value: string
  style?: CSSProperties
}

const Root = styled(Box)`
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  width: 175px;
`

const LabelField = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: ${theme('colors.black')};
  margin: 0px;
`

const ValueField = styled(Text)`
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  color: ${theme('colors.black')};
  margin: 0px;
  margin-top: 12px;
`

export const DatasetField = ({ label, value, style }: Props): ReactElement => {
  if (!value) {
    return <Fragment />
  }

  return (
    <Root style={style}>
      <LabelField>{label}</LabelField>
      <ValueField>{value}</ValueField>
    </Root>
  )
}
