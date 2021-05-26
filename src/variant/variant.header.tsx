import get from 'lodash/get'
import { observer } from 'mobx-react-lite'
import { ReactElement } from 'react'
import styled from 'styled-components'

import variantStore from '@store/variant'
import { Box } from '../ui/box'
import { ExportPanel } from '../ui/export-panel'
import { ExportReportButton } from '../ui/export-report-button'
import { CloseSvg } from '@icons/close'
import { Popper } from '../ui/popper'
import { Text } from '../ui/text'
import { NextVariantButton } from './ui/next-variant'

const Root = styled(Box)`
  display: flex;
  align-items: center;
`

const StyledName = styled(Text)`
  font-family: 'Lato', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 36px;
  color: #000000;
`

const StyledNextVariantButton = styled(NextVariantButton)`
  margin-left: 39px;
  margin-right: 30px;
`

export const VariantHeader = observer(
  (): ReactElement => {
    const genInfo = get(variantStore, 'variant[0].rows[0].cells[0][0]', '')
    const hg19 = get(variantStore, 'variant[0].rows[1].cells[0][0]', '')

    const handleNextVariant = () => {
      variantStore.nextVariant()
    }

    const closeVariant = () => {
      history.back()
    }

    return (
      <Root>
        <StyledName>{`[${genInfo}] ${hg19}`}</StyledName>
        <StyledNextVariantButton onClick={handleNextVariant} />

        <Popper ButtonElement={ExportReportButton} ModalElement={ExportPanel} />

        <CloseSvg
          style={{ marginLeft: 'auto', marginRight: '30px', cursor: 'pointer' }}
          onClick={closeVariant}
        />
      </Root>
    )
  },
)
