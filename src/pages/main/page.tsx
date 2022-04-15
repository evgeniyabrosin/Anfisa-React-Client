import { ReactElement, useEffect } from 'react'
import { withErrorBoundary } from 'react-error-boundary'

import { useParams } from '@core/hooks/use-params'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import dtreeStore from '@store/dtree'
import filterStore from '@store/filter'
import filterZone from '@store/filterZone'
import variantStore from '@store/variant'
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
        await dirinfoStore.fetchDsinfoAsync(dsName)
      }

      dirinfoStore.setSelectedDirinfoName(dsName)
    }

    handlerAsync()
  }, [params])

  useEffect(() => {
    datasetStore.setActivePreset('')
    datasetStore.resetData()
    datasetStore.clearZone()
    datasetStore.resetConditions()
    filterStore.resetData()
    dtreeStore.resetData()
    filterZone.resetAllSelectedItems()
    variantStore.resetIsActiveVariant()
    variantStore.resetData()
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
