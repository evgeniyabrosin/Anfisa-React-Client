import React, { FC } from 'react'

import { CheckInput, ICheckInputProps } from '@ui/check-input'

export const Checkbox: FC<Omit<ICheckInputProps, 'type' | 'lcn'>> = props => (
  <CheckInput lcn="ml-2" type="checkbox" {...props} />
)
