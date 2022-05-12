import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dtreeStore from '@store/dtree'
import { Divider } from '@ui/divider'
import { IDtreeSet } from '@service-providers/decision-trees'

interface IQueryBuilderResultsNumbersProps {
  className?: string
}

export const QueryBuilderResultsNumbers = observer(
  ({ className }: IQueryBuilderResultsNumbersProps) => {
    const dtree: IDtreeSet | undefined = dtreeStore.dtree
    const { stepData, isCountsReceived, totalFilteredCounts, isXl } = dtreeStore

    if (!dtree) {
      return null
    }

    const totalCounts = dtree['total-counts']

    const total = isXl
      ? t('dtree.totalVariants', {
          value: totalCounts[0],
        })
      : `${t('dtree.totalTranscribedVariants', {
          value: totalCounts[1],
        })} (${t('dtree.variantsCount', { value: totalCounts[0] })})`

    return (
      <div className={cn('text-sm font-medium flex align-center', className)}>
        <span className="whitespace-nowrap">{total}</span>
        {stepData.length > 0 && isCountsReceived && totalFilteredCounts && (
          <>
            <Divider orientation="vertical" color="light" spacing="dense" />
            <span className="whitespace-nowrap">
              {t('dtree.accepted', {
                value: totalFilteredCounts.accepted,
              })}
            </span>
            <Divider orientation="vertical" color="light" spacing="dense" />
            <span className="whitespace-nowrap">
              {t('dtree.rejected', {
                value: totalFilteredCounts.rejected,
              })}
            </span>
          </>
        )}
      </div>
    )
  },
)
