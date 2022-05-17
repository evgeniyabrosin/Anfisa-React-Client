import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset/dataset'
import dirinfoStore from '@store/dirinfo'
import { CommonDetails } from '@pages/main/components/selected-dataset/components/dataset-fields-list/components/common-details'
import { InfoDetails } from '@pages/main/components/selected-dataset/components/dataset-fields-list/components/info-details'

export const DatasetsFieldsList = observer((): ReactElement => {
  const versions = datasetStore.dsInfoData?.meta.versions
  const hasInfoDetails = !!dirinfoStore.infoFrameLink

  return (
    <>
      {hasInfoDetails && <InfoDetails />}

      {versions && (
        <CommonDetails
          className={hasInfoDetails ? 'col-span-3' : 'col-span-2 xl:col-span-3'}
          versions={versions}
        />
      )}
    </>
  )
})
