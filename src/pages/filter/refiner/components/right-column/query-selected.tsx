import styles from './query-selected.module.css'

import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

import { formatNumber } from '@core/format-number'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Loader } from '@components/loader'
import { FilterRefinerStatCounts } from '@pages/filter/refiner/components/right-column/filter-refiner-stat-counts'
import { showToast } from '@utils/notifications/showToast'
import { QueryResults } from './query-results'

interface IQuerySelectedProps {
  className?: string
}

export const QuerySelected = observer(
  ({ className }: IQuerySelectedProps): ReactElement => {
    const history = useHistory()
    const params = useParams()

    const {
      conditions,
      isConditionsFetching,
      stat: { filteredCounts },
    } = filterStore

    const filteredVariantsCount = filteredCounts?.variants

    const handleApplyClick = () => {
      const conditions = JSON.stringify(filterStore.conditions)

      filteredVariantsCount == null || filteredVariantsCount > 2600
        ? showToast(t('filter.tooMuchVariants'), 'error')
        : history.push(
            `${Routes.WS}?ds=${params.get('ds')}&conditions=${conditions}`,
            {
              prevPage: 'refiner',
            },
          )
    }

    const clearAlSelectedFilters = () => {
      filterStore.clearConditions()
    }

    const isDisabledApplyButton =
      isConditionsFetching ||
      filteredVariantsCount == null ||
      !conditions.length ||
      !filteredVariantsCount

    return (
      <div className={cn(styles.querySelected, className)}>
        <div
          className={cn(
            styles.querySelected__results,
            'flex items-center px-4 py-3 border-b border-grey-disabled bg-grey-tertiary',
          )}
        >
          <div>
            <span className="font-bold text-20">{t('dtree.results')}</span>
            <FilterRefinerStatCounts
              className="text-12 font-medium leading-14px mt-1"
              counts={!isConditionsFetching ? filteredCounts : undefined}
            />
          </div>

          {datasetStore.isXL ? (
            <Button
              className="ml-auto"
              onClick={() => dtreeStore.openModalViewVariants()}
              text={t('dtree.viewVariants')}
            />
          ) : (
            <Button
              className="ml-auto"
              text={t('general.apply', {
                amount: formatNumber(filteredVariantsCount),
              })}
              disabled={isDisabledApplyButton}
              onClick={handleApplyClick}
            />
          )}
        </div>

        {!isConditionsFetching && conditions.length > 0 && (
          <div
            className={cn(
              styles.querySelected__count,
              'flex items-center justify-between px-4 py-3 border-b border-grey-light text-14',
            )}
          >
            <div className="text-grey-blue">
              {t('filter.conditionsAdded', { count: conditions.length })}
            </div>

            <div
              className="text-blue-bright font-medium cursor-pointer"
              onClick={clearAlSelectedFilters}
            >
              {t('general.clearAll')}
            </div>
          </div>
        )}

        {isConditionsFetching ? (
          <Loader />
        ) : (
          <QueryResults className={styles.querySelected__conditions} />
        )}
      </div>
    )
  },
)
