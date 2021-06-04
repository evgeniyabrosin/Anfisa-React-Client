import { Fragment, ReactElement } from 'react'
import get from 'lodash/get'
import { observer } from 'mobx-react-lite'

import dirinfoStore from '@store/dirinfo'
import { DocsList } from './docs-list'

export const InfoList = observer(
  (): ReactElement => {
    const docs = get(dirinfoStore, 'dsinfo.doc', [])
    const baseDatasetName = dirinfoStore.ancestorsDsInfo[0][0]

    if (!docs[1]) return <Fragment />

    const handleClickAsync = async (doc: any, isBaseInfo?: boolean) => {
      if (Array.isArray(doc[1])) return

      dirinfoStore.setActiveInfoName(doc[0])

      if (doc[2]) {
        dirinfoStore.setInfoFrameLink(
          `app/dsdoc/${baseDatasetName ?? dirinfoStore.selectedDirinfoName}/${
            doc[2].image
          }`,
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
  },
)
