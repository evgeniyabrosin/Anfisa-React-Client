import { ReactElement, useEffect } from 'react'
import { withErrorBoundary } from 'react-error-boundary'

import { useParams } from '@core/hooks/use-params'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import mainTableStore from '@store/ws/main-table.store'
import variantStore from '@store/ws/variant'
import zoneStore from '@store/ws/zone'
import { Header } from '@components/header'
import { ErrorPage } from '@pages/error/error'
import { Datasets } from './ui/datasets'
import { SelectedDataset } from './ui/selected-dataset'

const MainPage = (): ReactElement => {
  const params = useParams()

  useEffect(() => {
    const handlerAsync = async () => {
      const dsName = params.get('ds') || ''

      if (dsName) {
        await datasetStore.fetchDsinfoAsync(dsName)
      }

      dirinfoStore.setSelectedDirinfoName(dsName)
      datasetStore.setDatasetName(dsName)
    }
    handlerAsync()
  }, [params])

  useEffect(() => {
    datasetStore.resetData()
    zoneStore.clearZone()
    filterStore.reset()
    dtreeStore.resetData()
    zoneStore.resetAllSelectedItems()
    variantStore.resetIsActiveVariant()
    variantStore.resetData()
    mainTableStore.resetData()
  }, [])

  return (
    <div className="min-h-full h-full flex flex-col">
      <Header />
      <div className="flex flex-row flex-grow">
        <Datasets />

        <SelectedDataset />
      </div>
    </div>
  )
}

export default withErrorBoundary(MainPage, {
  fallback: <ErrorPage />,
})
