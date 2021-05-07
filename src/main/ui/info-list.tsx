import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import { Fragment, ReactElement } from 'react'

import { ANYType } from '../../..'
import { DS_DOC_API_URL } from '../../config/default'
import dirinfoStore from '../../store/dirinfo'
import { Box } from '../../ui/box'
import { DocsList } from './docs-list'
import { ModalInfo } from './modal-info'

export const InfoList = observer(
  (): ReactElement => {
    const docs = get(dirinfoStore, 'dsinfo.doc', [])
    const baseDatasetName = dirinfoStore.ancestorsDsInfo[0][0]

    if (!docs[1]) {
      return <Fragment />
    }

    const handleClickAsync = async (doc: ANYType, isBaseInfo?: boolean) => {
      if (Array.isArray(doc[1])) {
        return
      }

      dirinfoStore.setActiveInfoName(doc[0])

      if (doc[2]) {
        dirinfoStore.setInfoFrameLink(
          `${DS_DOC_API_URL}${
            baseDatasetName ?? dirinfoStore.selectedDirinfoName
          }/${doc[2].image}`,
        )

        return
      }

      if (isBaseInfo) {
        dirinfoStore.setInfoFrameLink(
          `${DS_DOC_API_URL}${dirinfoStore.ancestorsDsInfo[0][0]}/${doc[1]}`,
        )

        return
      }

      dirinfoStore.setInfoFrameLink(
        `${DS_DOC_API_URL}${dirinfoStore.selectedDirinfoName}/${doc[1]}`,
      )
    }

    return (
      <Box>
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

        <ModalInfo />
      </Box>
    )
  },
)
