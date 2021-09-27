import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import { ModsDivider } from './mods-divider'

export const AllNotModalMods = observer(() => (
  <div className="flex text-14 text-blue-bright">
    <div className="flex items-center">
      <Checkbox
        checked={false}
        className="mr-1 cursor-pointer"
        disabled={true}
      />

      <span>{t('dtree.all')}</span>
    </div>

    <ModsDivider />

    <div className="flex items-center">
      <Checkbox
        checked={false}
        className="mr-1 cursor-pointer"
        disabled={true}
      />

      <span>{t('dtree.not')}</span>
    </div>
  </div>
))
