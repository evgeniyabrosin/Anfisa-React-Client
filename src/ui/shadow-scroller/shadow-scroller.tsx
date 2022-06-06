import styles from './shadow-scroller.module.css'

import { FC, useRef } from 'react'
import cn, { Argument } from 'classnames'

import { ScrollDirection, useGrabScroll } from '@core/hooks/use-grab-scroll'
import { useScrollShadows } from '@ui/shadow-scroller/shadow-scroller.hook'

interface IScrollerProp {
  direction?: ScrollDirection
  hideShadows?: boolean
  grabScroll?: boolean
  className?: Argument
}

export const ShadowScroller: FC<IScrollerProp> = ({
  direction = 'both',
  grabScroll = true,
  hideShadows = false,
  className,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const shadowsRef = useRef<HTMLDivElement>(null)

  const onMouseDown = useGrabScroll(ref, direction)

  useScrollShadows(ref, shadowsRef, direction, hideShadows)

  return (
    <div className={cn(styles.container, className)}>
      <div className={cn(styles.container__shadow)} ref={shadowsRef} />
      <div
        className={cn(
          styles.container__scroller,
          styles[`container__scroller_${direction}`],
        )}
        onMouseDown={grabScroll ? onMouseDown : undefined}
        ref={ref}
      >
        <div
          className={cn(
            styles.container__value,
            styles[`container__value_${direction}`],
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
