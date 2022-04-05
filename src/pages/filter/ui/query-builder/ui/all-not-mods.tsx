import Checkbox from 'react-three-state-checkbox'

import { SubKinds } from '@core/enum/sub-kinds-enum'
import { t } from '@i18n'
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

export const AllNotMods = ({
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
          <div className="flex items-center">
            <Checkbox
              checked={isAllModeChecked ?? false}
              className="mr-1 cursor-pointer"
              disabled={isAllModeDisabled}
              onChange={toggleAllMode}
            />

            <span>{t('dtree.all')}</span>
          </div>

          <ModsDivider />
        </>
      )}

      <div className="flex items-center">
        <Checkbox
          checked={isNotModeChecked ?? false}
          className="mr-1 cursor-pointer"
          disabled={isNotModeDisabled}
          onChange={toggleNotMode}
        />

        <span>{t('dtree.not')}</span>
      </div>
    </div>
  )
}
