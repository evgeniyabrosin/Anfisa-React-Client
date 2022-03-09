import styled from 'styled-components'

import { theme } from '@theme'
import { RangeSliderHistogramRoot } from './range-slider-histogram/styles'
import { RangeSliderColor } from './types'

export const RangeSliderRoot = styled.div<{
  readonly hasHistogram?: boolean
  readonly isActive?: boolean
  readonly isDisabled?: boolean
}>`
  margin-left: ${props => (props.hasHistogram ? '40px' : '0')};
  cursor: ${props =>
    props.isDisabled ? 'default' : props.isActive ? 'grabbing' : 'pointer'};
`

const disabledColor = theme('colors.grey.disabled')
const controlDisabledColor = theme('colors.grey.blue')
const controlPrimaryActiveColor = theme('colors.blue.active')
const controlPrimaryColor = theme('colors.blue.hover')
const controlSecondaryActiveColor = theme('colors.purple.hover')
const controlSecondaryColor = theme('colors.purple.static')

export const RangeSliderRuler = styled.div`
  position: relative;
  height: 32px;

  ::before {
    content: '';
    position: absolute;
    left: -2px;
    right: -2px;
    top: 6px;
    height: 4px;
    background: ${disabledColor};
    border-radius: 2px;
  }

  ${RangeSliderHistogramRoot} + & {
    margin-top: -6px;
  }
`

interface IRangeSliderHandleProps {
  color: RangeSliderColor
  isActive?: boolean
  isDisabled?: boolean
  isStrict?: boolean
}

const getHandleColor = ({
  color,
  isActive,
  isDisabled,
}: IRangeSliderHandleProps): string => {
  if (isDisabled) {
    return controlDisabledColor
  }

  if (color === RangeSliderColor.Primary) {
    return isActive ? controlPrimaryActiveColor : controlPrimaryColor
  }

  return isActive ? controlSecondaryActiveColor : controlSecondaryColor
}

export const RangeSliderHandle = styled.div<IRangeSliderHandleProps>`
  position: absolute;
  left: 0;
  top: 0;
  width: 16px;
  height: 16px;
  margin-left: -8px;
  border: 1px solid ${props => getHandleColor(props)};
  border-radius: 8px;
  cursor: ${props => (props.isActive ? 'grabbing' : 'grab')};

  ::before {
    content: '';
    position: absolute;
    left: 2px;
    top: 2px;
    right: 2px;
    bottom: 2px;
    ${props => props.isStrict && `border: 1px solid ${getHandleColor(props)};`}
    background: ${props =>
      props.isStrict ? 'rgba(255,255,255,0.5)' : getHandleColor(props)};
    border-radius: 50%;
  }

  ${props =>
    !props.isDisabled &&
    `:hover {
      border-color: ${
        props.color === RangeSliderColor.Primary
          ? controlPrimaryActiveColor
          : controlSecondaryActiveColor
      };
  
      ::before {
        ${props.isStrict ? 'border-color' : 'background'}: ${
      props.color === RangeSliderColor.Primary
        ? controlPrimaryActiveColor
        : controlSecondaryActiveColor
    };
      }
    }
  `}
`

export const RangeSliderTick = styled.div`
  position: absolute;
  height: 6px;
  top: 8px;
  width: 0;
  border-left: 1px solid ${disabledColor};
`

interface IRangeSliderRangeProps {
  isDisabled?: boolean
  isLeftHandle?: boolean
  isRightHandle?: boolean
  color: RangeSliderColor
}

export const RangeSliderRange = styled.div<IRangeSliderRangeProps>`
  position: absolute;
  top: 6px;
  height: 4px;

  ::before {
    content: '';
    position: absolute;
    left: ${props => (props.isLeftHandle ? '8px' : '-2px')};
    right: ${props => (props.isRightHandle ? '7px' : '-2px')};
    ${props =>
      !props.isLeftHandle &&
      'border-top-left-radius: 2px; border-bottom-left-radius: 2px;'}
    ${props =>
      !props.isRightHandle &&
      'border-top-right-radius: 2px; border-bottom-right-radius: 2px;'}
    top: 0;
    bottom: 0;
    background: ${props =>
      props.isDisabled
        ? controlDisabledColor
        : props.color === RangeSliderColor.Primary
        ? controlPrimaryColor
        : controlSecondaryColor};
  }
`

export const RangeSliderLabel = styled.div`
  position: absolute;
  top: 16px;
`
