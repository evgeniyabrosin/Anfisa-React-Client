import { observer } from 'mobx-react-lite'

import { resetOptions } from '@core/resetOptions'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Checkbox } from '@ui/checkbox/checkbox'
import { Select } from '@ui/select'
import { DividerHorizontal } from '@pages/filter/refiner/components/middle-column/components/divider-horizontal'
import { selectOptions } from '../../modals/modals-control-store'
import { AllNotMods } from './all-not-mods'
import { DisabledVariantsAmount } from './disabled-variants-amount'

interface ICustomInheritanceModeContentProps {
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
  }: ICustomInheritanceModeContentProps) => {
    const variants =
      dtreeStore.statFuncData.variants ?? filterStore.statFuncData?.variants

    return (
      <>
        <div className="text-14 leading-16px font-medium text-grey-blue mt-0.5 mb-2.5">
          {t('dtree.scenario')}
        </div>
        <div className="flex items-center justify-between w-full mt-4 text-14">
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

        <DividerHorizontal />

        <div className="flex justify-between">
          <span className="text-14 leading-16px font-medium text-grey-blue mt-0.5 mb-2.5">
            {t('filter.inheritanceMode')}
          </span>

          <span
            className="text-12 text-blue-bright leading-14px cursor-pointer"
            onClick={() => handleReset('empty')}
          >
            Reset
          </span>
        </div>

        <div>
          {resetOptions.map(option => (
            <Checkbox
              key={option}
              id={option}
              onChange={() => handleReset(option)}
              checked={resetValue === option}
              className="mb-2 last:mb-0"
            >
              {option}
            </Checkbox>
          ))}
        </div>

        <DividerHorizontal />

        <div className="flex-1 flex justify-between">
          <DisabledVariantsAmount
            variants={variants}
            disabled={true}
            classname="h-fit"
          />
          <div>
            <AllNotMods
              isNotModeChecked={isNotModeChecked}
              isNotModeDisabled={!variants?.length}
              toggleNotMode={toggleNotMode}
            />
          </div>
        </div>
      </>
    )
  },
)
