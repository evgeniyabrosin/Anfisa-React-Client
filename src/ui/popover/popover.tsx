import styles from './popover.module.css'

import { ReactElement, ReactNode, useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import cn from 'classnames'

import { IModalBaseProps, Modal } from '@ui/modal'
import { Placement } from '@popperjs/core'

export interface IPopoverBaseProps
  extends Omit<IModalBaseProps, 'transitionDuration' | 'isBackdropInvisible'> {
  anchorEl?: HTMLElement | null
}

export interface IPopoverProps extends IPopoverBaseProps {
  modalClassName?: string
  transitionDuration?: number
  className?: string
  placement?: Placement
  offset?: [number | null | undefined, number | null | undefined]
  children: ReactNode
}

export const Popover = ({
  modalClassName,
  transitionDuration = 150,
  isKeepMounted,
  className,
  isOpen,
  onClose,
  anchorEl,
  placement = 'bottom-start',
  offset,
  children,
}: IPopoverProps): ReactElement => {
  const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null)
  const popperRef = useRef(popperEl)
  popperRef.current = popperEl

  const { styles: popperStyles, attributes } = usePopper(anchorEl, popperEl, {
    placement,
    modifiers: [
      {
        enabled: !!offset,
        name: 'offset',
        options: {
          offset,
        },
      },
    ],
  })

  return (
    <Modal
      className={modalClassName}
      transitionDuration={transitionDuration}
      isBackdropInvisible={true}
      isOpen={isOpen}
      isKeepMounted={isKeepMounted}
      onClose={onClose}
      render={({ state }) => (
        <div
          className={cn(styles.popover, styles[`popover_${state}`], className)}
          ref={setPopperEl}
          style={{
            transitionDuration: `${transitionDuration}ms`,
            ...popperStyles.popper,
          }}
          {...attributes.popper}
        >
          {children}
        </div>
      )}
    />
  )
}
