import styles from './scroller.module.css'

import { FC, useRef } from 'react'
import cn, { Argument } from 'classnames'

import { ScrollDirection, useGrabScroll } from '@core/hooks/use-grab-scroll'

interface IScrollerProp {
  direction?: ScrollDirection
  showShadows?: boolean
  className?: Argument
}

export const Scroller: FC<IScrollerProp> = ({
  direction = 'both',
  className,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseDown = useGrabScroll(ref, direction)

  return (
    <div
      className={cn(styles.scroller, className)}
      onMouseDown={onMouseDown}
      ref={ref}
    >
      {children}
    </div>
  )
}
