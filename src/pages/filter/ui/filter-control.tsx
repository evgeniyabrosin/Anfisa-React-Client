import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterMethodEnum } from '@core/enum/filter-method.enum'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Button } from '@ui/button'
import { DropDown } from '@ui/dropdown'
import { FilterControlQueryBuilder } from './filter-control-query-builder'
import { FilterControlRefiner } from './filter-control-refiner'
export const FilterControl = observer(
  (): ReactElement => {
    return (
      <Fragment>
        <div className="flex items-center w-full mt-5">
          {filterStore.method === 'Filter Refiner' ? (
            <FilterControlRefiner />
          ) : (
            <FilterControlQueryBuilder />
          )}
        </div>

        <div className="flex items-center w-full mt-3">
          <div className="flex items-center">
            <span className="text-grey-blue text-14 font-bold mr-2">
              {t('filter.method')}
            </span>

            <DropDown
              options={[FilterMethodEnum.Query, FilterMethodEnum.Refiner]}
              value={filterStore.method}
              onSelect={args =>
                filterStore.setMethod(args.value as FilterMethodEnum)
              }
            />

            {filterStore.method === 'Query builder' && (
              <Button
                text="Text editor"
                className="ml-2 hover:bg-blue-bright"
                hasBackground={false}
                onClick={() => dtreeStore.openModalTextEditor()}
              />
            )}
          </div>
        </div>
      </Fragment>
    )
  },
)
