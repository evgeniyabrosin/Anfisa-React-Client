import styles from './dialog-card.module.css'

import { HTMLAttributes, ReactElement, ReactNode } from 'react'
import cn from 'classnames'

import { Icon } from '@ui/icon'
import {
  DialogStandardActions,
  IDialogStandardActionsProps,
} from '../dialog-standard-actions'

export interface IDialogCardProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    IDialogStandardActionsProps {
  title?: ReactNode
  actions?: ReactNode
  children?: ReactNode
  onClose?: () => void
}

export const DialogCard = ({
  className,
  title,
  actions,
  children,
  onClose,
  onApply,
  isLoading,
  isApplyDisabled,
  applyText,
  cancelText,
  ...divProps
}: IDialogCardProps): ReactElement => {
  return (
    <div className={cn(styles.dialogCard, className)} {...divProps}>
      <button
        tabIndex={-1}
        className={styles.dialogCard__close}
        onClick={onClose}
      >
        <Icon name="Close" size={16} />
      </button>
      {title && <h2 className={styles.dialogCard__title}>{title}</h2>}
      <div className={styles.dialogCard__content}>{children}</div>
      {(actions || actions === undefined) && (
        <div className={styles.dialogCard__actions}>
          {actions || (
            <DialogStandardActions
              applyText={applyText}
              cancelText={cancelText}
              isApplyDisabled={isApplyDisabled}
              isLoading={isLoading}
              onClose={onClose}
              onApply={onApply}
            />
          )}
        </div>
      )}
    </div>
  )
}
