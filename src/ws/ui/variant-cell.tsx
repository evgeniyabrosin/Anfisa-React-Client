import { get } from 'lodash'
import { ReactElement } from 'react'
import styled from 'styled-components'
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
    color: #000000;
`

export const VariantCell = ({cell}: CellI): ReactElement => {
	const value = get(cell, 'value', '')
    
	return (
		<Root>
			<StyledText>{value}</StyledText>
			<ShareSvg style={{ marginLeft: 19, cursor: 'pointer' }} />
			<TableDocSvg style={{ marginLeft: 10, cursor: 'pointer' }}/>
		</Root>
	)
}