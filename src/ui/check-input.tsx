import React, { ChangeEvent, FC } from 'react'
import cn, { Argument } from 'classnames'

export interface ICheckInputProps {
  checked?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  className?: Argument
  disabled?: boolean
  type?: 'checkbox' | 'radio'
  lcn?: Argument
  id: string
}

export const CheckInput: FC<ICheckInputProps> = ({
  checked,
  disabled,
  onChange,
  id,
  className,
  lcn,
  type = 'radio',
  children,
}) => {
  return (
    <div className={cn(className)}>
      <input
        type={type}
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={id} className={cn(lcn)}>
        {children}
      </label>
    </div>
  )
}
