import React, { FC, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

interface Props {
  height: string
  width: string
  color: string
}

interface HorizontalShadowProps {
  showOnLeft: boolean
  showOnRight: boolean
  offsetRight?: number
}

interface VerticalShadowProps {
  showOnTop: boolean
  showOnBottom: boolean
  offsetDown?: number
}

const ShadowHorizontal = styled.div<HorizontalShadowProps>`
  position: relative;
  ${props =>
    props.showOnRight
      ? css`
          ::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            right: ${props.offsetRight || 0}px;
            width: 30px;
            background: linear-gradient(
              to right,
              rgba(255, 255, 255, 0),
              rgba(0, 0, 0, 0.25)
            );
          }
        `
      : ''}
  ${props =>
    props.showOnLeft
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
  ${props =>
    props.showOnTop
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
  ${props =>
    props.showOnBottom
      ? css`
          ::after {
            content: '';
            position: absolute;
            bottom: ${props.offsetDown || 0}px;
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

export const VerticalScrollShadow: FC<Props> = ({ children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [showOnBottom, setShowOnBottom] = useState<boolean>(true)
  const [showOnTop, setShowOnTop] = useState<boolean>(false)

  useEffect(() => {
    const onScroll = () => {
      const {
        scrollHeight = 0,
        scrollTop = 0,
        offsetHeight = 0,
      } = ref.current || {}
      setShowOnTop(scrollTop > 0)
      setShowOnBottom(scrollTop + offsetHeight < scrollHeight)
    }
    onScroll()
    console.log(ref)
    const node = ref.current
    node?.addEventListener('scroll', onScroll)
    return () => {
      node?.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <ShadowVertical showOnTop={showOnTop} showOnBottom={showOnBottom}>
      <Container ref={ref} {...props}>
        {children}
      </Container>
    </ShadowVertical>
  )
}

export const HorizontalScrollShadow: FC<Props> = ({ children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [showOnLeft, setShowOnLeft] = useState<boolean>(false)
  const [showOnRight, setShowOnRight] = useState<boolean>(true)

  useEffect(() => {
    const onScroll = () => {
      const {
        scrollWidth = 0,
        scrollLeft = 0,
        offsetWidth = 0,
      } = ref.current || {}
      setShowOnLeft(scrollLeft != 0)
      setShowOnRight(scrollLeft + offsetWidth != scrollWidth)
    }
    onScroll()
    const node = ref.current
    node?.addEventListener('scroll', onScroll)
    return () => {
      node?.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <ShadowHorizontal showOnLeft={showOnLeft} showOnRight={showOnRight}>
      <Container ref={ref} {...props}>
        {children}
      </Container>
    </ShadowHorizontal>
  )
}

export const ScrollShadower: FC<Props> = ({ children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [showOnLeft, setShowOnLeft] = useState<boolean>(false)
  const [showOnRight, setShowOnRight] = useState<boolean>(true)
  const [showOnBottom, setShowOnBottom] = useState<boolean>(true)
  const [showOnTop, setShowOnTop] = useState<boolean>(false)

  const [rightOffset, setRightOffset] = useState<number>(0)
  const [downOffset, setDownOffset] = useState<number>(0)

  useEffect(() => {
    const onScroll = () => {
      const {
        scrollWidth = 0,
        scrollLeft = 0,
        offsetWidth = 0,
        scrollHeight = 0,
        scrollTop = 0,
        offsetHeight = 0,
        clientHeight = 0,
        clientWidth = 0,
      } = ref.current || {}
      setRightOffset(offsetWidth - clientWidth)
      setDownOffset(offsetHeight - clientHeight)

      setShowOnLeft(scrollLeft != 0)
      setShowOnRight(scrollLeft + offsetWidth + rightOffset < scrollWidth)
      setShowOnTop(scrollTop > 0)
      setShowOnBottom(scrollTop + offsetHeight + downOffset < scrollHeight)
    }
    onScroll()
    const node = ref.current
    node?.addEventListener('scroll', onScroll)
    return () => {
      node?.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <ShadowVertical
      showOnTop={showOnTop}
      showOnBottom={showOnBottom}
      offsetDown={downOffset}
    >
      <ShadowHorizontal
        showOnLeft={showOnLeft}
        showOnRight={showOnRight}
        offsetRight={rightOffset}
      >
        <Container ref={ref} {...props}>
          {children}
        </Container>
      </ShadowHorizontal>
    </ShadowVertical>
  )
}
