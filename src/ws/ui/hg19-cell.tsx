import { get } from 'lodash'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../../ui/box'
import { Text } from '../../ui/text'
import { CellI } from './variant-cell'

const StyledText = styled(Text)`
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #000000;
    margin: 0px;    
`

export const HG19Cell = ({cell}: CellI): ReactElement => {
	const value = get(cell, 'value', '').split(' ')

	return (
		<Box>
			<StyledText>{value[0]}</StyledText>
			<StyledText>{value[1]}</StyledText>
		</Box>
	)
}