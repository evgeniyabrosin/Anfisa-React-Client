import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import { Button } from '@ui/button'

export const DeleteDatasetButton = observer((): ReactElement => {
  const { isPossibleDeleteDataset, datasetName } = datasetStore

  return (
    <>
      {isPossibleDeleteDataset && (
        <Button
          text="Delete Dataset"
          onClick={() => dirinfoStore.deleteDataset(datasetName)}
        />
      )}
    </>
  )
})
