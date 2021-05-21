import { ReactElement, ReactNode } from 'react'
import Modal from 'react-modal'

export interface ModalBaseProps {
  isOpen: boolean
  close: () => void
  children: ReactElement | ReactNode
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgb(0,0,0, 0.5)',
  },
  content: {
    padding: 0,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '95vh',
  },
}

Modal.setAppElement('#root')

export const ModalBase = ({
  children,
  isOpen,
  close,
}: ModalBaseProps): ReactElement => (
  <Modal
    isOpen={isOpen}
    onRequestClose={close}
    style={customStyles}
    contentLabel="Example Modal"
  >
    {children}
  </Modal>
)
