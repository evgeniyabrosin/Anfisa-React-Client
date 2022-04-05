import React, { ChangeEvent } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { SubKinds } from '@core/enum/sub-kinds-enum'
import { t } from '@i18n'
import { AllNotMods } from '@pages/filter/ui/query-builder/ui/all-not-mods'
import inheritanceModeStore from './inheritance-mode.store'

interface IComplexVariantsProps {
  variantsValues: string[]
  problemGroupValues: string[]
  filteredComplexVariants: [string, number][]
  handleChangeVariants: (
    e: ChangeEvent<HTMLInputElement>,
    variantName: string,
  ) => void
}

export const ComplexVariants = observer(
  ({
    variantsValues,
    problemGroupValues,
    filteredComplexVariants,
    handleChangeVariants,
  }: IComplexVariantsProps) => {
    return (
      <React.Fragment>
        <div className="flex items-center justify-between">
          <p className="text-14 leading-14px text-grey-blue">
            {variantsValues.length} Selected
          </p>

          <span
            className="text-12 leading-14px text-blue-bright cursor-pointer ml-auto mr-2"
            onClick={() =>
              inheritanceModeStore.handleSelectAllVariants(problemGroupValues)
            }
          >
            {t('general.selectAll')}
          </span>

          <span
            className="text-12 leading-14px text-blue-bright cursor-pointer"
            onClick={() =>
              inheritanceModeStore.handleResetVariantsLocally(variantsValues)
            }
          >
            {t('general.clearAll')}
          </span>
        </div>

        <div className="flex justify-between">
          <div>
            {filteredComplexVariants.map(([variantName, variantValue]) => {
              return (
                <div key={variantName} className="flex items-center mt-4">
                  <Checkbox
                    checked={variantsValues.includes(variantName)}
                    onChange={e => {
                      handleChangeVariants(e, variantName)
                    }}
                  />
                  <span className="text-14 leading-16px ml-2">
                    {variantName}
                  </span>
                  <span className="text-14 leading-16px text-grey-blue ml-1">{`(${variantValue})`}</span>
                </div>
              )
            })}
          </div>

          <div className="mt-1">
            <AllNotMods
              isAllModeDisabled={variantsValues.length < 2}
              isNotModeDisabled={variantsValues.length === 0}
              isAllModeChecked={
                inheritanceModeStore.currentMode === ModeTypes.All
              }
              isNotModeChecked={
                inheritanceModeStore.currentMode === ModeTypes.Not
              }
              toggleAllMode={() =>
                inheritanceModeStore.setCurrentMode(ModeTypes.All)
              }
              toggleNotMode={() =>
                inheritanceModeStore.setCurrentMode(ModeTypes.Not)
              }
              groupSubKind={SubKinds.InheritanceZ}
            />
          </div>
        </div>

        {filteredComplexVariants.length === 0 && (
          <div className="flex justify-center w-full mt-2 text-14 text-grey-blue">
            Out of choice. Select problem group.
          </div>
        )}
      </React.Fragment>
    )
  },
)
