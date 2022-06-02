import { IModalBaseProps } from '@ui/modal'
import { IDialogCardProps } from './dialog-card'

export interface IBaseDialogProps {
  onClose: () => void
  isOpen: boolean
}

export type TDialogWidth = 'xs' | 's' | 'm' | 'l' | 'xl'

export interface IDialogProps
  extends Omit<IModalBaseProps, 'transitionDuration'>,
    IDialogCardProps {
  width?: TDialogWidth
  modalClassName?: string
  transitionDuration?: number
  className?: string
}
