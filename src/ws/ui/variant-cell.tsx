import get from 'lodash/get'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { theme } from '../../theme/theme'
import { Box } from '../../ui/box'
import { ShareSvg } from '../../ui/icons/share'
import { TableDocSvg } from '../../ui/icons/table-doc'
import { Text } from '../../ui/text'

export interface CellI {
    cell: {
        value: string
    }
}

const Root = styled(Box)`
    display: flex;
    align-items: center;
    padding-left: 33px;
    padding-right: 20px;
`

const StyledText = styled(Text)`
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: ${theme('colors.black')};
    margin: 5px 0px;
`

export const VariantCell = ({cell}: CellI): ReactElement => {
	const value = get(cell, 'value', []) as string[]

	return (
		<Root>
			<Box style={{flex: 1}}>
				{value.map((gene) =>  <StyledText key={gene}>{gene}</StyledText>)}
			</Box>
		
			<ShareSvg style={{ marginLeft: 19, cursor: 'pointer', minWidth: '16px' }} />
			<TableDocSvg style={{ marginLeft: 10, cursor: 'pointer', minWidth: '16px' }}/>
		</Root>
	)
}