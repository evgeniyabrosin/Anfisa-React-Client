import { ReactElement } from 'react'

import { PopperButton } from '@ui/popper-button'
import { SettingsPanel } from './settings-panel'
import { TableProperiesButton } from './table-properties-button'

export const Settings = (): ReactElement => (
  <div className="flex items-end ml-auto">
    <PopperButton
      ButtonElement={TableProperiesButton}
      ModalElement={SettingsPanel}
    />
  </div>
)
