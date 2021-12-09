import React, { Fragment, ReactElement, useEffect, useState } from 'react'
// import { useHistory } from 'react-router'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

import { FilterMethodEnum } from '@core/enum/filter-method.enum'
import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
// import { Routes } from '@router/routes.enum'
import { ExportPanel } from '@components/export-panel'
import { ExportReportButton } from '@components/export-report-button'
import { Header } from '@components/header'
import { PopperButton } from '@components/popper-button'
import { FilterControl } from './ui/filter-control'
import { FilterRefiner } from './ui/filter-refiner'
import { ModalTextEditor } from './ui/query-builder/modal-text-editor'
import { QueryBuilder } from './ui/query-builder/query-builder'
import { ModalEditCompoundHet } from './ui/query-builder/ui/modal-edit-compound-het'
import { ModalEditCompoundRequest } from './ui/query-builder/ui/modal-edit-compound-request'
import { ModalEditCustomInheritanceMode } from './ui/query-builder/ui/modal-edit-custom-inheritance-mode'
import { ModalEditFilters } from './ui/query-builder/ui/modal-edit-filters'
import { ModalEditGeneRegion } from './ui/query-builder/ui/modal-edit-gene-region'
import { ModalEditInheritanceMode } from './ui/query-builder/ui/modal-edit-inheritance-mode'
import { ModalEditNumbers } from './ui/query-builder/ui/modal-edit-numbers'
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
// import { Routes } from '@router/routes.enum'

export const FilterPage = observer(
  (): ReactElement => {
    // const history = useHistory()
    const isXL = datasetStore.isXL

    useDatasetName()
    const params = useParams()
    const dsName = params.get('ds') || ''
    const [fetched, setInit] = useState(false)

    useEffect(() => {
      const initAsync = async () => {
        const body = new URLSearchParams({
          ds: dsName,
          tm: '0',
          code: 'return False',
        })

        await dirinfoStore.fetchDsinfoAsync(dsName)

        // if (history.location.pathname === Routes.Refiner) {
        //   filterStore.setMethod(FilterMethodEnum.Refiner)
        // } else {
        //   await dtreeStore.fetchDtreeSetAsync(body)
        // }
        await dtreeStore.fetchDtreeSetAsync(body)
      }

      initAsync()
        .then(() => setInit(true))
        .catch(() => null)

      return () => {
        dtreeStore.resetFilterChangeIndicator()
        dtreeStore.resetData()
        dirinfoStore.resetData()
        datasetStore.resetData()
        filterStore.resetData()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dsName])

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
        {dtreeStore.isModalSelectCompoundHetVisible && (
          <ModalSelectCompoundHet />
        )}

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
                  all: isXL
                    ? toJS(dirinfoStore.dsinfo.total)
                    : toJS(dtreeStore.statAmount[0]) ||
                      toJS(datasetStore.statAmount[0]),
                })}
              </span>

              {!isXL && (
                <React.Fragment>
                  <span className="header-variants-info">
                    {t('filter.transcribedVariants', {
                      all:
                        toJS(dtreeStore.statAmount[1]) ||
                        toJS(datasetStore.statAmount[1]),
                    })}
                  </span>

                  <span className="header-variants-info">
                    {t('filter.transcripts', {
                      all:
                        toJS(dtreeStore.statAmount[2]) ||
                        toJS(datasetStore.statAmount[2]),
                    })}
                  </span>
                </React.Fragment>
              )}

              <div className="ml-2">
                <PopperButton
                  ButtonElement={ExportReportButton}
                  ModalElement={ExportPanel}
                />
              </div>
            </div>
          </Header>

          <FilterControl />

          {filterStore.method === FilterMethodEnum.DecisionTree && fetched && (
            <QueryBuilder />
          )}
          {filterStore.method === FilterMethodEnum.Refiner && <FilterRefiner />}
        </div>
      </Fragment>
    )
  },
)
