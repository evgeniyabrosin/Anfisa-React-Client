import { ChangeEvent, ReactElement } from 'react'

import { t } from '@i18n'
import filterStore from '@store/filter'
import { Checkbox } from '@ui/checkbox/checkbox'
import { Loader } from '@components/loader'
import { IInheritanceModeVariantsProps } from '../inheritance-mode.interface'

export const InheritanceModeVariants = ({
  filteredVariants,
  selectedVariants,
  isFetching,
  handleSetVariants,
}: IInheritanceModeVariantsProps): ReactElement => (
  <div className="flex flex-col text-14">
    <>
      {isFetching ? (
        <Loader size="s" className="my-4" />
      ) : filteredVariants?.length > 0 ? (
        filteredVariants.map(([variantName, variantValue]) => (
          <Checkbox
            key={variantName}
            id={variantName}
            className="mb-4 h-4"
            checked={selectedVariants.includes(variantName)}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleSetVariants(e.target.checked, variantName)
              filterStore.setTouched(true)
            }}
          >
            <span>{variantName}</span>

            <span className="text-grey-blue ml-2">
              {variantValue} {t('dtree.variants')}
            </span>
          </Checkbox>
        ))
      ) : (
        <div className="flex justify-center items-center text-grey-blue my-2">
          {t('dtree.noFilters')}
        </div>
      )}
    </>
  </div>
)
