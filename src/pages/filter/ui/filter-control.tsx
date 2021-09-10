import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterMethodEnum } from '@core/enum/filter-method.enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { DropDown } from '@ui/dropdown'
import { FilterControlQueryBuilder } from './filter-control-query-builder'
import { FilterControlRefiner } from './filter-control-refiner'
export const FilterControl = observer(
  (): ReactElement => {
    return (
      <div className="flex items-center w-full mt-5">
        <div className="flex flex-col">
          <span className="text-grey-blue text-14 font-bold mb-2">
            {t('filter.method')}
          </span>

          <DropDown
            options={[FilterMethodEnum.Query, FilterMethodEnum.Refiner]}
            value={filterStore.method}
            onSelect={args =>
              filterStore.setMethod(args.value as FilterMethodEnum)
            }
          />
        </div>

        <div className="h-full w-px bg-blue-lighter mx-3" />

        {filterStore.method === 'Filter Refiner' ? (
          <FilterControlRefiner />
        ) : (
          <FilterControlQueryBuilder />
        )}
      </div>
    )
  },
)
