import React, { FC } from 'react'

interface Props {
  label: string
  checked: boolean
  onChange?: () => void
  className?: string
  type?: 'checkbox' | 'radio'
  icn?: string
  lcn?: string
  id: string
}

export const Checkbox: FC<Props> = ({
  checked,
  label,
  onChange,
  id,
  className,
  icn,
  lcn,
  type = 'radio',
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        id={id}
        checked={checked}
        onClick={onChange}
        className={icn}
      />
      <label htmlFor={id} className={lcn}>
        {label}
      </label>
    </div>
  )
}
