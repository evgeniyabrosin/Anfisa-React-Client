import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { QueryResults } from './query-results'

export const QuerySelected = observer(
  (): ReactElement => {
    const history = useHistory()
    const params = useParams()

    const allAmount = get(datasetStore, 'dsStat.total-counts.0', 0)

    const selectedVariants =
      datasetStore.conditions.length === 0
        ? allAmount
        : datasetStore.filteredNo.length

    const handleClick = () =>
      history.push(`${Routes.WS}?ds=${params.get('ds')}`)

    return (
      <div className="w-1/3">
        <div className="flex items-center flex-wrap p-4 border-b border-grey-light bg-blue-lighter">
          <span className="font-bold text-20 leading-20 text-white">
            {t('filter.selectedVariants')}
          </span>

          <span className="text-14 leading-14px text-grey-blue ml-2">
            {t('filter.amountOf', {
              selected: selectedVariants,
              all: allAmount,
            })}
          </span>

          <Button
            className="h-8 ml-auto"
            text={t('filter.show', {
              amount: selectedVariants,
            })}
            onClick={handleClick}
          />
        </div>

        <QueryResults />
      </div>
    )
  },
)
