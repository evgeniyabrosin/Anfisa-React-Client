import styles from './input-number.module.css'

import { ChangeEvent, ReactElement } from 'react'
import cn, { Argument } from 'classnames'

interface IInputNumberProps {
  placeholder?: string
  disabled?: boolean
  value: string | number
  className?: Argument
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  min?: number
  max?: number
}

export const InputNumber = ({ ...rest }: IInputNumberProps): ReactElement => {
  const { className, ...tempRest } = rest

  return (
    <input
      type="number"
      className={cn(styles.input, className)}
      {...tempRest}
    />
  )
}
