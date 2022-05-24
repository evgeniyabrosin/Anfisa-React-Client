import cn, { Argument } from 'classnames'
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
  classname?: Argument
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
    classname,
  }: IAllNotModsProps) => {
    const isAllModeAvailable =
      groupSubKind === SubKinds.Multi || groupSubKind === SubKinds.InheritanceZ

    return (
      <div className={cn('flex text-14', classname)}>
        {isAllModeAvailable && (
          <>
            <Checkbox
              id="all-mode-checkbox"
              className={cn(
                'flex items-center text-center',
                isAllModeDisabled ? ' text-grey-blue' : 'text-blue-bright',
              )}
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
          id="not-mode-checkbox"
          className={cn(
            'flex items-center text-center',
            isNotModeDisabled ? ' text-grey-blue' : 'text-blue-bright',
          )}
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
