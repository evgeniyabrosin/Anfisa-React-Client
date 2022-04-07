import { ChangeEvent, Fragment } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import { ModeTypes } from '@core/enum/mode-types-enum'
import { SubKinds } from '@core/enum/sub-kinds-enum'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { AllNotMods } from '@pages/filter/ui/query-builder/ui/all-not-mods'
import { DisabledVariantsAmount } from '../../../../query-builder/ui/disabled-variants-amount'
import { ModsDivider } from '../../../../query-builder/ui/mods-divider'
import modalInheritanceModeStore from '../modal-inheritance-mode.store'

interface IProps {
  problemGroups: string[]
  setProblemGroups: (e: boolean, group: string) => void
  selectedProblemGroups: string[]
  handleReset: () => void
  currentGroup: any
}

export const InheritanceModeContent = observer(
  ({
    problemGroups,
    setProblemGroups,
    selectedProblemGroups,
    handleReset,
  }: IProps) => {
    const { variants } = modalInheritanceModeStore

    const handleCheckGroupItem = (checked: boolean, name: string) => {
      if (checked) {
        dtreeStore.addSelectedFilter(name)
      } else {
        dtreeStore.removeSelectedFilter(name)
      }
    }

    return (
      <Fragment>
        <div className="flex items-center justify-between w-full mt-4 text-14">
          <div>{t('dtree.problemGroup')}</div>

          {problemGroups.map((group: string) => (
            <div key={group}>
              <Checkbox
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setProblemGroups(e.target.checked, group)
                }
                checked={selectedProblemGroups.includes(group)}
                className="mx-1 cursor-pointer"
              />
              <span>{group}</span>
            </div>
          ))}

          <Button
            onClick={handleReset}
            text="Reset"
            variant="secondary"
            className="h-4/5"
          />
        </div>

        <div className="flex justify-between w-full mt-4 -mb-5">
          <div className="text-14 text-grey-blue">
            {dtreeStore.selectedFilters.length} {t('dtree.selected')}
          </div>

          <div className="flex flex-col">
            <div className="flex">
              <div
                className="text-14 text-blue-bright cursor-pointer"
                onClick={() => modalInheritanceModeStore.setAllGroupVariants()}
              >
                {t('general.selectAll')}
              </div>

              <ModsDivider />

              <div
                className="text-14 text-blue-bright cursor-pointer"
                onClick={() =>
                  modalInheritanceModeStore.clearAllGroupVariants()
                }
              >
                {t('general.clearAll')}
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <AllNotMods
                groupSubKind={SubKinds.InheritanceZ}
                isAllModeDisabled={dtreeStore.selectedFilters.length < 2}
                isNotModeDisabled={!dtreeStore.selectedFilters.length}
                isAllModeChecked={
                  modalInheritanceModeStore.currentMode === ModeTypes.All
                }
                isNotModeChecked={
                  modalInheritanceModeStore.currentMode === ModeTypes.Not
                }
                toggleAllMode={() =>
                  modalInheritanceModeStore.setCurrentMode(ModeTypes.All)
                }
                toggleNotMode={() =>
                  modalInheritanceModeStore.setCurrentMode(ModeTypes.Not)
                }
              />
            </div>
          </div>
        </div>

        <DisabledVariantsAmount
          variants={variants}
          disabled={false}
          handleCheckGroupItem={handleCheckGroupItem}
        />
      </Fragment>
    )
  },
)
