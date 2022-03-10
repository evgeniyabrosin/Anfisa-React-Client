import { ReactElement } from 'react'

import { TNumericConditionBounds } from '@service-providers/common/common.interface'

interface INumericConditionValueProps {
  className?: string
  value: TNumericConditionBounds
  name: string
}

export const NumericConditionValue = ({
  className,
  value,
  name,
}: INumericConditionValueProps): ReactElement | null => {
  if (value[0] == null && value[2] == null) {
    return null
  }

  const min = value[0] != null ? `${value[0]} ${value[1] ? '≤' : '<'}` : ''
  const max = value[2] != null ? `${value[3] ? '≤' : '<'} ${value[2]}` : ''

  return (
    <span className={className}>
      {min} {name} {max}
    </span>
  )
}
