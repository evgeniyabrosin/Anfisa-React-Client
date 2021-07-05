import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { FilterMethodEnum } from '@core/enum/filter-method.enum'
import { useDatasetName } from '@core/hooks/use-dataset-name'
import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { FilterHeader } from './filter-header'
import { FilterRefiner } from './ui/filter-refiner'
import { QueryBuilder } from './ui/query-builder'

export const FilterPage = observer(
  (): ReactElement => {
    useDatasetName()
    useEffect(() => {
      const initAsync = async () => {
        await datasetStore.fetchDsStatAsync()
      }

      initAsync()
    }, [])

    return (
      <div className="overflow-hidden">
        <FilterHeader />

        {filterStore.method === FilterMethodEnum.Query && <QueryBuilder />}
        {filterStore.method === FilterMethodEnum.Refiner && <FilterRefiner />}
      </div>
    )
  },
)
