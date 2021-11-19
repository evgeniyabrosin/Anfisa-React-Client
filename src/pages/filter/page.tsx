import { Fragment, ReactElement, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { FilterMethodEnum } from '@core/enum/filter-method.enum'
import { useDatasetName } from '@core/hooks/use-dataset-name'
import { useParams } from '@core/hooks/use-params'
import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import variantStore from '@store/variant'
import { Routes } from '@router/routes.enum'
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

export const FilterPage = observer(
  (): ReactElement => {
    const history = useHistory()

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

        if (dsName && !variantStore.dsName) {
          variantStore.setDsName(dsName)
        }

        await dirinfoStore.fetchDsinfoAsync(dsName)

        if (history.location.pathname === Routes.Refiner) {
          filterStore.setMethod(FilterMethodEnum.Refiner)
        } else {
          await dtreeStore.fetchDtreeSetAsync(body)
        }
      }

      initAsync()
        .then(() => setInit(true))
        .catch(() => null)

      return () => {
        dtreeStore.resetFilterChangeIndicator()
        dirinfoStore.resetData()
        datasetStore.resetData()
        filterStore.resetData()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dsName])

    const [allVariants, transcribedVariants, allTranscripts] = get(
      datasetStore,
      'statAmount',
      [],
    )

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
          <Header>
            <div className="text-white flex-grow flex justify-end pr-6">
              <span className="text-12 leading-14px text-white mt-2 ml-auto font-bold">
                {t('filter.variants', {
                  all: allVariants,
                })}
              </span>

              <span className="header-variants-info">
                {t('filter.transcribedVariants', {
                  all: transcribedVariants,
                })}
              </span>

              <span className="header-variants-info mr-6">
                {t('filter.transcripts', {
                  all: allTranscripts,
                })}
              </span>

              <PopperButton
                ButtonElement={ExportReportButton}
                ModalElement={ExportPanel}
              />
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
