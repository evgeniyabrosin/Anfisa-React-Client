import { ReactElement } from 'react'

import { PopperButton } from '@components/popper-button'
import { CustomizeTableButton } from './customize-table-button'
import { CustomizeTableModal } from './customize-table-modal'

export const CustomizeTable = (): ReactElement => (
  <PopperButton
    ButtonElement={CustomizeTableButton}
    ModalElement={CustomizeTableModal}
  />
)
