import styles from './dropdown-arrow.module.css'

import { HTMLProps, ReactElement } from 'react'
import cn from 'classnames'

interface IDropdownArrowProps extends Omit<HTMLProps<HTMLSpanElement>, 'size'> {
  size?: 'md' | 'sm'
  isOpen?: boolean
}

export const DropdownArrow = ({
  className,
  size = 'md',
  isOpen,
  ...htmlProps
}: IDropdownArrowProps): ReactElement => {
  return (
    <span
      className={cn(
        styles.arrow,
        isOpen && styles.arrow_open,
        styles[`arrow_${size}`],
        className,
      )}
      {...htmlProps}
    />
  )
}
