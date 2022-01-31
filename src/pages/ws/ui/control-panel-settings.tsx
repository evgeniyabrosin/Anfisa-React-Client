import { ReactElement } from 'react'

import { t } from '@i18n'
import { PopperButton } from '@components/popper-button'
import { ControlPanelTitle } from './control-panel-title'
import { SettingsPanel } from './customize-table-modal/settings-panel/settings-panel'
import { TableProperiesButton } from './table-properties-button'

export const Results = (): ReactElement => (
  <div>
    <ControlPanelTitle title={t('ds.results')} />

    <PopperButton
      ButtonElement={TableProperiesButton}
      ModalElement={SettingsPanel}
    />
  </div>
)
