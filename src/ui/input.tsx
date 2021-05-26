import { ChangeEvent, ReactElement } from 'react'
import styled from 'styled-components'

import { LoupeSvg } from '@icons/loupe'
import { Box } from './box'

interface Props {
  placeholder?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Root = styled(Box)`
  position: relative;
`

const StyledInput = styled('input')`
  background: #ffffff;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 5px 8px;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  width: 100%;
  line-height: 22px;
  height: 32px;
`

export const Input = ({ ...rest }: Props): ReactElement => {
  return (
    <Root>
      <StyledInput {...rest} />

      <LoupeSvg style={{ position: 'absolute', top: 8, right: 8 }} />
    </Root>
  )
}
