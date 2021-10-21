import { Fragment, ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterMethodEnum } from '@core/enum/filter-method.enum'
import { useDatasetName } from '@core/hooks/use-dataset-name'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import { FilterHeader } from './filter-header'
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
    useDatasetName()

    useEffect(() => {
      const initAsync = async () => {
        const body = new URLSearchParams({
          ds: datasetStore.datasetName,
          tm: '0',
          code: 'return False',
        })

        await dirinfoStore.fetchDsinfoAsync(datasetStore.datasetName)

        await dtreeStore.fetchDtreeSetAsync(body)
      }

      initAsync()

      return () => {
        dtreeStore.resetFilterChangeIndicator()
      }
    }, [])

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

        <div className="overflow-hidden">
          <FilterHeader />

          {filterStore.method === FilterMethodEnum.Query && <QueryBuilder />}
          {filterStore.method === FilterMethodEnum.Refiner && <FilterRefiner />}
        </div>
      </Fragment>
    )
  },
)
