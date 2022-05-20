import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Icon } from '@ui/icon'
import { Switch } from '@ui/switch'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { InputSearch } from '@components/input-search/input-search'

interface IQueryBuilderSearchProps {
  value: string
  onChange: (item: string) => void
  isFilter?: boolean
  isModal?: boolean
  isSubgroupItemSearch?: boolean
  showSwitcher?: boolean
  onSwitch?: (e: boolean) => void
  isSwitched?: boolean
}

export const QueryBuilderSearch = observer(
  ({
    value,
    onChange,
    isFilter,
    isModal,
    isSubgroupItemSearch,
    showSwitcher,
    onSwitch,
    isSwitched,
  }: IQueryBuilderSearchProps): ReactElement => {
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
      <div className="flex w-full items-center">
        <InputSearch
          className="flex-1"
          placeholder={t('filter.searchForAField')}
          value={value}
          onChange={e => {
            onChange(e.target.value)
          }}
        />

        {!isSubgroupItemSearch && (
          <div className="flex items-center justify-between pl-2 text-grey-blue">
            {showSwitcher && (
              <div className="mr-2 flex items-center">
                <Switch
                  isChecked={!!isSwitched}
                  onChange={(e: boolean) => onSwitch && onSwitch(e)}
                  className="mr-2"
                />

                <span className="text-sm">{t('filter.switcher')}</span>
              </div>
            )}

            <div className="mr-2">
              <Icon
                name="Expand"
                size={20}
                className="cursor-pointer hover:text-blue-bright"
                onClick={() => handleClick('collapse')}
                dataTestId={DecisionTreesResultsDataCy.expandAll}
              />
            </div>

            <div>
              <Icon
                name="Collapse"
                size={20}
                className="cursor-pointer hover:text-blue-bright"
                onClick={() => handleClick('expand')}
                dataTestId={DecisionTreesResultsDataCy.collapseAll}
              />
            </div>
          </div>
        )}
      </div>
    )
  },
)
