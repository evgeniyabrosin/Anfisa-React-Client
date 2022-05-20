import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'

interface IEnumModsProps {
  clearAllVariants: () => void
  selectAllVariants: () => void
}

export const EnumMods = observer(
  ({ clearAllVariants, selectAllVariants }: IEnumModsProps): ReactElement => (
    <div className="flex">
      <div
        className="cursor-pointer text-blue-bright"
        onClick={selectAllVariants}
      >
        {t('general.selectAll')}
      </div>

      <div
        className="cursor-pointer text-blue-bright ml-3"
        onClick={clearAllVariants}
      >
        {t('general.clearAll')}
      </div>
    </div>
  ),
)
