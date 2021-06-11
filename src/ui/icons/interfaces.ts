import { CSSProperties } from 'react'
import { Argument } from 'classnames'

export interface IconProps {
  style?: CSSProperties
  fill?: string // TODO remove when become unnecessary
  className?: Argument
  onClick?: () => void
}
