import { ComponentType, ReactNode } from 'react'
import { TransitionStatus } from 'react-transition-group'

export interface IModalComponentProps {
  state: TransitionStatus
  transitionDuration: number
  isMounted: boolean
}

export type TModalRenderFn = (props: IModalComponentProps) => ReactNode

export interface IModalBaseProps {
  className?: string
  transitionDuration: number
  isOpen?: boolean
  isKeepMounted?: boolean
  isBackdropInvisible?: boolean
  onClose?: () => void
}

export interface IModalProps extends IModalBaseProps {
  component?: ComponentType<IModalComponentProps>
  children?: TModalRenderFn
  render?: TModalRenderFn
}
