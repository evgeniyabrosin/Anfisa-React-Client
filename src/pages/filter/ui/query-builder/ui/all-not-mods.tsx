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
          {/* <div className="flex items-center">
            <Checkbox
              checked={isAllModeChecked ?? false}
              className="mr-1 cursor-pointer"
              disabled={isAllModeDisabled}
              onChange={toggleAllMode}
            />

            <span>{t('dtree.all')}</span>
          </div>*/}
          <Checkbox
            id="allModeCheckbox"
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

      {/*<div className="flex items-center">
        <Checkbox
          checked={isNotModeChecked ?? false}
          className="mr-1 cursor-pointer"
          disabled={isNotModeDisabled}
          onChange={toggleNotMode}
        />

        <span>{t('dtree.not')}</span>
      </div>*/}
      <Checkbox
        id="allNotModeCheckbox"
        className="flex items-center"
        checked={isNotModeChecked ?? false}
        disabled={isNotModeDisabled}
        onChange={toggleNotMode}
      >
        {t('dtree.not')}
      </Checkbox>
    </div>
  )
}
