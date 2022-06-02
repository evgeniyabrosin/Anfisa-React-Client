import styles from './check-input.module.css'

import { ChangeEvent, FC } from 'react'
import cn, { Argument } from 'classnames'

export interface ICheckInputProps {
  id?: string | number
  type: 'checkbox' | 'radio'
  checked: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  className?: Argument
  disabled?: boolean
  datatestId?: string
}

export const CheckInput: FC<ICheckInputProps> = ({
  checked,
  disabled,
  onChange,
  id,
  className,
  type,
  children,
  datatestId,
}) => {
  return type === 'radio' ? (
    <label htmlFor={id?.toString()} className={cn(className)}>
      <input
        type="radio"
        id={id?.toString()}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="mr-1"
      />
      {children}
    </label>
  ) : (
    <label className={cn('inline-flex items-center', className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
        disabled={disabled}
      />

      <span className={styles.checkmark} />

      <span className={styles.label} data-testid={datatestId}>
        {children}
      </span>
    </label>
  )
}
