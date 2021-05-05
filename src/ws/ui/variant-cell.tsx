import get from 'lodash/get'
import { ReactElement } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { getVariantColor } from '../../core/get-variant-color'
import { Routes } from '../../router/routes.enum'
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

const Circle = styled(Box)`
    width: 8px;
    height: 8px;
    border-radius: 50px;
    margin-right: 5px;
`

export const VariantCell = ({cell}: CellI): ReactElement => {
	const value = get(cell, 'value[0]', []) as string[]
	const colorNumber = get(cell, 'value[1]', -1)
	const history = useHistory()
    
	const handleOpenVariant = () => {
		history.push(Routes.Variant)
	}
    
	return (
		<Root>
			<Circle style={{border: `2px solid ${getVariantColor(colorNumber)}`}} />

			<Box style={{flex: 1}}>
				{value.map((gene) =>  <StyledText key={gene}>{gene}</StyledText>)}
			</Box>
		
			<ShareSvg style={{ marginLeft: 19, cursor: 'pointer', minWidth: '16px' }} />
			<TableDocSvg style={{ marginLeft: 10, cursor: 'pointer', minWidth: '16px' }} onClick={handleOpenVariant} />
		</Root>
	)
}