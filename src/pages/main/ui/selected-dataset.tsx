import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import { Card, CardTitle } from '@ui/card'
import { DatasetCard } from '@components/data-testid/dataset-card.cy'
import { DatasetsFieldsList } from './dataset-fileds-list'
import { DatasetGeneral } from './dataset-general'
import { OpenViewerButton } from './open-viewer-button'

export const SelectedDataset = observer((): ReactElement => {
  if (!dirinfoStore.selectedDirinfoName) {
    return (
      <span className="m-auto text-grey-blue">{t('home.pickDataset')}</span>
    )
  }

  return (
    <div className="flex-grow grid gap-4 grid-cols-3 p-4">
      <Card className="col-span-1 xl:col-span-3">
        <div className="flex items-start justify-between flex-wrap">
          <CardTitle
            text={dirinfoStore.selectedDirinfoName}
            dataTestId={DatasetCard.datasetHeader}
            className="mb-3 mr-3 break-words"
            style={{ maxWidth: 'calc(100% - 140px)' }}
          />

          <OpenViewerButton />
        </div>

        <DatasetGeneral />
      </Card>

      <DatasetsFieldsList />
    </div>
  )
})
