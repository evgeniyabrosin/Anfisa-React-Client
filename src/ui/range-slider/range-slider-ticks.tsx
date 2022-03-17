import React from 'react'

import { RangeSliderTick } from './styles'
import { RangeSliderScale } from './types'
import { getSliderTicks } from './utils'

interface RangeSliderTicksProps {
  min: number
  max: number
  step: number
  scale: RangeSliderScale
  width: number
}

export const RangeSliderTicks = React.memo<RangeSliderTicksProps>(props => {
  const ticks = getSliderTicks(props)

  return (
    <React.Fragment>
      {ticks.map(({ value, offset }) => (
        <RangeSliderTick
          key={value}
          style={{
            left: `${offset}px`,
          }}
        />
      ))}
    </React.Fragment>
  )
})

RangeSliderTicks.displayName = 'RangeSliderTicks'
