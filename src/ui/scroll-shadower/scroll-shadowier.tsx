import React, { FC, useEffect, useRef } from 'react'
import cn, { Argument } from 'classnames'

import {
  createShadow,
  createTrigger,
  DisplayValue,
  Placement,
} from '@ui/scroll-shadower/scroll-shadowier.utils'

interface Prop {
  classname?: Argument
}

export const ScrollShadowier: FC<Prop> = ({ classname, children }) => {
  const shadowsRef = useRef<HTMLDivElement>(null)
  const scrollableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollable = scrollableRef.current
    const shadows = shadowsRef.current
    if (!scrollable || !shadows) {
      return
    }

    const area = scrollable?.firstElementChild as HTMLDivElement

    if (!area) {
      return
    }

    const topTrigger = createTrigger(area, Placement.top)
    const rightTrigger = createTrigger(area, Placement.right)
    const bottomTrigger = createTrigger(area, Placement.bottom)
    const leftTrigger = createTrigger(area, Placement.left)

    const topShadow = createShadow(shadows, Placement.top)
    const rightShadow = createShadow(shadows, Placement.right)
    const bottomShadow = createShadow(shadows, Placement.bottom)
    const leftShadow = createShadow(shadows, Placement.left)

    const resizeObserver = new ResizeObserver(entries => {
      const {
        contentRect: { width, height },
      } = entries[0]
      shadows.style.width = `${width}px`
      shadows.style.height = `${height}px`
    })

    resizeObserver.observe(scrollable)

    const intersectionObserver = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          switch (entry.target) {
            case topTrigger:
              topShadow.style.display = entry.isIntersecting
                ? DisplayValue.none
                : DisplayValue.block
              break
            case rightTrigger:
              rightShadow.style.display = entry.isIntersecting
                ? DisplayValue.none
                : DisplayValue.block
              break
            case bottomTrigger:
              bottomShadow.style.display = entry.isIntersecting
                ? DisplayValue.none
                : DisplayValue.block
              break
            case leftTrigger:
              leftShadow.style.display = entry.isIntersecting
                ? DisplayValue.none
                : DisplayValue.block
              break
          }
        }
      },
      {
        root: scrollable,
      },
    )
    intersectionObserver.observe(topTrigger)
    intersectionObserver.observe(rightTrigger)
    intersectionObserver.observe(bottomTrigger)
    intersectionObserver.observe(leftTrigger)

    return () => {
      ;[
        topTrigger,
        rightTrigger,
        bottomTrigger,
        leftTrigger,
        topShadow,
        rightShadow,
        bottomShadow,
        leftShadow,
      ].forEach(target => target.remove())
      intersectionObserver.disconnect()
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div
      className={cn(classname)}
      style={{
        position: 'relative',
      }}
    >
      <div ref={shadowsRef} style={{ position: 'absolute', left: 0, top: 0 }} />
      <div
        ref={scrollableRef}
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          overflow: 'auto',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 'fit-content',
            height: 'fit-content',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
