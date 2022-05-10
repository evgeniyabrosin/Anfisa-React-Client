import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Checkbox } from '@ui/checkbox/checkbox'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'

interface IProps {
  variants: any[]
  disabled: boolean
  isErrorVisible?: boolean
  handleCheckGroupItem?: (event: any, variant: string) => void
  inheritanceMode?: boolean
}

export const DisabledVariantsAmount = observer(
  ({ variants, disabled, isErrorVisible, handleCheckGroupItem }: IProps) => (
    <div className="my-5 text-14">
      {variants?.length > 0 && !isErrorVisible ? (
        variants.map((variant: any) => (
          <Checkbox
            key={variant}
            className="flex items-center py-1"
            disabled={disabled}
            checked={
              disabled ? true : dtreeStore.selectedFilters.includes(variant[0])
            }
            onChange={(e: any) => {
              !disabled &&
                handleCheckGroupItem &&
                handleCheckGroupItem(e.target.checked, variant[0])
              filterStore.setTouched(true)
            }}
          >
            <span
              className="text-black"
              data-testid={DecisionTreesResultsDataCy.variantsList}
            >
              {variant[0]}
            </span>

            <span className="text-grey-blue ml-2">
              {variant[1]} {t('dtree.variants')}
            </span>
          </Checkbox>
        ))
      ) : (
        <div className="flex justify-center items-center text-grey-blue">
          {t('dtree.noFilters')}
        </div>
      )}
    </div>
  ),
)
