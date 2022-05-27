import { RefObject, useEffect } from 'react'

import { ScrollDirection } from '@core/hooks/use-grab-scroll'
import {
  createShadow,
  createTrigger,
  DisplayValue,
  hide,
  Placement,
} from '@ui/shadow-scroller/shadow-scroller.utils'

export const useScrollShadows = (
  ref: RefObject<HTMLDivElement>,
  shadowsRef: RefObject<HTMLDivElement>,
  direction: ScrollDirection,
  hideShadows: boolean,
) => {
  useEffect(() => {
    const scrollable = ref.current
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

    const topShadow = createShadow(
      shadows,
      Placement.top,
      direction,
      hideShadows,
    )
    const rightShadow = createShadow(
      shadows,
      Placement.right,
      direction,
      hideShadows,
    )
    const bottomShadow = createShadow(
      shadows,
      Placement.bottom,
      direction,
      hideShadows,
    )
    const leftShadow = createShadow(
      shadows,
      Placement.left,
      direction,
      hideShadows,
    )

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
              topShadow.style.display =
                entry.isIntersecting ||
                hide(Placement.top, direction) ||
                hideShadows
                  ? DisplayValue.none
                  : DisplayValue.block
              break
            case rightTrigger:
              rightShadow.style.display =
                entry.isIntersecting ||
                hide(Placement.right, direction) ||
                hideShadows
                  ? DisplayValue.none
                  : DisplayValue.block
              break
            case bottomTrigger:
              bottomShadow.style.display =
                entry.isIntersecting ||
                hide(Placement.bottom, direction) ||
                hideShadows
                  ? DisplayValue.none
                  : DisplayValue.block
              break
            case leftTrigger:
              leftShadow.style.display =
                entry.isIntersecting ||
                hide(Placement.left, direction) ||
                hideShadows
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, hideShadows])
}
