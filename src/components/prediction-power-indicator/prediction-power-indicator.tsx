import { ReactElement, useState } from 'react'
import Tooltip from 'rc-tooltip'

import {
  getColorByValue,
  PredictionPowerPoint,
} from './prediction-power-indicator.styles'

interface IPredictionPowerIndicatorProps {
  className?: string
  value: number
  comment?: string
  size?: 'sm' | 'md'
}

export const PredictionPowerIndicator = ({
  className,
  value,
  comment,
  size = 'md',
}: IPredictionPowerIndicatorProps): ReactElement => {
  const [isCommentShown, setCommentShown] = useState(false)
  const valueStr = value.toFixed(3)

  return (
    <Tooltip
      overlay={
        isCommentShown ? (
          <span>
            {valueStr} <span className="text-[10px]">{comment}</span>
          </span>
        ) : (
          valueStr
        )
      }
      trigger="hover"
      placement="topLeft"
    >
      <PredictionPowerPoint
        className={className}
        colorIndex={getColorByValue(value)}
        size={size}
        onClick={() => setCommentShown(!isCommentShown)}
      />
    </Tooltip>
  )
}
