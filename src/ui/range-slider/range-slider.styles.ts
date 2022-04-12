import styled from 'styled-components'

import { theme } from '@theme'
import { RangeSliderColor } from './range-slider.interface'
import { RangeSliderHistogramRoot } from './range-slider-histogram/range-slider-histogram.styles'

const disabledColor = theme('colors.grey.disabled')
const axisColor = theme('colors.grey.blue')
const controlDisabledColor = theme('colors.grey.blue')
const controlPrimaryActiveColor = theme('colors.blue.active')
const controlPrimaryColor = theme('colors.blue.hover')
const controlSecondaryActiveColor = theme('colors.purple.hover')
const controlSecondaryColor = theme('colors.purple.static')

interface IRangeSliderRootProps {
  hasHistogram?: boolean
  isActive?: boolean
  isDisabled?: boolean
  isVertical?: boolean
}

export const RangeSliderRoot = styled.div<IRangeSliderRootProps>`
  ${props => props.isVertical && 'height: 100%;'}
  margin-left: ${props => (props.hasHistogram ? '48px' : '0')};
  cursor: ${props =>
    props.isDisabled ? 'default' : props.isActive ? 'grabbing' : 'pointer'};
`

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
    background: ${axisColor};
    border-radius: 2px;
  }

  ${RangeSliderHistogramRoot} + & {
    margin-top: -6px;
  }
`

export const RangeSliderVerticalRuler = styled.div`
  position: relative;
  width: 32px;
  height: 100%;

  ::before {
    content: '';
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: 6px;
    width: 4px;
    background: ${disabledColor};
    border-radius: 2px;
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
  border: 1px solid ${props => getHandleColor(props)};
  border-radius: 8px;
  cursor: ${props => (props.isActive ? 'grabbing' : 'grab')};

  ${RangeSliderRuler} > & {
    margin-left: -8px;
  }

  ${RangeSliderVerticalRuler} > & {
    margin-top: -8px;
  }

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

  ${RangeSliderRuler} > & {
    top: 8px;
    width: 0;
    height: 6px;
    border-left: 1px solid ${axisColor};
  }

  ${RangeSliderVerticalRuler} > & {
    left: 8px;
    width: 6px;
    height: 0;
    border-top: 1px solid ${axisColor};
  }
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

  ${RangeSliderRuler} > & {
    top: 16px;
  }

  ${RangeSliderVerticalRuler} > & {
    left: 0;
    transform: translateX(32px) rotate(-90deg);
    transform-origin: 0 100%;
  }
`
