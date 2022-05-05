import { observer } from 'mobx-react-lite'

import { SubKinds } from '@core/enum/sub-kinds-enum'
import { t } from '@i18n'
import { Checkbox } from '@ui/checkbox/checkbox'
import { ModsDivider } from './mods-divider'
interface IAllNotModsProps {
  isNotModeDisabled?: boolean
  isNotModeChecked?: boolean
  toggleNotMode?: () => void
  isAllModeDisabled?: boolean
  isAllModeChecked?: boolean
  toggleAllMode?: () => void
  groupSubKind?: string
}

export const AllNotMods = observer(
  ({
    isAllModeDisabled,
    isNotModeDisabled,
    isAllModeChecked,
    isNotModeChecked,
    toggleAllMode,
    toggleNotMode,
    groupSubKind,
  }: IAllNotModsProps) => {
    const isAllModeAvailable =
      groupSubKind === SubKinds.Multi || groupSubKind === SubKinds.InheritanceZ

    return (
      <div className="flex text-14 text-blue-bright">
        {isAllModeAvailable && (
          <>
            <Checkbox
              id={'all-mode-checkbox'}
              className="flex items-center"
              checked={isAllModeChecked ?? false}
              disabled={isAllModeDisabled}
              onChange={toggleAllMode}
            >
              {t('dtree.all')}
            </Checkbox>

            <ModsDivider />
          </>
        )}

        <Checkbox
          id={'not-mode-checkbox'}
          className="flex items-center"
          checked={isNotModeChecked ?? false}
          disabled={isNotModeDisabled}
          onChange={toggleNotMode}
        >
          {t('dtree.not')}
        </Checkbox>
      </div>
    )
  },
)
