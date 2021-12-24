import { ReactElement, useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { SessionStoreManager } from '@core/session-store-manager'
import datasetStore from '@store/dataset'
import { FilterRefinerGroups } from './filter-refiner-groups'
import { QuerySelected } from './query-selected'
import { SelectedGroup } from './selected-group'

interface IProps {
  locationState: any
}

export const FILTER_REFINER_PREFIX = 'filterRefinerData'

export const FilterRefiner = observer(
  ({ locationState }: IProps): ReactElement => {
    useEffect(() => {
      !locationState && datasetStore.fetchDsStatAsync()
      datasetStore.fetchWsListAsync()
    }, [locationState])

    useEffect(() => {
      SessionStoreManager.delete(FILTER_REFINER_PREFIX)

      return () => {
        SessionStoreManager.delete(FILTER_REFINER_PREFIX)
      }
    }, [])

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
