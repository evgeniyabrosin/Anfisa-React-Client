import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import { Card, CardTitle } from '@ui/card'
import { DatasetCard } from '@components/data-testid/dataset-card.cy'
import { DatasetsFieldsList } from './components/dataset-fields-list/dataset-fileds-list'
import { DatasetGeneral } from './components/dataset-general/dataset-general'
import { OpenViewerButton } from './components/open-viewer-button/open-viewer-button'
import { DeleteDatasetButton } from './delete-dataset-button'

export const SelectedDataset = observer((): ReactElement => {
  if (!dirinfoStore.selectedDirinfoName) {
    return (
      <span className="m-auto text-grey-blue">{t('home.pickDataset')}</span>
    )
  }

  return (
    <div className="flex-grow justify-center flex flex-col">
      <div className="flex items-center flex-wrap mt-4 ml-4">
        <CardTitle
          text={dirinfoStore.selectedDirinfoName}
          dataTestId={DatasetCard.datasetHeader}
          className="mr-3 break-words"
          style={{ maxWidth: 'calc(100% - 140px)' }}
        />

        <OpenViewerButton />
      </div>
      <div className="flex-grow grid gap-4 grid-cols-3 p-4 overflow-auto flex-grow">
        <Card className="col-span-1 xl:col-span-3">
          <DatasetGeneral />

          <DeleteDatasetButton className="mt-5" />
        </Card>

        <DatasetsFieldsList />
      </div>
    </div>
  )
})
