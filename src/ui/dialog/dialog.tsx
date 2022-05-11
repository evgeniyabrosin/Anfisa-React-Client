import styles from './dialog.module.css'

import React, { ReactElement } from 'react'
import cn from 'classnames'

import { DialogCard, IDialogCardProps } from '@ui/dialog/dialog-card'
import { IModalBaseProps, Modal } from '../modal'

export type TDialogWidth = 's' | 'm' | 'l'

export interface IDialogProps
  extends Omit<IModalBaseProps, 'transitionDuration'>,
    IDialogCardProps {
  width?: TDialogWidth
  modalClassName?: string
  transitionDuration?: number
  className?: string
}

export const Dialog = ({
  className,
  modalClassName,
  isOpen,
  isKeepMounted,
  width = 's',
  transitionDuration = 300,
  onClose,
  ...dialogCardProps
}: IDialogProps): ReactElement => {
  return (
    <Modal
      className={modalClassName}
      transitionDuration={transitionDuration}
      isOpen={isOpen}
      isKeepMounted={isKeepMounted}
      onClose={onClose}
      render={({ state }) => (
        <DialogCard
          className={cn(
            styles.dialog,
            styles[`dialog_${state}`],
            styles[`dialog_${width}`],
            className,
          )}
          style={{
            transitionDuration: `${transitionDuration}ms`,
            visibility: state === 'exited' && !isOpen ? 'hidden' : undefined,
          }}
          onClose={onClose}
          {...dialogCardProps}
        />
      )}
    />
  )
}
