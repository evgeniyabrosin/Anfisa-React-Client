import React, { FC } from 'react'

import { CheckInput, ICheckInputProps } from '@ui/check-input/check-input'

export const Checkbox: FC<Omit<ICheckInputProps, 'type'>> = props => (
  <CheckInput type="checkbox" {...props} />
)
