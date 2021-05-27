import { observer } from 'mobx-react-lite'
import { ReactElement, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'

import dirinfoStore from '@store/dirinfo'
import { Box } from '@ui/box'

const Root = styled(Box)<{ isImg?: boolean }>`
  height: 900px;
  max-height: 900px;
  width: 900px;
  padding: 10px;
  margin-left: auto;
  margin-right: auto;

  ${ifProp(
    'isImg',
    css`
      height: auto;
    `,
  )}
`

const StyledImg = styled('img')`
  max-height: 900px;
`

const imgRegExp = /(.png)|(.jpg)$/m

export const IframeInfo = observer(
  (): ReactElement => {
    const [isImg, setIsImg] = useState(true)

    useEffect(() => {
      setIsImg(imgRegExp.test(dirinfoStore.infoFrameLink))
    }, [])

    return (
      <Root isImg={isImg}>
        {isImg ? (
          <StyledImg
            src={dirinfoStore.infoFrameLink}
            width="900px"
            height="auto"
          />
        ) : (
          <iframe
            src={dirinfoStore.infoFrameLink}
            frameBorder="0"
            height="100%"
            width="100%"
          />
        )}
      </Root>
    )
  },
)
