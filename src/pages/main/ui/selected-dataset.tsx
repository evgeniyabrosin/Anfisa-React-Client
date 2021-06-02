import React, { Fragment, ReactElement } from 'react'
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
      <React.Fragment>
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <CardTitle
              text={dirinfoStore.selectedDirinfoName}
              className="mr-3"
            />

            <Link to={`/ws?ds=${dirinfoStore.selectedDirinfoName}`}>
              <Button text={t('home.openInViewer')} />
            </Link>
          </div>

          <DatasetGeneral />
        </Card>

        <DatasetsFieldsList />
      </React.Fragment>
    )
  },
)
