import { Fragment, ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { useFilterQueryBuilder } from '@core/hooks/use-filter-query-builder'
import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { GlbPagesNames } from '@glb/glb-names'
import { DeferRender } from '@utils/deferRender'
import { QueryBuilderSearch } from '../query-builder-search'
import { QueryBuilderSubgroup } from './query-builder-subgroup'

export const QueryBuilderGroups = observer((): ReactElement => {
  const { filterValue, setFilterValue, filteredQueryBuilder } =
    useFilterQueryBuilder()

  const groupNames = Object.keys(filteredQueryBuilder)
  const subGroupData = Object.values(filteredQueryBuilder)

  const chunkSize = 2
  let groupsCount = Math.trunc(groupNames.length / 2)
  let requestIdleCallbackIds: number[] = []

  function decrement(id: number) {
    requestIdleCallbackIds.push(id)
    groupsCount--

    if (groupsCount === 0) {
      requestIdleCallbackIds.forEach(requestId => {
        window.cancelAnimationFrame(requestId)
      })
      requestIdleCallbackIds = []
    }
  }

  const activeStepIndex = dtreeStore.stepData.findIndex(
    step => step.isActive || step.isReturnedVariantsActive,
  )

  const activeStep = dtreeStore.stepData[activeStepIndex]

  const returnedVariantsPrompt = activeStep?.excluded
    ? ` (${t('dtree.excludedVariants')})`
    : ` (${t('dtree.includedVariants')})`

  const shouldShowVariantsPrompt = Boolean(
    activeStep?.isReturnedVariantsActive || activeStep?.isFinalStep,
  )

  return (
    <Fragment>
      <div className="relative pt-4 px-4 w-1/3 bg-blue-lighter">
        <div id="input" className="flex mb-3 w-full static">
          <QueryBuilderSearch
            value={filterValue}
            onChange={(value: string) => setFilterValue(value)}
            isFilter
          />
        </div>

        {filterStore.method === GlbPagesNames.Filter && (
          <div className="flex items-center justify-between w-full h-8 mb-2">
            <div className="text-blue-bright font-medium">
              {activeStep &&
                (activeStep.isFinalStep
                  ? t('dtree.showingResultsForFinalStep')
                  : t('dtree.showingResultsForStep') + ' ' + activeStep.step)}

              {shouldShowVariantsPrompt && returnedVariantsPrompt}
            </div>
          </div>
        )}

        <div
          className="overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 300px)' }}
        >
          <DeferRender chunkSize={chunkSize} renderId={decrement}>
            {groupNames.map((groupName, index) => (
              <QueryBuilderSubgroup
                groupName={groupName}
                subGroupData={subGroupData[index]}
                key={groupName}
                changeIndicator={dtreeStore.filterChangeIndicator}
                isContentExpanded={dtreeStore.isFilterContentExpanded}
              />
            ))}
          </DeferRender>
        </div>
      </div>
    </Fragment>
  )
})
