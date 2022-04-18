import { FC } from 'react'

import { CheckInput, ICheckInputProps } from '@ui/check-input'

export const Radio: FC<Omit<ICheckInputProps, 'type' | 'lcn'>> = props => (
  <CheckInput lcn="ml-1" {...props} />
)
