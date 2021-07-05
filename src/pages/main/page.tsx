import { ReactElement, useEffect } from 'react'

import { useParams } from '@core/hooks/use-params'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import { Header } from '@ui/header'
import { Datasets } from './ui/datasets'
import { SelectedDataset } from './ui/selected-dataset'

export const MainPage = (): ReactElement => {
  const params = useParams()

  useEffect(() => {
    const handlerAsync = async () => {
      const dsName = params.get('ds') || ''

      if (dsName) {
        await dirinfoStore.fetchDsinfoAsync(dsName)
      }

      dirinfoStore.setSelectedDirinfoName(dsName)
      datasetStore.setActivePreset('')
    }

    handlerAsync()
  }, [params])

  return (
    <div className="min-h-full flex flex-col">
      <Header />

      <div className="flex flex-row flex-grow">
        <Datasets />

        <SelectedDataset />
      </div>
    </div>
  )
}
