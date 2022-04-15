import styled, { css } from 'styled-components'

import {
  IHorizontalShadowProps,
  IScrollShadowerProps,
  IVerticalShadowProps,
} from '@ui/scroll-shadower/scroll-shadower.interface'

export const ShadowHorizontal = styled.div<IHorizontalShadowProps>`
  position: relative;
  ${({ showOnRight, rightOffset = 0 }) =>
    showOnRight
      ? css`
          ::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            right: ${rightOffset}px;
            width: 30px;
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0),
              rgba(0, 0, 0, 0.25)
            );
          }
        `
      : ''}
  ${({ showOnLeft }) =>
    showOnLeft
      ? css`
          ::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            top: 0;
            width: 30px;
            background: linear-gradient(
              to left,
              rgba(255, 255, 255, 0),
              rgba(0, 0, 0, 0.25)
            );
          }
        `
      : ''}
`
export const ShadowVertical = styled.div<IVerticalShadowProps>`
  position: relative;
  ${({ showOnTop }) =>
    showOnTop
      ? css`
          ::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 30px;
            background: linear-gradient(
              to top,
              rgba(255, 255, 255, 0),
              rgba(0, 0, 0, 0.25)
            );
          }
        `
      : ''}
  ${({ showOnBottom, bottomOffset = 0 }) =>
    showOnBottom
      ? css`
          ::after {
            content: '';
            position: absolute;
            bottom: ${bottomOffset}px;
            left: 0;
            right: 0;
            height: 30px;
            background: linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0),
              rgba(0, 0, 0, 0.25)
            );
          }
        `
      : ''}
`
export const Container = styled.div<IScrollShadowerProps>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  overflow-x: auto;
  display: flex;
`
