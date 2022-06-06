import styles from './arrow-button.module.css'

import { ButtonHTMLAttributes, ReactElement } from 'react'
import cn from 'classnames'

import { Icon } from '@ui/icon'
import {
  TArrowButtonDirection,
  TArrowButtonSize,
} from './arrow-button.interface'
import { getArrowButtonIcon } from './arrow-button.utils'

export interface IArrowButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: TArrowButtonDirection
  size?: TArrowButtonSize
}

export const ArrowButton = ({
  direction,
  size = 'md',
  className,
  ...buttonProps
}: IArrowButtonProps): ReactElement => {
  return (
    <button
      className={cn(
        styles.arrowButton,
        styles[`arrowButton_${size}`],
        className,
      )}
      {...buttonProps}
    >
      <Icon name={getArrowButtonIcon(size, direction)} />
    </button>
  )
}
