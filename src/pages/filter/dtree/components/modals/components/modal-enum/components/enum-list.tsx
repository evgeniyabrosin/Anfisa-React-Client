import { ChangeEvent, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Checkbox } from '@ui/checkbox/checkbox'
import modalFiltersStore from '../modal-enum.store'

export const EnumList = observer((): ReactElement => {
  const { groupsPage } = modalFiltersStore

  return (
    <div className="flex-1 overflow-y-auto my-4 text-14">
      {groupsPage ? (
        groupsPage.map((variant: [string, number]) => {
          const variantName = variant[0]
          const variantNumbers = variant[1]

          return (
            variantNumbers !== 0 && (
              <Checkbox
                key={variantName}
                id={variant[0]}
                checked={dtreeStore.selectedFilters.includes(variantName)}
                className="mb-2 text-14"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  modalFiltersStore.selectCheckGroupItem(
                    e.target.checked,
                    variantName,
                  )
                }
              >
                <span>{variantName}</span>

                <span className="text-grey-blue ml-2">
                  {variantNumbers} {t('dtree.variants')}
                </span>
              </Checkbox>
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
