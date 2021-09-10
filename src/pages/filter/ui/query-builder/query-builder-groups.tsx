import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { QueryBuilderSearch } from './query-builder-search'
import { QueryBuilderSubgroup } from './query-builder-subgroup'

export const QueryBuilderGroups = observer(
  (): ReactElement => {
    const groupNames = Object.keys(dtreeStore.getQueryBuilder)

    return (
      <Fragment>
        {dtreeStore.isFiltersLoading && (
          <div className="absolute z-50 w-1/3 h-full bg-grey-blue opacity-30" />
        )}

        <div className="relative pt-4 px-4 w-1/3 bg-blue-lighter">
          <div id="input" className="flex mb-3 w-full static">
            <QueryBuilderSearch
              value={dtreeStore.searchFieldFilterList}
              onChange={dtreeStore.addSearchFieldFilterList}
              isFilter
            />
          </div>

          <div className="flex items-center justify-between w-full h-8 mb-2">
            <div className="text-blue-bright font-medium">
              {t('dtree.showingResultsForStep')} {dtreeStore.stepData.length}
            </div>

            <Button
              className="hover:bg-blue-bright"
              text={t('dtree.addStep')}
              hasBackground={false}
              disabled={true}
              // onClick={() => dtreeStore.addStep(index)}
            />
          </div>

          <div className="h-full overflow-y-scroll">
            {groupNames.map((groupName, index) => (
              <QueryBuilderSubgroup
                groupName={groupName}
                index={index}
                key={groupName}
                changeIndicator={dtreeStore.filterChangeIndicator}
                isContentExpanded={dtreeStore.isFilterContentExpanded}
              />
            ))}
          </div>
        </div>
      </Fragment>
    )
  },
)
