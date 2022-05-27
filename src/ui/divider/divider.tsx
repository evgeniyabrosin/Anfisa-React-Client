import { ReactElement } from 'react'
import cn from 'classnames'
import styled from 'styled-components'

import { theme } from '@theme'

interface IDividerProps {
  className?: string
  orientation: 'vertical' | 'horizontal'
  color?: 'dark' | 'light'
  spacing?: 'normal' | 'dense'
}

export const Divider = ({
  className,
  orientation,
  color = 'dark',
  spacing = 'normal',
}: IDividerProps): ReactElement => (
  <div
    className={cn(
      'rounded-full overflow-hidden shrink-0 grow-0',
      color === 'dark' ? 'bg-blue-lighter' : 'bg-grey-disabled',
      orientation === 'vertical' ? 'w-0.5 h-full' : 'h-0.5 w-full',
      { 'mx-4': spacing === 'normal' && orientation === 'vertical' },
      { 'mx-2': spacing === 'dense' && orientation === 'vertical' },
      { 'my-4': spacing === 'normal' && orientation === 'horizontal' },
      { 'my-2': spacing === 'dense' && orientation === 'horizontal' },
      className,
    )}
  >
    {'\u00a0'}
  </div>
)

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
