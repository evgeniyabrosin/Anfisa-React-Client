import styles from './dtree.page.module.css'

import React, { ReactElement, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import datasetStore from '@store/dataset/dataset'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Header } from '@components/header'
import { VariantsCount } from '@components/variants-count'
import { GlbPagesNames } from '@glb/glb-names'
import { FilterControl } from '../common/filter-control/filter-control'
import { ModalsContainer } from './components/modals/modals-container'
import { QueryBuilder } from './components/query-builder/query-builder'
import { SolutionControlDtree } from './components/solution-control-dtree/solution-control-dtree'

export const DtreePage = observer((): ReactElement => {
  const { isXL } = datasetStore

  const history = useHistory()

  useDatasetName()
  const params = useParams()
  const dsName = params.get('ds') || ''

  useEffect(() => {
    const initAsync = async () => {
      await dtreeStore.fetchDtreeSetAsync({
        ds: dsName,
        tm: '0',
        code: 'return False',
      })
    }

    initAsync()

    return () => {
      dtreeStore.resetFilterValue()
      dtreeStore.resetAlgorithmFilterValue()
      dtreeStore.resetPrevDtreeName()
      dtreeStore.resetData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dsName, history])

  const getFiltersValue = (type: string) => {
    if (type === 'all') {
      if (isXL) return toJS(datasetStore.dsInfoData?.total)

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

      <div className={styles.dtreePage}>
        <Header className={styles.dtreePage__header}>
          <VariantsCount
            variantCounts={getFiltersValue('all')}
            transcriptsCounts={getFiltersValue('transcripts')}
            dnaVariantsCounts={getFiltersValue('transcribedVariants')}
            showDnaVariants={!isXL}
            showTranscripts={!isXL}
          />
        </Header>

        <FilterControl
          className={styles.dtreePage__controls}
          SolutionControl={SolutionControlDtree}
        />

        <QueryBuilder className={styles.dtreePage__queryBuilder} />
      </div>
    </>
  )
})
