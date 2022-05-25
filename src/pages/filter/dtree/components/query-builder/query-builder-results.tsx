import { ReactElement } from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import stepStore from '@store/dtree/step.store'
import { Button } from '@ui/button'
import { DecisionTreesResultsDataCy } from '@components/data-testid/decision-tree-results.cy'
import { QueryBuilderResultsNumbers } from './query-builder-results-numbers'

interface IQueryBuilderResultsProps {
  className?: string
}

export const QueryBuilderResults = observer(
  ({ className }: IQueryBuilderResultsProps): ReactElement => {
    const { isTreeEmpty } = dtreeStore

    const stepIndex = stepStore.steps.findIndex(
      element => element.isActive || element.isReturnedVariantsActive,
    )

    const currentStep = stepStore.steps[stepIndex]

    const hasReturnedVariants = currentStep?.returnPointIndex != null
    const hasStartVariants = currentStep?.conditionPointIndex != null
    const shouldShowReturnedVariants = hasReturnedVariants && !isTreeEmpty

    const openTableModal = (isReturnedVariants = true) => {
      const hasEmptyStep = stepStore.steps.some(element => {
        if (!element.isFinalStep) {
          return element.groups.length === 0
        }
        return false
      })

      const indexForApi = dtreeStore.getStepIndexForApi(stepIndex)
      const nextStepIndex = isReturnedVariants ? indexForApi + 1 : indexForApi
      const fixedNextStepIndex = hasEmptyStep
        ? nextStepIndex - 1
        : nextStepIndex

      dtreeStore.openModalViewVariants(fixedNextStepIndex)
    }

    return (
      <div className={cn('flex items-center p-4 justify-between', className)}>
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
  },
)
