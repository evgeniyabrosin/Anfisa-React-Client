import React, { ReactElement, useEffect } from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { useHistory } from 'react-router-dom'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import datasetStore from '@store/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Header } from '@components/header'
import { VariantsCount } from '@components/variants-count'
import { GlbPagesNames } from '@glb/glb-names'
import { ErrorPage } from '../../error/error'
import { FilterControl } from '../common/filter-control/filter-control'
import { ModalsContainer } from './components/modals/modals-container'
import { QueryBuilder } from './components/query-builder/query-builder'

const FilterPage = observer((): ReactElement => {
  const isXL = datasetStore.isXL

  const history = useHistory()

  useDatasetName()
  const params = useParams()
  const dsName = params.get('ds') || ''

  useEffect(() => {
    const initAsync = async () => {
      const body = new URLSearchParams({
        ds: dsName,
        tm: '0',
        code: 'return False',
      })

      await datasetStore.fetchDsinfoAsync(dsName)

      await dtreeStore.fetchDtreeSetAsync(body)
    }

    initAsync()

    return () => {
      dtreeStore.resetFilterValue()
      dtreeStore.resetAlgorithmFilterValue()
      dtreeStore.resetCurrentDtreeName()
      dtreeStore.resetData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dsName, history])

  const getFiltersValue = (type: string) => {
    if (type === 'all') {
      if (isXL) return toJS(datasetStore.dsInfo.total) as number

      if (filterStore.method === GlbPagesNames.Dtree) {
        return dtreeStore.statAmount?.variants
      }

      if (filterStore.method === GlbPagesNames.Refiner) {
        return filterStore.stat.filteredCounts?.variants
      }
    }

    if (type === 'transcribedVariants') {
      if (filterStore.method === GlbPagesNames.Dtree) {
        return dtreeStore.statAmount?.transcribedVariants
      }

      if (filterStore.method === GlbPagesNames.Refiner) {
        return filterStore.stat.filteredCounts?.variants
      }
    }

    if (type === 'transcripts') {
      if (filterStore.method === GlbPagesNames.Dtree) {
        return dtreeStore.statAmount?.transcripts
      }

      if (filterStore.method === GlbPagesNames.Refiner) {
        return filterStore.stat.filteredCounts?.transcripts
      }
    }
  }

  return (
    <>
      <ModalsContainer />

      <div className="overflow-hidden">
        <Header>
          <VariantsCount
            variantCounts={getFiltersValue('all')}
            transcriptsCounts={getFiltersValue('transcripts')}
            dnaVariantsCounts={getFiltersValue('transcribedVariants')}
            showDnaVariants={!isXL}
            showTranscripts={!isXL}
          />
        </Header>

        <FilterControl />
        <QueryBuilder />
      </div>
    </>
  )
})

export default withErrorBoundary(FilterPage, {
  fallback: <ErrorPage />,
})
