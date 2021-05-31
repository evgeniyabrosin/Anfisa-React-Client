import { ReactElement } from 'react'

import { Card } from '@ui/card'
import { Header } from '@ui/header'
import { Datasets } from './ui/datasets'
import { SelectedDataset } from './ui/selected-dataset'

export const MainPage = (): ReactElement => {
  return (
    <div>
      <Header />

      <div className="flex flex-row flex-wrap p-2">
        <Card>
          <Datasets />
        </Card>

        <SelectedDataset />
      </div>
    </div>
  )
}
