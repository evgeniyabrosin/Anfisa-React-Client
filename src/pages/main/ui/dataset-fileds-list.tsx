import React, { Fragment, ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { Versions } from '@declarations'
import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import { Card, CardTitle } from '@ui/card'
import { DatasetField } from './dataset-filed'
import { IframeInfo } from './iframe-info'

interface Props {
  className?: Argument
}

export const DatasetsFieldsList = observer(
  ({ className }: Props): ReactElement => {
    const versions: Versions = get(dirinfoStore, 'dsinfo.meta.versions')
    const hasInfoDetails = !!dirinfoStore.infoFrameLink

    if (!versions && !hasInfoDetails) return <Fragment />

    return (
      <Card className={cn(className)}>
        <CardTitle text={t('home.info')} className="mb-4" />

        <div className="grid gap-4 grid-cols-2">
          {hasInfoDetails && (
            <Card className="col-span-2">
              <CardTitle text={dirinfoStore.activeInfoName} size={'sm'} />

              <IframeInfo />
            </Card>
          )}

          {versions && (
            <React.Fragment>
              <DatasetField label="GERP" value={versions.GERP} />

              <DatasetField label="Annotations" value={versions.annotations} />

              <DatasetField
                label="Annotations Date"
                value={versions.annotations_date}
              />

              <DatasetField
                label="Annotations build"
                value={versions.annotations_build}
              />

              <DatasetField
                label="bcftools_annotate_version"
                className="col-span-2"
                value={versions.bcftools_annotate_version}
              />

              <DatasetField label="gatk" value={versions.gatk} />

              <DatasetField
                label="gatk_select_variants"
                value={versions.gatk_select_variants}
              />

              <DatasetField label="Pipeline" value={versions.pipeline} />
            </React.Fragment>
          )}
        </div>
      </Card>
    )
  },
)
