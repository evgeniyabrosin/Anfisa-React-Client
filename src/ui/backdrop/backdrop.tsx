import styles from './backdrop.module.css'

import { HTMLProps, ReactElement, ReactNode, useRef } from 'react'
import { Transition } from 'react-transition-group'
import cn from 'classnames'

interface IBackdropProps extends HTMLProps<HTMLDivElement> {
  className?: string
  isOpen?: boolean
  isInvisible?: boolean
  keepMounted?: boolean
  transitionDuration?: number
  children?: ReactNode
}

export const Backdrop = ({
  className,
  transitionDuration = 300,
  isOpen,
  isInvisible,
  children,
  ...divProps
}: IBackdropProps): ReactElement => {
  const rootRef = useRef<HTMLDivElement>(null)

  return (
    <Transition
      appear
      nodeRef={rootRef}
      in={isOpen}
      timeout={transitionDuration}
    >
      {state => (
        <div
          ref={rootRef}
          className={cn(
            styles.backdrop,
            styles[`backdrop_${state}`],
            isInvisible && styles.backdrop_invisible,
            className,
          )}
          style={{
            transitionDuration: `${transitionDuration}ms`,
            visibility: state === 'exited' && !isOpen ? 'hidden' : undefined,
          }}
          {...divProps}
        >
          {children}
        </div>
      )}
    </Transition>
  )
}
