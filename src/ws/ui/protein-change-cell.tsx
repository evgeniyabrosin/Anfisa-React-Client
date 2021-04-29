import { ReactElement } from 'react'
import { CellI } from './variant-cell'
import get from 'lodash/get'
import styled from 'styled-components'
import { Box } from '../../ui/box'
import { ProteinChangeItem } from './protein-change-item'

const Root = styled(Box)`
    padding-right: 56px;
	display: flex;
	flex-direction: column;
	width: 75px;
`


export const ProteinChangeCell = ({cell}: CellI): ReactElement => {
	const proteinChanges = get(cell, 'value', []) as string[]

	return (
		<Root>
			{proteinChanges.map((item, index) => <ProteinChangeItem key={index} value={item} />)}
		</Root>
	)
}

