import React, { useRef } from 'react'
import cn, { Argument } from 'classnames'

import { useOutsideClick } from '@core/hooks/use-outside-click'

export interface IPopperMenuProps {
  close: () => void
  className?: Argument
}

export const PopperMenu = ({
  close,
  children,
  className,
}: React.PropsWithChildren<IPopperMenuProps>) => {
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick(ref, close)

  return (
    <div
      ref={ref}
      className={cn(
        'bg-white',
        'text-black',
        'rounded',
        'shadow-card',
        'cursor-pointer',
        'text-12',
        'flex',
        'flex-col',
        className,
      )}
    >
      {children}
    </div>
  )
}
