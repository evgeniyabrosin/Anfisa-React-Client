import { observer } from 'mobx-react-lite'
import { ReactElement, useEffect } from 'react'
import styled from 'styled-components'

import { FilterMethodEnum } from '../core/enum/filter-method.enum'
import { useParams } from '../core/hooks/use-params'
import datasetStore from '../store/dataset'
import filterStore from '../store/filter'
import { Box } from '../ui/box'
import { FilterHeader } from './filter-header'
import { FilterRefiner } from './ui/filter-refiner'
import { QueryBuilder } from './ui/query-builder'

const Root = styled(Box)``

export const FilterPage = observer(
  (): ReactElement => {
    const params = useParams()

    useEffect(() => {
      datasetStore.fetchDsStatAsync(params.get('ds'))
    }, [params])

    return (
      <Root>
        <FilterHeader />

        {filterStore.method === FilterMethodEnum.Query && <QueryBuilder />}
        {filterStore.method === FilterMethodEnum.Refiner && <FilterRefiner />}
      </Root>
    )
  },
)
