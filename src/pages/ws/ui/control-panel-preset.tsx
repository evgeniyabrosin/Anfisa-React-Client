import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { DropDown } from '@ui/dropdown'
import { ControlPanelTitle } from './control-panel-title'

export const Preset = observer(
  (): ReactElement => (
    <div>
      <ControlPanelTitle title={t('ds.preset')}>
        <div className="text-blue-bright">Save</div>
      </ControlPanelTitle>

      <DropDown />
    </div>
  ),
)
