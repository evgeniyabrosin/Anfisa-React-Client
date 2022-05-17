import { ReactElement } from 'react'
import { observer } from 'mobx-react-lite'

import datasetStore from '@store/dataset/dataset'
import dirinfoStore from '@store/dirinfo'
import { DocsList } from './docs-list'

export const InfoList = observer((): ReactElement | null => {
  const docs = datasetStore.dsInfoData?.doc
  const baseDatasetName = dirinfoStore.ancestorsDsInfo[0][0]

  if (docs && !docs[1]) return null

  const handleClickAsync = async (doc: any, isBaseInfo?: boolean) => {
    dirinfoStore.setActiveInfoName(doc[0])

    if (doc[2]) {
      if (doc[2].image) {
        dirinfoStore.setInfoFrameLink(
          `app/dsdoc/${baseDatasetName ?? dirinfoStore.selectedDirinfoName}/${
            doc[2].image
          }`,
        )

        return
      }

      dirinfoStore.setInfoFrameLink(
        doc[2].images.map(
          (image: string) =>
            `app/dsdoc/${
              baseDatasetName ?? dirinfoStore.selectedDirinfoName
            }/${image}`,
        ),
      )

      return
    }

    if (isBaseInfo) {
      dirinfoStore.setInfoFrameLink(
        `app/dsdoc/${dirinfoStore.ancestorsDsInfo[0][0]}/${doc[1]}`,
      )

      return
    }

    dirinfoStore.setInfoFrameLink(
      `app/dsdoc/${dirinfoStore.selectedDirinfoName}/${doc[1]}`,
    )
  }

  return (
    <div>
      <DocsList
        activeName={dirinfoStore.activeInfoName}
        data={docs}
        onClick={handleClickAsync}
      />

      {dirinfoStore.ancestorsDsInfo[0] &&
        dirinfoStore.ancestorsDsInfo[0][1] && (
          <DocsList
            activeName={dirinfoStore.activeInfoName}
            baseDatasetName={baseDatasetName}
            data={dirinfoStore.ancestorsDsInfo[0][1]}
            onClick={doc => handleClickAsync(doc, true)}
          />
        )}
    </div>
  )
})
