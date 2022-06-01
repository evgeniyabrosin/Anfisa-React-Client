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
    const { currentMode, setCurrentMode } = inheritanceModeStore
    const selectedGroup = !!variants.length

    return (
      <>
        <div className="flex items-center justify-between mt-0.5">
          <div className="text-14 leading-16px font-bold text-grey-blue flex">
            {t('filter.inheritanceMode')}
            {selectedGroup && (
              <p className="ml-2 text-14 leading-14px text-grey-blue font-normal">
                ({variantValues.length} Selected)
              </p>
            )}
          </div>

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

        {selectedGroup && (
          <div className="flex flex-1 justify-between my-3">
            <div className="text-14 leading-4 flex flex-col">
              {variants.map(([variantName, variantValue]) => (
                <Checkbox
                  key={variantName}
                  id={variantName + variantValue}
                  checked={variantValues.includes(variantName)}
                  onChange={e => {
                    handleChangeVariants(e, variantName)
                  }}
                  className="mb-4 last:mb-0"
                >
                  <span>{variantName}</span>

                  <span className="text-grey-blue ml-1">{`(${variantValue})`}</span>
                </Checkbox>
              ))}
            </div>

            <div>
              <AllNotMods
                isAllModeDisabled={variantValues.length < 2}
                isNotModeDisabled={!variantValues.length}
                isAllModeChecked={currentMode === ModeTypes.All}
                isNotModeChecked={currentMode === ModeTypes.Not}
                toggleAllMode={() => setCurrentMode(ModeTypes.All)}
                toggleNotMode={() => setCurrentMode(ModeTypes.Not)}
                groupSubKind={SubKinds.InheritanceZ}
              />
            </div>
          </div>
        )}

        {!selectedGroup && (
          <div className="flex flex-1 items-center justify-center w-full mt-2 text-14 text-grey-blue">
            {t('dtree.noFilters')}
          </div>
        )}
      </>
    )
  },
)
