import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import { observer } from 'mobx-react-lite'

import { formatNumber } from '@core/format-number'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Loader } from '@components/loader'
import { showToast } from '@utils/notifications/showToast'
import { QueryResults } from './query-results'

export const QuerySelected = observer((): ReactElement => {
  const history = useHistory()
  const params = useParams()

  const { conditions } = filterStore

  const selectedFiltersAmount = filterStore.selectedFiltersArray.length

  const { variantCounts, dnaVariantsCounts, transcriptsCounts } =
    datasetStore.fixedStatAmount

  const selectedVariants =
    conditions.length === 0 ? variantCounts : datasetStore.filteredNo.length

  const handleClick = () => {
    const conditions = JSON.stringify(filterStore.conditions)

    variantCounts && variantCounts > 2600
      ? showToast(t('filter.tooMuchVariants'), 'error')
      : history.push(
          `${Routes.WS}?ds=${params.get('ds')}&conditions=${conditions}`,
          {
            prevPage: 'refiner',
          },
        )
  }

  const clearAlSelectedFilters = () => {
    if (selectedFiltersAmount === 0) return

    if (datasetStore.activePreset) datasetStore.resetActivePreset()

    filterStore.resetSelectedFilters()

    datasetStore.fetchDsStatAsync()

    if (!datasetStore.isXL) datasetStore.fetchWsListAsync()
  }

  return (
    <div className="w-1/3 ">
      <div className="flex items-center px-4 py-3 border-b border-grey-disabled bg-grey-tertiary">
        <div className="flex flex-wrap">
          <span className="font-bold text-20 w-full">{t('dtree.results')}</span>

          <span className="text-12 leading-14px mt-1 font-medium">
            {t('filter.variants', {
              all: formatNumber(variantCounts),
            })}
          </span>

          {dnaVariantsCounts && dnaVariantsCounts > 0 && (
            <span className="text-12 leading-14px font-medium border-l-2 border-grey-disabled mt-1 ml-2 pl-2">
              {t('filter.transcribedVariants', {
                all: formatNumber(dnaVariantsCounts),
              })}
            </span>
          )}

          {transcriptsCounts && transcriptsCounts > 0 && (
            <span className="text-12 leading-14px font-medium border-l-2 border-grey-disabled mt-1 ml-2 pl-2">
              {t('filter.transcripts', {
                all: formatNumber(transcriptsCounts),
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
              amount: formatNumber(selectedVariants),
            })}
            onClick={handleClick}
          />
        )}
      </div>

      {selectedFiltersAmount > 0 && (
        <div className="flex items-center justify-between px-4 py-3 text-14">
          <div className="text-grey-blue">
            {filterStore.selectedFiltersArray.length} added
          </div>

          <div
            className="text-blue-bright font-medium cursor-pointer"
            onClick={clearAlSelectedFilters}
          >
            {t('general.clearAll')}
          </div>
        </div>
      )}

      {datasetStore.isLoadingDsStat ? <Loader /> : <QueryResults />}
    </div>
  )
})
