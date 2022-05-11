import styles from './check-input.module.css'

import { ChangeEvent, FC } from 'react'
import cn, { Argument } from 'classnames'

export interface ICheckInputProps {
  id: string | number
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
    <label htmlFor={id.toString()} className={cn(className)}>
      <input
        type="radio"
        id={id.toString()}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="mr-1"
      />
      {children}
    </label>
  ) : (
    <div className={cn('flex items-center', className)}>
      <input
        id={`${'checkbox'} + ${id}`}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={(cn('hidden'), styles.checkbox)}
        disabled={disabled}
      />

      <label className={styles.checkmark} htmlFor={`${'checkbox'} + ${id}`} />

      <label
        className={styles.label}
        htmlFor={`${'checkbox'} + ${id}`}
        data-testid={datatestId}
      >
        {children}
      </label>
    </div>
  )
}
