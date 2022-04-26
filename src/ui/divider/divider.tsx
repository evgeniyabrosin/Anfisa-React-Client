import { ReactElement } from 'react'
import cn from 'classnames'
import styled from 'styled-components'

import { theme } from '@theme'

interface IDividerProps {
  className?: string
  orientation: 'vertical' | 'horizontal'
}

export const Divider = ({
  className,
  orientation,
}: IDividerProps): ReactElement => {
  return (
    <div
      className={cn(
        'bg-blue-lighter rounded-full overflow-hidden shrink-0 grow-0',
        orientation === 'vertical' ? 'w-0.5 h-full mx-4' : 'h-0.5 w-full my-y',
        className,
      )}
    >
      {'\u00a0'}
    </div>
  )
}

interface ICircleDividerProp {
  size?: string
  color?: string
}

export const CircleDivider = styled.div<ICircleDividerProp>`
  width: ${({ size }) => size} !important;
  height: ${({ size }) => size} !important;
  display: inline-block;
  border-radius: 50%;
  background-color: ${({ color }) =>
    color ? color : theme('colors.blue.lighter')};
  flex-shrink: 0;
  flex-grow: 0;
  overflow: hidden;
`
