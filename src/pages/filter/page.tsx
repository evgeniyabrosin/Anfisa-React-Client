import React, { Fragment, ReactElement, useEffect } from 'react'
import { withErrorBoundary } from 'react-error-boundary'
import { useHistory } from 'react-router-dom'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { Header } from '@components/header'
import { GlbPagesNames } from '@glb/glb-names'
import { ErrorPage } from '../error/error'
import { FilterControl } from './ui/filter-control'
import { ModalEditCompoundHet } from './ui/modal-edit/components/modal-edit-compound-het'
import { ModalEditCompoundRequest } from './ui/modal-edit/components/modal-edit-compound-request'
import { ModalEditCustomInheritanceMode } from './ui/modal-edit/components/modal-edit-custom-inheritance-mode'
import { ModalEditFilters } from './ui/modal-edit/components/modal-edit-filters'
import { ModalEditGeneRegion } from './ui/modal-edit/components/modal-edit-gene-region'
import { ModalEditInheritanceMode } from './ui/modal-edit/components/modal-edit-inheritance-mode'
import { ModalEditNumbers } from './ui/modal-edit/components/modal-edit-numbers'
import { ModalTextEditor } from './ui/query-builder/modal-text-editor'
import { QueryBuilder } from './ui/query-builder/query-builder'
import { ModalSaveDataset } from './ui/query-builder/ui/modal-save-dataset'
import { ModalSelectAttribute } from './ui/query-builder/ui/modal-select-attribute'
import { ModalSelectCompoundHet } from './ui/query-builder/ui/modal-select-compound-het'
import { ModalSelectCompoundRequest } from './ui/query-builder/ui/modal-select-compound-request'
import { ModalSelectCustomInheritanceMode } from './ui/query-builder/ui/modal-select-custom-inheritance-mode'
import { ModalSelectFilters } from './ui/query-builder/ui/modal-select-filters'
import { ModalSelectGeneRegion } from './ui/query-builder/ui/modal-select-gene-region'
import { ModalSelectInheritanceMode } from './ui/query-builder/ui/modal-select-inheritance-mode'
import { ModalSelectNumbers } from './ui/query-builder/ui/modal-select-numbers'
import { TableModal } from './ui/TableModal'

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

      await dirinfoStore.fetchDsinfoAsync(dsName)

      await dtreeStore.fetchDtreeSetAsync(body)
    }

    initAsync()

    return () => {
      dtreeStore.resetFilterValue()
      dtreeStore.resetAlgorithmFilterValue()
      dtreeStore.resetData()
      dirinfoStore.resetData()
      datasetStore.resetData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dsName, history])

  const getFiltersValue = (type: string) => {
    if (type === 'all') {
      if (isXL) return toJS(dirinfoStore.dsinfo.total)

      if (filterStore.method === GlbPagesNames.Filter) {
        return toJS(dtreeStore.statAmount[0])
      }

      if (filterStore.method === GlbPagesNames.Refiner) {
        return toJS(datasetStore.statAmount[0])
      }
    }

    if (type === 'transcribedVariants') {
      if (filterStore.method === GlbPagesNames.Filter) {
        return toJS(dtreeStore.statAmount[1])
      }

      if (filterStore.method === GlbPagesNames.Refiner) {
        return toJS(datasetStore.statAmount[1])
      }
    }

    if (type === 'transcripts') {
      if (filterStore.method === GlbPagesNames.Filter) {
        return toJS(dtreeStore.statAmount[2])
      }

      if (filterStore.method === GlbPagesNames.Refiner) {
        return toJS(datasetStore.statAmount[2])
      }
    }
  }

  return (
    <Fragment>
      {dtreeStore.isModalAttributeVisible && <ModalSelectAttribute />}

      {dtreeStore.isModalEditFiltersVisible && <ModalEditFilters />}
      {dtreeStore.isModalSelectFilterVisible && <ModalSelectFilters />}

      {dtreeStore.isModalEditNumbersVisible && <ModalEditNumbers />}
      {dtreeStore.isModalSelectNumbersVisible && <ModalSelectNumbers />}

      {dtreeStore.isModalEditInheritanceModeVisible && (
        <ModalEditInheritanceMode />
      )}
      {dtreeStore.isModalSelectInheritanceModeVisible && (
        <ModalSelectInheritanceMode />
      )}

      {dtreeStore.isModalEditCustomInheritanceModeVisible && (
        <ModalEditCustomInheritanceMode />
      )}
      {dtreeStore.isModalSelectCustomInheritanceModeVisible && (
        <ModalSelectCustomInheritanceMode />
      )}

      {dtreeStore.isModalEditCompoundHetVisible && <ModalEditCompoundHet />}
      {dtreeStore.isModalSelectCompoundHetVisible && <ModalSelectCompoundHet />}

      {dtreeStore.isModalEditCompoundRequestVisible && (
        <ModalEditCompoundRequest />
      )}
      {dtreeStore.isModalSelectCompoundRequestVisible && (
        <ModalSelectCompoundRequest />
      )}

      {dtreeStore.isModalEditGeneRegionVisible && <ModalEditGeneRegion />}
      {dtreeStore.isModalSelectGeneRegionVisible && <ModalSelectGeneRegion />}

      {dtreeStore.isTableModalVisible && <TableModal />}
      {dtreeStore.isModalTextEditorVisible && <ModalTextEditor />}
      {dtreeStore.isModalSaveDatasetVisible && <ModalSaveDataset />}

      <div className="overflow-hidden">
        <Header source="filter">
          <div className="text-white flex-grow flex justify-end pr-6">
            <span className="text-12 leading-14px text-white mt-2 ml-auto font-bold">
              {t('filter.variants', {
                all: getFiltersValue('all'),
              })}
            </span>

            {!isXL && (
              <React.Fragment>
                <span className="header-variants-info">
                  {t('filter.transcribedVariants', {
                    all: getFiltersValue('transcribedVariants'),
                  })}
                </span>

                <span className="header-variants-info">
                  {t('filter.transcripts', {
                    all: getFiltersValue('transcripts'),
                  })}
                </span>
              </React.Fragment>
            )}
          </div>
        </Header>

        <FilterControl />
        <QueryBuilder />
      </div>
    </Fragment>
  )
})

export default withErrorBoundary(FilterPage, {
  fallback: <ErrorPage />,
})
