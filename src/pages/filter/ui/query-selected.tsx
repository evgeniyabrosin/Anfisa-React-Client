import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Loader } from '@components/loader'
import { QueryResults } from './query-results'

export const QuerySelected = observer(
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

    const handleClick = () => {
      allVariants > 2600
        ? toast.error(t('filter.tooMuchVariants'), {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
          })
        : history.push(`${Routes.WS}?ds=${params.get('ds')}`)
    }

    return (
      <div className="w-1/3">
        <div className="flex items-center p-4 border-b border-grey-light bg-blue-lighter">
          <div className="flex flex-wrap">
            <span className="font-bold text-20 leading-20 text-white w-full">
              {t('general.total')}
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

          {datasetStore.isXL ? (
            <Button
              className="ml-auto"
              onClick={() => dtreeStore.openTableModal()}
              text={t('dtree.viewVariants')}
            />
          ) : (
            <Button
              className="ml-auto"
              text={t('general.apply', {
                amount: selectedVariants,
              })}
              onClick={handleClick}
            />
          )}
        </div>

        {datasetStore.isLoadingDsStat ? <Loader /> : <QueryResults />}
      </div>
    )
  },
)
