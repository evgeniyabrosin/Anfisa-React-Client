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
import { QueryBuilder } from './ui/query-builder/query-builder'
import { ModalEditCompoundHet } from './ui/query-builder/ui/modal-edit-compound-het'
import { ModalEditCompoundRequest } from './ui/query-builder/ui/modal-edit-compound-request'
import { ModalEditCustomInheritanceMode } from './ui/query-builder/ui/modal-edit-custom-inheritance-mode'
import { ModalEditFilters } from './ui/query-builder/ui/modal-edit-filters'
import { ModalEditInheritanceMode } from './ui/query-builder/ui/modal-edit-inheritance-mode'
import { ModalEditNumbers } from './ui/query-builder/ui/modal-edit-numbers'
import { ModalSelectAttribute } from './ui/query-builder/ui/modal-select-attribute'
import { ModalSelectFilters } from './ui/query-builder/ui/modal-select-filters'
import { ModalSelectNumbers } from './ui/query-builder/ui/modal-select-numbers'

export const FilterPage = observer(
  (): ReactElement => {
    useDatasetName()

    useEffect(() => {
      const initAsync = async () => {
        await datasetStore.fetchDsStatAsync()
        await dtreeStore.fetchDtreeStatAsync()
        await dirinfoStore.fetchDsinfoAsync(datasetStore.datasetName)
        await dtreeStore.fetchDtreeListAsync()
      }

      initAsync()

      return () => {
        dtreeStore.resetFilterChangeIndicator()
      }
    }, [])

    return (
      <Fragment>
        {dtreeStore.isModalAttributeVisible && <ModalSelectAttribute />}
        {dtreeStore.isModalSelectFilterVisible && <ModalSelectFilters />}
        {dtreeStore.isModalEditFiltersVisible && <ModalEditFilters />}
        {dtreeStore.isModalEditNumbersVisible && <ModalEditNumbers />}
        {dtreeStore.isModalSelectNumbersVisible && <ModalSelectNumbers />}
        {dtreeStore.isModalEditInheritanceModeVisible && (
          <ModalEditInheritanceMode />
        )}
        {dtreeStore.isModalEditCustomInheritanceModeVisible && (
          <ModalEditCustomInheritanceMode />
        )}
        {dtreeStore.isModalEditCompoundHetVisible && <ModalEditCompoundHet />}
        {dtreeStore.isModalEditCompoundRequestVisible && (
          <ModalEditCompoundRequest />
        )}

        <div className="overflow-hidden">
          <FilterHeader />

          {filterStore.method === FilterMethodEnum.Query && <QueryBuilder />}
          {filterStore.method === FilterMethodEnum.Refiner && <FilterRefiner />}
        </div>
      </Fragment>
    )
  },
)
