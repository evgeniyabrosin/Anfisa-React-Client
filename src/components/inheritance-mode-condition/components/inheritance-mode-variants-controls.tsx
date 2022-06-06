import { ReactElement } from 'react'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { t } from '@i18n'
import { AllNotMods } from '@pages/filter/dtree/components/query-builder/ui/all-not-mods'
import { ModsDivider } from '@pages/filter/dtree/components/query-builder/ui/mods-divider'
import { IInheritanceModeVariantsControlsProps } from '../inheritance-mode.interface'

export const InheritanceModeVariantsControls = ({
  selectedVariants,
  selectAllVariants,
  clearAllVariants,
  attributeSubKind,
  mode,
  toggleMode,
}: IInheritanceModeVariantsControlsProps): ReactElement => (
  <div className="flex justify-between w-full mt-4 -mb-5">
    <div className="text-14 text-grey-blue">
      {selectedVariants.length} {t('dtree.selected')}
    </div>

    <div className="flex flex-col">
      <div className="flex">
        <div
          className="text-14 text-blue-bright cursor-pointer"
          onClick={selectAllVariants}
        >
          {t('general.selectAll')}
        </div>

        <ModsDivider />

        <div
          className="text-14 text-blue-bright cursor-pointer"
          onClick={clearAllVariants}
        >
          {t('general.clearAll')}
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <AllNotMods
          groupSubKind={attributeSubKind}
          isAllModeChecked={mode === ModeTypes.All}
          isNotModeChecked={mode === ModeTypes.Not}
          isAllModeDisabled={selectedVariants.length < 2}
          isNotModeDisabled={!selectedVariants.length}
          toggleAllMode={() => toggleMode(ModeTypes.All)}
          toggleNotMode={() => toggleMode(ModeTypes.Not)}
        />
      </div>
    </div>
  </div>
)
