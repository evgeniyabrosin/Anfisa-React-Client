import { ChangeEvent, ReactElement } from 'react'
import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import modalFiltersStore from '../modal-filters.store'

export const FiltersList = observer((): ReactElement => {
  const { groupsPage } = modalFiltersStore

  return (
    <div className="flex-1 overflow-y-auto my-4 text-14">
      {groupsPage ? (
        groupsPage.map((variant: [string, number]) => {
          const variantName = variant[0]
          const variantNumbers = variant[1]

          return (
            variantNumbers !== 0 && (
              <div key={variantName} className="flex items-center mb-2 text-14">
                <Checkbox
                  checked={dtreeStore.selectedFilters.includes(variantName)}
                  className="-mt-0.5 mr-1 cursor-pointer"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    modalFiltersStore.selectCheckGroupItem(
                      e.target.checked,
                      variantName,
                    )
                  }
                />

                <span className="text-black">{variantName}</span>

                <span className="text-grey-blue ml-2">
                  {variantNumbers} {t('dtree.variants')}
                </span>
              </div>
            )
          )
        })
      ) : (
        <div className="flex justify-center items-center text-14 text-grey-blue">
          {t('dtree.noFilters')}
        </div>
      )}
    </div>
  )
})
