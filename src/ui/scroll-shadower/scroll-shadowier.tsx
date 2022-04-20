import React, { FC, useEffect, useRef } from 'react'

import { ISScrollShadowierProps } from '@ui/scroll-shadower/scroll-shadowier.interface'
import {
  Container,
  RootContainer,
  ShadowBottom,
  ShadowLeft,
  ShadowRight,
  ShadowTop,
} from '@ui/scroll-shadower/scroll-shadowier.styles'

export const ScrollShadowier: FC<ISScrollShadowierProps> = ({
  children,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const left = useRef<HTMLDivElement>(null)
  const right = useRef<HTMLDivElement>(null)
  const bottom = useRef<HTMLDivElement>(null)
  const top = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const resizeHandler = () => {
      if (
        !ref.current ||
        !top.current ||
        !bottom.current ||
        !left.current ||
        !right.current
      ) {
        return
      }

      const {
        offsetWidth = 0,
        offsetHeight = 0,
        clientHeight = 0,
        clientWidth = 0,
      } = ref.current || {}

      const verticalOffset = offsetHeight - clientHeight
      const horizontalOffset = offsetWidth - clientWidth

      bottom.current.style.bottom = verticalOffset + 'px'
      bottom.current.style.right = horizontalOffset + 'px'

      top.current.style.right = horizontalOffset + 'px'

      right.current.style.right = horizontalOffset + 'px'
      right.current.style.bottom = verticalOffset + 'px'

      left.current.style.bottom = verticalOffset + 'px'
    }

    const scrollHandler = () => {
      if (
        !ref.current ||
        !top.current ||
        !bottom.current ||
        !left.current ||
        !right.current
      ) {
        return
      }

      const none = 'none'
      const initial = 'initial'

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

      const verticalOffset = offsetHeight - clientHeight
      const horizontalOffset = offsetWidth - clientWidth

      const onLeft = scrollLeft != 0
      const onRight = scrollLeft + offsetWidth + horizontalOffset < scrollWidth
      const onTop = scrollTop > 0
      const onBottom = scrollTop + offsetHeight + verticalOffset < scrollHeight

      left.current.style.display = onLeft ? initial : none
      right.current.style.display = onRight ? initial : none
      top.current.style.display = onTop ? initial : none
      bottom.current.style.display = onBottom ? initial : none
    }
    /* const options = {
      root: ref.current,
      rootMargin: '0px',
      threshold: [0.0, 1.0],
    }*/
    const resizeObserver = new ResizeObserver(resizeHandler)
    //const scrollObserver = new IntersectionObserver(scrollHandler, options)

    scrollHandler()
    resizeHandler()

    const node = ref.current
    if (!node) return

    //scrollObserver.observe(ref.current)
    node.addEventListener('scroll', scrollHandler)
    resizeObserver.observe(node)
    return () => {
      resizeObserver.unobserve(node)
      node.removeEventListener('scroll', scrollHandler)
      //scrollObserver.unobserve(ref.current)
    }
  }, [])

  return (
    <RootContainer>
      <ShadowBottom ref={bottom} />
      <ShadowTop ref={top} />
      <ShadowLeft ref={left} />
      <ShadowRight ref={right} />
      <Container ref={ref} {...props}>
        {children}
      </Container>
    </RootContainer>
  )
}
