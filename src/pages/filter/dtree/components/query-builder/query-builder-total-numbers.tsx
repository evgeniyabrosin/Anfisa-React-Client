import { ReactElement } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { formatNumber } from '@core/format-number'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'

export const QueryBuilderTotalNumbers = observer((): ReactElement => {
  const variants = toJS(datasetStore.dsInfo).total

  const { stepData, isTreeEmpty } = dtreeStore

  const stepIndex = stepData.findIndex(
    element => element.isActive || element.isReturnedVariantsActive,
  )

  const currentStep = stepData[stepIndex]
  const difference = currentStep?.difference
  const startFilterCounts = currentStep?.startFilterCounts

  const hasReturnedVariants = Boolean(difference)
  const hasStartVariants = Boolean(startFilterCounts)
  const shouldShowReturnedVariants = hasReturnedVariants && !isTreeEmpty

  const openTableModal = (isReturnedVariants = true) => {
    const hasEmptyStep = stepData.some(element => {
      if (!element.isFinalStep) {
        return element.groups.length === 0
      }
      return false
    })

    const indexForApi = dtreeStore.getStepIndexForApi(stepIndex)
    const nextStepIndex = isReturnedVariants ? indexForApi + 1 : indexForApi
    const fixedNextStepIndex = hasEmptyStep ? nextStepIndex - 1 : nextStepIndex

    dtreeStore.openModalViewVariants(fixedNextStepIndex)
  }

  const getDerivedVariants = (type: string) => {
    if (!dtreeStore.isCountsReceived) return '...'

    const sum = (prevElement: any, currElement: any) => {
      const prevNumber = Number.isInteger(prevElement) ? prevElement : 0
      const currNumber = Number.isInteger(currElement) ? currElement : 0

      return prevNumber + currNumber
    }

    const acceptedVariants = dtreeStore.stepData
      .map(step => !step.excluded && step.difference)
      .reduce(sum)

    const rejectedVariants = dtreeStore.stepData
      .map(step => step.excluded && step.difference)
      .reduce(sum)

    return type === 'excluded' ? rejectedVariants : acceptedVariants
  }

  return (
    <div className="flex items-center p-4 border-b border-grey-light justify-between">
      <div className="flex flex-wrap">
        <span className="font-bold text-2xl w-full">{t('dtree.results')}</span>

        <div className="flex items-center mt-1 text-sm font-medium">
          <span className="flex items-center">
            {t('ds.totalVariants')}

            {formatNumber(variants)}
          </span>

          <div className="w-[2px] mx-2 h-full rounded-md bg-grey-disabled" />

          {toJS(dtreeStore.stepData).length > 0 && (
            <>
              <span className="flex items-center">
                {t('dtree.acceptedVariants')}

                {formatNumber(getDerivedVariants('included') || 0)}
              </span>

              <div className="w-[2px] mx-2 h-full rounded-md bg-grey-disabled" />

              <span className="flex items-center">
                {t('dtree.rejectedVariants')}

                {formatNumber(getDerivedVariants('excluded') || 0)}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex">
        {shouldShowReturnedVariants && (
          <Button
            dataTestId={DecisionTreesResultsDataCy.viewReturnedVariants}
            onClick={() => openTableModal(true)}
            text={t('dtree.viewReturnedVariants')}
            variant="secondary"
            className="ml-auto  min-h-32"
          />
        )}

        {hasStartVariants && (
          <Button
            onClick={() => openTableModal(false)}
            text={t('dtree.viewVariants')}
            variant="secondary"
            className="ml-5 min-h-32"
          />
        )}
      </div>
    </div>
  )
})
