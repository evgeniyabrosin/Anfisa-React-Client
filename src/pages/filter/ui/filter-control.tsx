import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterMethodEnum } from '@core/enum/filter-method.enum'
import { t } from '@i18n'
import filterStore from '@store/filter'
import { DropDown } from '@ui/dropdown'

export const FilterControl = observer(
  (): ReactElement => (
    <div className="flex items-center w-full mt-5">
      <div>
        <span className="text-grey-blue text-14 font-bold mb-2">
          {t('filter.method')}
        </span>

        <DropDown
          options={[FilterMethodEnum.Refiner, FilterMethodEnum.Query]}
          value={filterStore.method}
          onSelect={args =>
            filterStore.setMethod(args.value as FilterMethodEnum)
          }
        />
      </div>
    </div>
  ),
)
