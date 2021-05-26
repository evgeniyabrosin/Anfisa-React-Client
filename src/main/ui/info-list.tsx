import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import { Fragment, ReactElement } from 'react'

import { ANYType } from '../../..'
import dirinfoStore from '@store/dirinfo'
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
          // prettier-ignore
          `dsdoc/${baseDatasetName ?? dirinfoStore.selectedDirinfoName}/${doc[2].image}`,
        )

        return
      }

      if (isBaseInfo) {
        dirinfoStore.setInfoFrameLink(
          `dsdoc/${dirinfoStore.ancestorsDsInfo[0][0]}/${doc[1]}`,
        )

        return
      }

      dirinfoStore.setInfoFrameLink(
        `dsdoc/${dirinfoStore.selectedDirinfoName}/${doc[1]}`,
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
