import React, { ChangeEvent, FC } from 'react'
import cn, { Argument } from 'classnames'

export interface ICheckInputProps {
  checked?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  className?: Argument
  disabled?: boolean
  type?: 'checkbox' | 'radio'
  id?: string
}

export const CheckInput: FC<ICheckInputProps> = ({
  checked,
  disabled,
  onChange,
  id,
  className,
  type = 'radio',
  children,
}) => {
  return (
    <label htmlFor={id} className={cn(className)}>
      <input
        type={type}
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={cn({
          'mr-2': type === 'checkbox',
          'mr-1': type !== 'checkbox',
        })}
      />
      {children}
    </label>
  )
}
