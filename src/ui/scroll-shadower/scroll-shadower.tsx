import React, { FC, useEffect, useRef, useState } from 'react'

import { IScrollShadowerProps } from '@ui/scroll-shadower/scroll-shadower.interface'
import {
  Container,
  ShadowHorizontal,
  ShadowVertical,
} from '@ui/scroll-shadower/scroll-shadower.styles'

export const ScrollShadower: FC<IScrollShadowerProps> = ({
  children,
  ...props
}) => {
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
