import { Fragment, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import { Button } from '@ui/button'
import { Card, CardTitle } from '@ui/card'
import { DatasetsFieldsList } from './dataset-fileds-list'
import { DatasetGeneral } from './dataset-general'

export const SelectedDataset = observer(
  (): ReactElement => {
    if (!dirinfoStore.selectedDirinfoName) {
      return <Fragment />
    }

    return (
      <div className="flex-grow grid gap-4 grid-cols-3 p-4">
        <Card className="col-span-1 xl:col-span-3">
          <div className="flex items-center justify-between flex-wrap">
            <CardTitle
              text={dirinfoStore.selectedDirinfoName}
              className="mb-3 mr-3"
            />

            <Link
              to={`/ws?ds=${dirinfoStore.selectedDirinfoName}`}
              className="mb-3"
            >
              <Button size="md" text={t('home.openInViewer')} />
            </Link>
          </div>

          <DatasetGeneral />
        </Card>

        <DatasetsFieldsList className="col-span-2 xl:col-span-3" />
      </div>
    )
  },
)
