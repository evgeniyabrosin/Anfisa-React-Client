import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Icon } from '@ui/icon'
import { InputSearch } from '@components/input-search'

interface IProps {
  value: string
  onChange: (item: string) => void
  isFilter?: boolean
  isModal?: boolean
  isSubgroupItemSearch?: boolean
}

export const QueryBuilderSearch = observer(
  ({
    value,
    onChange,
    isFilter,
    isModal,
    isSubgroupItemSearch,
  }: IProps): ReactElement => {
    const handleClick = (operation: string) => {
      if (isFilter) {
        operation === 'expand' && dtreeStore.expandFilterContent()
        operation === 'collapse' && dtreeStore.collapseFilterContent()
      }

      if (isModal) {
        operation === 'expand' && dtreeStore.expandFilterModalContent()
        operation === 'collapse' && dtreeStore.collapseFilterModalContent()
      }

      if (!isModal && !isFilter) {
        operation === 'expand' && dtreeStore.expandResultsContent()
        operation === 'collapse' && dtreeStore.collapseResultsContent()
      }
    }

    return (
      <Fragment>
        <InputSearch
          className="w-full"
          placeholder={t('filter.searchForAField')}
          value={value}
          filter
          onChange={e => {
            onChange(e.target.value)
          }}
        />

        {!isSubgroupItemSearch && (
          <div className="flex items-center justify-between pl-2 text-grey-blue">
            <div className="mr-1">
              <Icon
                name="Expand"
                size={20}
                className="cursor-pointer hover:text-blue-bright"
                onClick={() => handleClick('collapse')}
              />
            </div>

            <div>
              <Icon
                name="Collapse"
                size={20}
                className="cursor-pointer hover:text-blue-bright"
                onClick={() => handleClick('expand')}
              />
            </div>
          </div>
        )}
      </Fragment>
    )
  },
)
