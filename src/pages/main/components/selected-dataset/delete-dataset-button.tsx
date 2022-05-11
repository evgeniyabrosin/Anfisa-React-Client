import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import datasetStore from '@store/dataset'
import dirinfoStore from '@store/dirinfo'
import { Button } from '@ui/button'

export const DeleteDatasetButton = observer((): ReactElement => {
  const { isPossibleDeleteDataset, datasetName } = datasetStore

  return (
    <>
      {isPossibleDeleteDataset && (
        <Button
          text={t('ds.deleteDataset')}
          onClick={() => dirinfoStore.deleteDataset(datasetName)}
        />
      )}
    </>
  )
})
