import styles from './modal.module.css'

import React, { ReactElement, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Transition } from 'react-transition-group'
import cn from 'classnames'

import { Backdrop } from '../backdrop'
import { IModalProps } from './modal.interface'
import {
  handleModalClose,
  handleModalOpen,
  modalContainer,
  renderContent,
} from './modal.utils'

export const Modal = (props: IModalProps): ReactElement => {
  const {
    className,
    isOpen,
    isKeepMounted,
    isBackdropInvisible,
    onClose,
    transitionDuration,
  } = props
  const rootRef = useRef<HTMLDivElement>(null)
  const [isMounted, setMounted] = useState(!!isOpen)

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => setMounted(true), 0)
      handleModalOpen()

      return () => {
        handleModalClose()
      }
    }
  }, [isOpen])

  const handleExited = () => {
    setMounted(false)
  }

  return ReactDOM.createPortal(
    <Transition
      appear
      nodeRef={rootRef}
      in={isOpen && isMounted}
      timeout={transitionDuration}
      onExited={handleExited}
    >
      {state =>
        (isKeepMounted || isOpen || isMounted) && (
          <div ref={rootRef} className={cn(styles.modal, className)}>
            <Backdrop
              isInvisible={isBackdropInvisible}
              isOpen={isOpen && isMounted}
              transitionDuration={transitionDuration}
              onClick={onClose}
            />
            {renderContent({ props, state, isMounted })}
          </div>
        )
      }
    </Transition>,
    modalContainer,
  )
}
