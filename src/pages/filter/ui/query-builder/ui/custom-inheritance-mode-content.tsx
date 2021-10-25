import { Fragment } from 'react'
import { observer } from 'mobx-react-lite'

import { StatListType } from '@declarations'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Select } from '@ui/select'
import { AllNotModalMods } from './all-not-modal-mods'
import { EditModalVariants } from './edit-modal-variants'
import { selectOptions } from './modal-edit-custom-inheritance-mode'

interface IProps {
  attrData: StatListType
  resetData: StatListType
  handleSetScenario: (group: string, e: string) => void
  selectStates: string[]
  handleReset: (e: string) => void
}

export const CustomInheritanceModeContent = observer(
  ({
    attrData,
    resetData,
    handleSetScenario,
    selectStates,
    handleReset,
  }: IProps) => {
    const variants = dtreeStore.statFuncData.variants

    return (
      <Fragment>
        <div className="flex items-center justify-between w-full mt-4 text-14">
          <div>{t('dtree.scenario')}</div>

          {attrData.family.map((group: string, index: number) => (
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
              options={resetData.available}
              onChange={(e: any) => handleReset(e.target.value)}
              className="w-full ml-2"
              reset
            />
          </div>

          <AllNotModalMods />
        </div>

        <EditModalVariants variants={variants} disabled={true} />
      </Fragment>
    )
  },
)
