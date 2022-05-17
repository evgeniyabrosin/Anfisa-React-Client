import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Button } from '@ui/button'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { QueryBuilderResultsNumbers } from './query-builder-results-numbers'

export const QueryBuilderResults = observer((): ReactElement => {
  const { stepData, isTreeEmpty } = dtreeStore

  const stepIndex = stepData.findIndex(
    element => element.isActive || element.isReturnedVariantsActive,
  )

  const currentStep = stepData[stepIndex]

  const hasReturnedVariants = currentStep?.returnPointIndex != null
  const hasStartVariants = currentStep?.conditionPointIndex != null
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

  return (
    <div className="flex items-center p-4 border-b border-grey-light justify-between">
      <div>
        <div className="font-bold text-2xl w-full">{t('dtree.results')}</div>
        <QueryBuilderResultsNumbers className="mt-1" />
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
