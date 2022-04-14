import React, { FC, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

interface Props {
  height: string
  width: string
}

interface HorizontalShadowProps {
  showOnLeft: boolean
  showOnRight: boolean
  rightOffset?: number
}

interface VerticalShadowProps {
  showOnTop: boolean
  showOnBottom: boolean
  bottomOffset?: number
}

const ShadowHorizontal = styled.div<HorizontalShadowProps>`
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

const ShadowVertical = styled.div<VerticalShadowProps>`
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

const Container = styled.div<Props>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  overflow-x: auto;
  display: flex;
`

export const ScrollShadower: FC<Props> = ({ children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [showOnLeft, setShowOnLeft] = useState<boolean>(false)
  const [showOnRight, setShowOnRight] = useState<boolean>(true)
  const [showOnBottom, setShowOnBottom] = useState<boolean>(true)
  const [showOnTop, setShowOnTop] = useState<boolean>(false)

  const [rightOffset, setRightOffset] = useState<number>(0)
  const [downOffset, setDownOffset] = useState<number>(0)

  useEffect(() => {
    const onResize = () => {
      const {
        offsetWidth = 0,
        offsetHeight = 0,
        clientHeight = 0,
        clientWidth = 0,
      } = ref.current || {}

      setRightOffset(offsetWidth - clientWidth)
      setDownOffset(offsetHeight - clientHeight)
    }

    const onScroll = () => {
      const {
        scrollWidth = 0,
        scrollLeft = 0,
        offsetWidth = 0,
        scrollHeight = 0,
        scrollTop = 0,
        offsetHeight = 0,
      } = ref.current || {}

      setShowOnLeft(scrollLeft != 0)
      setShowOnRight(scrollLeft + offsetWidth + rightOffset < scrollWidth)
      setShowOnTop(scrollTop > 0)
      setShowOnBottom(scrollTop + offsetHeight + downOffset < scrollHeight)
    }
    onScroll()
    onResize()

    const node = ref.current

    node?.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => {
      node?.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ShadowVertical
      showOnTop={showOnTop}
      showOnBottom={showOnBottom}
      bottomOffset={downOffset}
    >
      <ShadowHorizontal
        showOnLeft={showOnLeft}
        showOnRight={showOnRight}
        rightOffset={rightOffset}
      >
        <Container ref={ref} {...props}>
          {children}
        </Container>
      </ShadowHorizontal>
    </ShadowVertical>
  )
}
