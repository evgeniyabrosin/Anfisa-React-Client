import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../ui/box'
import { ExportReportButton } from '../ui/export-report-button'
import { Text } from '../ui/text'
import { NextVariantButton } from './ui/next-variant'
import { CloseSvg } from '../ui/icons/close'

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

export const VariantHeader = (): ReactElement => (
	<Root>
		<StyledName>{'[CLCNKB] chr1:16378047 G>T'}</StyledName>
		<StyledNextVariantButton />
		<ExportReportButton />

		<CloseSvg style={{marginLeft: 'auto', marginRight: '30px', cursor: 'pointer' }} />
	</Root>
)
