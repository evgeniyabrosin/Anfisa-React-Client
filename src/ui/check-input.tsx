import React, { FC } from 'react'
import cn, { Argument } from 'classnames'

export interface ICheckInputProps {
  checked?: boolean
  onChange?: () => void
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
        onClick={onChange}
      />
      <label htmlFor={id} className={cn(lcn)}>
        {children}
      </label>
    </div>
  )
}
