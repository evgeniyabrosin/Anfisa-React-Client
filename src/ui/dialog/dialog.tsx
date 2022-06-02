import styles from './dialog.module.css'

import { ReactElement } from 'react'
import cn from 'classnames'

import { DialogCard } from '@ui/dialog/dialog-card'
import { Modal } from '../modal'
import { IDialogProps } from './dialog.interface'

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
