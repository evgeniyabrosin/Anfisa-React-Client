import { ReactElement } from 'react'

import { Header } from '@ui/header'
import { Datasets } from './ui/datasets'
import { SelectedDataset } from './ui/selected-dataset'

export const MainPage = (): ReactElement => {
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
