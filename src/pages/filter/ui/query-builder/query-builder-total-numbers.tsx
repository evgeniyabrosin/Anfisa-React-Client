import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'

export const QueryBuilderTotalNumbers = observer(
  (): ReactElement => {
    const history = useHistory()
    const params = useParams()

    const [allVariants, transcribedVariants, allTranscripts] = get(
      datasetStore,
      'statAmount',
      [],
    )

    const selectedVariants =
      datasetStore.conditions.length === 0
        ? allVariants
        : datasetStore.filteredNo.length

    const handleClick = () =>
      history.push(`${Routes.WS}?ds=${params.get('ds')}`)

    return (
      <div className="flex items-center p-4 border-b border-grey-light bg-blue-dark">
        <div className="flex flex-wrap">
          <span className="font-bold text-white w-full">
            {t('dtree.results')}
          </span>

          <span className="text-12 leading-14px text-grey-blue mt-2">
            {t('filter.variants', {
              all: allVariants,
            })}
          </span>

          {transcribedVariants && (
            <span className="text-12 leading-14px text-grey-blue border-l-2 mt-2 ml-2 pl-2">
              {t('filter.transcribedVariants', {
                all: transcribedVariants,
              })}
            </span>
          )}

          {allTranscripts && (
            <span className="text-12 leading-14px text-grey-blue border-l-2 mt-2 ml-2 pl-2">
              {t('filter.transcripts', {
                all: allTranscripts,
              })}
            </span>
          )}
        </div>

        <Button
          className="ml-auto"
          text={t('dtree.applyFilter', {
            amount: selectedVariants,
          })}
          onClick={handleClick}
        />
      </div>
    )
  },
)
