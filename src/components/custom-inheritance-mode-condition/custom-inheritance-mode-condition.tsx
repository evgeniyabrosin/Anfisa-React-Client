import { ReactElement, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { FuncStepTypesEnum } from '@core/enum/func-step-types-enum'
import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { Checkbox } from '@ui/checkbox/checkbox'
import { Select } from '@ui/select'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { Loader } from '@components/loader'
import { InheritanceModeSelect } from '@pages/filter/dtree/components/query-builder/components/inheritance-mode-select'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { DividerHorizontal } from '@pages/filter/refiner/components/middle-column/components/divider-horizontal'
import { IScenario } from '@service-providers/common'
import { ICustomInheritanceModeConditionProps } from './custom-inheritance-mode.interface'
import {
  getNewScenario,
  getSelectValues,
  handleSetComplexScenario,
} from './custom-inheritance-mode.utils'

const selectOptions = ['--', '0', '0-1', '1', '1-2', '2']

export const CustomInheritanceModeCondition = observer(
  ({
    problemGroups,
    initialScenario,
    initialMode,
    attributeSubKind,
    statFuncStore,
    controls,
  }: ICustomInheritanceModeConditionProps): ReactElement => {
    const { variants } = statFuncStore

    const [mode, setMode] = useState(initialMode)

    const [preparedValue, setPreparedValue] = useState<string>('')

    const [scenario, setScenario] = useState<IScenario>(initialScenario || {})

    const [selectValues, setSelectValues] = useState<string[]>([])

    const toggleMode = (mode: ModeTypes) => {
      setMode(currentMode => (currentMode === mode ? undefined : mode))

      filterStore.setTouched(true)
    }

    const handleSetPreparedValue = (preparedValue: string) => {
      setPreparedValue(preparedValue)

      handleSetComplexScenario({
        preparedValue,
        problemGroups,
        setScenario,
      })

      filterStore.setTouched(true)
    }

    const handleSetSingleScenario = (index: number, value: string) => {
      const clonedSelectValues = [...selectValues]
      clonedSelectValues[index] = value

      const newScenario = getNewScenario(clonedSelectValues, problemGroups)

      setScenario(newScenario)

      setPreparedValue('')

      filterStore.setTouched(true)
    }

    useEffect(() => {
      statFuncStore.setQuery({
        unit: FuncStepTypesEnum.CustomInheritanceMode,
        param: JSON.stringify({ scenario }),
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scenario])

    useEffect(() => {
      setSelectValues(getSelectValues(scenario, problemGroups))
    }, [problemGroups, scenario])

    return (
      <>
        <div className="text-14 leading-16px font-medium text-grey-blue mt-3 mb-2.5">
          {t('dtree.scenario')}
        </div>

        <div className="flex items-center justify-between w-full text-14">
          {problemGroups.map((group: string, index: number) => (
            <div key={group}>
              <span>{group}</span>

              <Select
                onChange={e => handleSetSingleScenario(index, e.target.value)}
                className="w-auto ml-2 pl-2 pr-3 py-1 bg-white"
                options={selectOptions}
                value={selectValues[index]}
              />
            </div>
          ))}
        </div>

        <DividerHorizontal />

        <InheritanceModeSelect
          resetValue={preparedValue}
          handleReset={handleSetPreparedValue}
        />

        <DividerHorizontal />

        <div className="flex-1 flex justify-between items-center">
          {statFuncStore.isFetching ? (
            <Loader size="s" className="h-6 mb-4" />
          ) : variants?.length ? (
            <Checkbox
              id={variants[0][1]}
              className="mb-4"
              disabled={true}
              checked={true}
            >
              <span data-testid={DecisionTreesResultsDataCy.variantsList}>
                True
              </span>

              <span className="text-grey-blue ml-2">
                {variants[0][1]} {t('dtree.variants')}
              </span>
            </Checkbox>
          ) : (
            <div className="flex justify-center mb-4 items-center text-grey-blue">
              {t('dtree.noFilters')}
            </div>
          )}

          <div className="mb-4">
            <AllNotMods
              groupSubKind={attributeSubKind}
              isNotModeChecked={mode === ModeTypes.Not}
              isNotModeDisabled={!variants?.length}
              toggleNotMode={() => toggleMode(ModeTypes.Not)}
            />
          </div>
        </div>

        {controls &&
          controls({
            hasErrors: !variants?.length,
            clearValue: () => setPreparedValue(''),
            param: { scenario },
            mode,
          })}
      </>
    )
  },
)
