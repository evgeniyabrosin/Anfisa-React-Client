import React, { ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import { observer } from 'mobx-react-lite'

import { Versions } from '@declarations'
import { t } from '@i18n'
import { Card, CardTitle } from '@ui/card'
import { DatasetField } from '@pages/main/components/selected-dataset/components/dataset-fields-list/components/dataset-filed'

interface ICommonDetailsProps {
  className?: Argument
  versions: Versions
}

export const CommonDetails = observer(
  ({ className, versions }: ICommonDetailsProps): ReactElement => (
    <Card className={cn(className)}>
      <CardTitle text={t('home.info')} className="mb-4" />

      <div className="grid gap-4 grid-cols-2">
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
      </div>
    </Card>
  ),
)
