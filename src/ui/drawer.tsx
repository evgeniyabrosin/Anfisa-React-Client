import { ReactElement } from 'react'
import Modal from 'react-modal'

import { ModalBaseProps } from '@ui/modal-base'

const customStyles = {
  overlay: {
    backgroundColor: 'rgb(0,0,0, 0.5)',
  },
  content: {
    padding: 0,
    border: 'none',
    borderRadius: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 'auto',
    width: '70vw',
    height: '100vh',
  },
}

Modal.setAppElement('#root')

export const Drawer = ({
  isOpen,
  children,
  close,
}: ModalBaseProps): ReactElement => (
  <Modal isOpen={isOpen} style={customStyles} onRequestClose={close}>
    {children}
  </Modal>
)
