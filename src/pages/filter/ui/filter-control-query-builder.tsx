import { Fragment, ReactElement, useState } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { FilterList } from '@declarations'
import { ActionFilterEnum } from '@core/enum/action-filter.enum'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { DropDown } from '@ui/dropdown'
import { PopperButton } from '@components/popper-button'
import { DatasetCreationButton } from '@pages/ws/ui/dataset-creation-button'
import { DtreeModal } from './dtree-modal'
import { FilterButton } from './filter-button'

export const FilterControlQueryBuilder = observer(
  (): ReactElement => {
    const [activeTree, setActiveTree] = useState('')

    const trees: string[] = get(dtreeStore, 'dtreeList', []).map(
      (preset: FilterList) => preset.name,
    )

    const handleClick = () => {
      if (filterStore.actionName === ActionFilterEnum.Load) {
        dtreeStore.fetchDtreeAsync(activeTree)
      }

      filterStore.resetActionName()
    }

    return (
      <Fragment>
        <div className="flex items-center border-black">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-grey-blue text-14 font-bold">
                {t('filter.decisionTrees')}
              </span>
            </div>

            <DropDown
              options={trees}
              value={activeTree}
              onSelect={args => setActiveTree(args.value)}
            />
          </div>

          {activeTree && (
            <PopperButton
              ButtonElement={FilterButton}
              ModalElement={DtreeModal}
            />
          )}

          {filterStore.actionName && activeTree && (
            <Fragment>
              <Button
                text={t('general.apply')}
                size="md"
                onClick={handleClick}
                className="text-white mt-auto ml-2"
              />

              <Button
                text={t('general.cancel')}
                hasBackground={false}
                size="md"
                onClick={() => filterStore.resetActionName()}
                className="text-white mt-auto ml-2"
              />
            </Fragment>
          )}
        </div>

        <DatasetCreationButton />
      </Fragment>
    )
  },
)
