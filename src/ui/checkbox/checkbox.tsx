import React, { FC } from 'react'

// import './checkbox.css'
import { CheckInput, ICheckInputProps } from '@ui/check-input'

export const Checkbox: FC<Omit<ICheckInputProps, 'type'>> = props => (
  <CheckInput type="checkbox" {...props} />
)
