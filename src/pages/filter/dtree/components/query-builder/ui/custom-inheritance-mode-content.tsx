import { observer } from 'mobx-react-lite'

import { resetOptions } from '@core/resetOptions'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Select } from '@ui/select'
import { selectOptions } from '../../modals/modals-control-store'
import { AllNotMods } from './all-not-mods'
import { DisabledVariantsAmount } from './disabled-variants-amount'

interface IProps {
  problemGroups: string[]
  handleSetScenario: (group: string, e: string) => void
  selectStates: string[]
  handleReset: (e: string) => void
  resetValue?: string
  isNotModeChecked?: boolean
  toggleNotMode?: () => void
}

export const CustomInheritanceModeContent = observer(
  ({
    problemGroups,
    handleSetScenario,
    selectStates,
    handleReset,
    resetValue,
    isNotModeChecked,
    toggleNotMode,
  }: IProps) => {
    const variants =
      dtreeStore.statFuncData.variants ?? filterStore.statFuncData?.variants

    return (
      <>
        <div className="flex items-center justify-between w-full mt-4 text-14">
          <div>{t('dtree.scenario')}</div>

          {problemGroups.map((group: string, index: number) => (
            <div key={group}>
              <span>{group}</span>

              <Select
                onChange={(e: any) => handleSetScenario(group, e.target.value)}
                className="w-auto ml-1"
                options={selectOptions}
                value={selectStates[index]}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between w-full mt-4 text-14">
          <div className="flex w-1/2">
            <span>{t('dtree.reset')}</span>

            <Select
              onChange={(e: any) => handleReset(e.target.value)}
              className="w-full ml-2"
              options={resetOptions}
              value={resetValue}
              reset
            />
          </div>

          <AllNotMods
            isNotModeChecked={isNotModeChecked}
            isNotModeDisabled={variants ? variants.length === 0 : true}
            toggleNotMode={toggleNotMode}
          />
        </div>

        <DisabledVariantsAmount variants={variants} disabled={true} />
      </>
    )
  },
)