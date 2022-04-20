import { Fragment, ReactElement } from 'react'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { formatNumber } from '@core/format-number'
import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'

export const QueryBuilderTotalNumbers = observer((): ReactElement => {
  const variants = toJS(dirinfoStore.dsinfo).total

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
    const hasEmptyStep = stepData.some(element => element.groups.length === 0)

    const indexForApi = dtreeStore.getStepIndexForApi(stepIndex)
    const nextStepIndex = isReturnedVariants ? indexForApi + 1 : indexForApi
    const fixedNextStepIndex = hasEmptyStep ? nextStepIndex - 1 : nextStepIndex

    dtreeStore.openTableModal(fixedNextStepIndex)
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
    <div className="flex items-center p-4 border-b border-grey-light bg-blue-dark justify-between">
      <div className="flex flex-wrap">
        <span className="font-bold text-white w-full">
          {t('dtree.results')}
        </span>

        <span className="text-12 leading-14px text-grey-blue mt-2">
          {t('ds.totalVariants')}
          {formatNumber(variants)}
        </span>

        {toJS(dtreeStore.stepData).length > 0 && (
          <Fragment>
            <div className="text-12 leading-14px text-grey-blue mt-2 ml-2">
              <span>{t('dtree.acceptedVariants')}</span>

              <span>{formatNumber(getDerivedVariants('included') || 0)}</span>
            </div>

            <div className="text-12 leading-14px text-grey-blue mt-2 ml-2">
              <span>{t('dtree.rejectedVariants')}</span>

              <span>{formatNumber(getDerivedVariants('excluded') || 0)}</span>
            </div>
          </Fragment>
        )}
      </div>
      <div className="flex">
        {shouldShowReturnedVariants && (
          <Button
            dataTestId={DecisionTreesResultsDataCy.viewReturnedVariants}
            onClick={() => openTableModal(true)}
            text={t('dtree.viewReturnedVariants')}
            variant="secondary-dark"
            className="ml-auto"
          />
        )}

        {hasStartVariants && (
          <Button
            onClick={() => openTableModal(false)}
            text={t('dtree.viewVariants')}
            variant="secondary-dark"
            className="ml-5"
          />
        )}
      </div>
    </div>
  )
})
