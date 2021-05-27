import { ReactElement } from 'react'
import styled from 'styled-components'

import { ANYType } from '@declarations'

interface Props {
  text: string
  className?: string
  onClick?: () => void
  icon?: ReactElement
  leftIcon?: ReactElement
  refEl?: ANYType
}

const StyledButton = styled('button')`
  background-color: #0c65fd;
  border-radius: 4px;
  border: none;
  font-family: 'Work Sans', sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.04em;
  color: #ffffff;
  padding: 8px;
  outline: none;
  cursor: pointer;
`

export const Button = ({
  text,
  onClick,
  className,
  icon,
  leftIcon,
  refEl,
}: Props): ReactElement => (
  <StyledButton onClick={onClick} className={className} ref={refEl}>
    {leftIcon} {text} {icon}
  </StyledButton>
)
