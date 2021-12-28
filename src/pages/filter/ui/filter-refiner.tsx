import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset'
import filterStore from '@store/filter'
import { FilterRefinerGroups } from './filter-refiner-groups'
import { QuerySelected } from './query-selected'
import { SelectedGroup } from './selected-group'
interface IProps {
  locationState: any
}

export const FilterRefiner = observer(
  ({ locationState }: IProps): ReactElement => {
    useEffect(() => {
      !locationState && datasetStore.fetchDsStatAsync()
      datasetStore.fetchWsListAsync()
    }, [locationState])

    useEffect(
      () => () => {
        filterStore.filterCondition = {}
      },
      [],
    )

    return (
      <div
        className="flex overflow-y-hidden"
        style={{ maxHeight: 'calc(100vh - 201px)' }}
      >
        <FilterRefinerGroups />

        <SelectedGroup />

        <QuerySelected />
      </div>
    )
  },
)
