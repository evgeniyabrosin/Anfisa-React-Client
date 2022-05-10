import { FC } from 'react'

import { CheckInput, ICheckInputProps } from '@ui/check-input'

export const Radio: FC<Omit<ICheckInputProps, 'type'>> = props => (
  <CheckInput type="radio" {...props} />
)
