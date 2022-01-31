import { Fragment } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import { StatListType } from '@declarations'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { DisabledVariantsAmount } from './disabled-variants-amount'
import { ModsDivider } from './mods-divider'

interface IProps {
  attrData: StatListType
  handleProblemGroup: (e: boolean, group: string) => void
  problemGroupData: string[]
  handleReset: () => void
}

export const InheritanceModeContent = observer(
  ({ attrData, handleProblemGroup, problemGroupData, handleReset }: IProps) => {
    const variants = dtreeStore.statFuncData.variants

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

          {attrData.family.map((group: string) => (
            <div key={group}>
              <Checkbox
                onChange={(e: any) =>
                  handleProblemGroup(e.target.checked, group)
                }
                checked={
                  problemGroupData
                    ? problemGroupData.includes(group)
                    : attrData.affected.includes(group)
                }
                className="mx-1 cursor-pointer"
              />
              <span>{group}</span>
            </div>
          ))}

          <Button
            onClick={handleReset}
            text="Reset"
            variant={'secondary'}
            className="h-4/5"
          />
        </div>

        <div className="flex justify-between w-full mt-4">
          <div className="text-14 text-grey-blue">
            {dtreeStore.selectedFilters.length} {t('dtree.selected')}
          </div>

          <div className="flex">
            <div
              className="text-14 text-blue-bright cursor-pointer"
              onClick={() => alert('This function is not ready yet')}
            >
              {t('general.selectAll')}
            </div>

            <ModsDivider />

            <div
              className="text-14 text-blue-bright cursor-pointer"
              onClick={() => alert('This function is not ready yet')}
            >
              {t('general.clearAll')}
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
