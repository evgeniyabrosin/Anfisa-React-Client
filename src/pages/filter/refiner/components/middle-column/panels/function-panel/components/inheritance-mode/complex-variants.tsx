import React, { ChangeEvent } from 'react'
import { observer } from 'mobx-react-lite'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { SubKinds } from '@core/enum/sub-kinds-enum'
import { t } from '@i18n'
import { Checkbox } from '@ui/checkbox/checkbox'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import inheritanceModeStore from './inheritance-mode.store'

interface IComplexVariantsProps {
  variantValues: string[]
  variants: [string, number][]
  handleChangeVariants: (
    e: ChangeEvent<HTMLInputElement>,
    variantName: string,
  ) => void
}

export const ComplexVariants = observer(
  ({
    variantValues,
    variants,
    handleChangeVariants,
  }: IComplexVariantsProps) => {
    return (
      <React.Fragment>
        <div className="flex items-center justify-between">
          <p className="text-14 leading-14px text-grey-blue">
            {variantValues.length} Selected
          </p>

          <span
            className="text-12 leading-14px text-blue-bright cursor-pointer ml-auto mr-2"
            onClick={inheritanceModeStore.selectAllVariants}
          >
            {t('general.selectAll')}
          </span>

          <span
            className="text-12 leading-14px text-blue-bright cursor-pointer"
            onClick={() => inheritanceModeStore.clearAllVariants(variantValues)}
          >
            {t('general.clearAll')}
          </span>
        </div>

        <div className="flex justify-between">
          <div>
            {variants.map(([variantName, variantValue]) => {
              return (
                <Checkbox
                  key={variantName}
                  checked={variantValues.includes(variantName)}
                  onChange={e => {
                    handleChangeVariants(e, variantName)
                  }}
                  className="flex items-center mt-4 text-14 leading-16px"
                >
                  <span>{variantName}</span>
                  <span className="text-grey-blue ml-1">{`(${variantValue})`}</span>
                </Checkbox>
              )
            })}
          </div>

          <div className="mt-2">
            <AllNotMods
              isAllModeDisabled={variantValues.length < 2}
              isNotModeDisabled={variantValues.length === 0}
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

        {variants.length === 0 && (
          <div className="flex justify-center w-full mt-2 text-14 text-grey-blue">
            {t('dtree.noFilters')}
          </div>
        )}
      </React.Fragment>
    )
  },
)
