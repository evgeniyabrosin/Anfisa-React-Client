import { ReactElement } from 'react'

import {
  INumericPropertyStatus,
  TNumericConditionBounds,
} from '@service-providers/common/common.interface'

export interface INumericConditionControlsProps {
  value: TNumericConditionBounds
  hasErrors: boolean
}

export interface INumericConditionProps {
  className?: string
  attrData: INumericPropertyStatus
  initialValue?: TNumericConditionBounds
  controls?: (props: INumericConditionControlsProps) => ReactElement | null
}
