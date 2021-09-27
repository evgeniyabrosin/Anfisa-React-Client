import Checkbox from 'react-three-state-checkbox'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'

interface IProps {
  variants: any[]
  disabled: boolean
  currentGroup?: any[]
  handleCheckGroupItem?: (event: any, variant: string) => void
  inheritanceMode?: boolean
}

export const EditModalVariants = observer(
  ({ variants, disabled, currentGroup, handleCheckGroupItem }: IProps) => (
    <div className="flex-1 my-4 text-14">
      {variants ? (
        variants.map((variant: any) => (
          <div key={variant} className="flex items-center mb-2">
            {disabled ? (
              <Checkbox
                checked={true}
                disabled={true}
                className="-mt-0.5 mr-1 cursor-pointer"
              />
            ) : (
              <Checkbox
                checked={
                  currentGroup && currentGroup.length > 0
                    ? dtreeStore.selectedFilters.includes(variant[0])
                    : false
                }
                className="-mt-0.5 mr-1 cursor-pointer"
                onChange={(e: any) =>
                  handleCheckGroupItem &&
                  handleCheckGroupItem(e.target.checked, variant[0])
                }
              />
            )}

            <span className="text-black">{variant[0]}</span>

            <span className="text-grey-blue ml-2">
              {variant[1]} {t('dtree.variants')}
            </span>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center text-grey-blue">
          {t('dtree.noFilters')}
        </div>
      )}
    </div>
  ),
)
