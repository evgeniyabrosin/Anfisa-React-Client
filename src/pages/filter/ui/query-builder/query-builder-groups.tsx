import { Fragment, ReactElement } from 'react'
import { toast } from 'react-toastify'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { createEmptyStep } from '@utils/createEmptyStep'
import { DeferRender } from '@utils/deferRender'
import { QueryBuilderSearch } from './query-builder-search'
import { QueryBuilderSubgroup } from './query-builder-subgroup'

export const QueryBuilderGroups = observer(
  (): ReactElement => {
    const groupNames = Object.keys(dtreeStore.getQueryBuilder)
    const subGroupData = Object.values(dtreeStore.getQueryBuilder)
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
    const isDisabled = activeStep.groups.length === 0 && !activeStep.isFinalStep

    const createStep = () => {
      if (activeStepIndex === -1) {
        toast.error(t('dtree.chooseActiveStep'), {
          position: 'bottom-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        })

        return
      }

      const currentStepIndex = activeStep.isFinalStep
        ? activeStepIndex - 1
        : activeStepIndex

      createEmptyStep(currentStepIndex, 'AFTER')
    }

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
              value={dtreeStore.filterValue}
              onChange={(e: string) => dtreeStore.setFilterValue(e)}
              isFilter
            />
          </div>

          <div className="flex items-center justify-between w-full h-8 mb-2">
            <div className="text-blue-bright font-medium">
              {activeStep &&
                (activeStep.isFinalStep
                  ? t('dtree.showingResultsForFinalStep')
                  : t('dtree.showingResultsForStep') + ' ' + activeStep.step)}

              {shouldShowVariantsPrompt && returnedVariantsPrompt}
            </div>

            <Button
              className="hover:bg-blue-bright"
              text={t('dtree.addStep')}
              hasBackground={false}
              disabled={isDisabled}
              onClick={createStep}
            />
          </div>

          <div className="h-full overflow-y-auto">
            <DeferRender chunkSize={chunkSize} renderId={decrement}>
              {groupNames.map((groupName, index) => (
                <QueryBuilderSubgroup
                  groupName={groupName}
                  subGroupData={subGroupData[index]}
                  key={groupName + dtreeStore.queryBuilderRenderKey}
                  changeIndicator={dtreeStore.filterChangeIndicator}
                  isContentExpanded={dtreeStore.isFilterContentExpanded}
                />
              ))}
            </DeferRender>
          </div>
        </div>
      </Fragment>
    )
  },
)
