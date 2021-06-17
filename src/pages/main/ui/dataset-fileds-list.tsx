import React, { ReactElement } from 'react'
import cn, { Argument } from 'classnames'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import { Versions } from '@declarations'
import { t } from '@i18n'
import dirinfoStore from '@store/dirinfo'
import { Card, CardTitle } from '@ui/card'
import { Icon } from '@ui/icon'
import { DatasetField } from './dataset-filed'
import { IframeInfo } from './iframe-info'
import { ModalInfo } from './modal-info'

interface Props {
  className?: Argument
  versions: Versions
}

const CommonDetails = observer(
  ({ className, versions }: Props): ReactElement => (
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

const InfoDetails = observer(
  (): ReactElement => {
    const setVisible = () => {
      dirinfoStore.setInfoFrameModalVisible(true)
    }

    return (
      <Card className="flex flex-col col-span-2 xl:col-span-3">
        <div className="flex justify-end mb-3">
          <Icon
            name="FullScreen"
            className="text-grey-blue cursor-pointer"
            onClick={setVisible}
          />
        </div>

        <IframeInfo />

        <ModalInfo />
      </Card>
    )
  },
)

export const DatasetsFieldsList = observer(
  (): ReactElement => {
    const versions: Versions = get(dirinfoStore, 'dsinfo.meta.versions')
    const hasInfoDetails = !!dirinfoStore.infoFrameLink

    return (
      <React.Fragment>
        {hasInfoDetails && <InfoDetails />}

        {versions && (
          <CommonDetails
            className={
              hasInfoDetails ? 'col-span-3' : 'col-span-2 xl:col-span-3'
            }
            versions={versions}
          />
        )}
      </React.Fragment>
    )
  },
)
