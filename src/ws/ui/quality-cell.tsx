import get from 'lodash/get'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../../ui/box'
import { QualityItem } from './quality-item'
import { CellI } from './variant-cell'

export interface QualityI {
    genotype: string
    g_quality: number
}

const Root = styled(Box)`
    display: flex;
	flex-wrap: wrap;
	padding-top: 5px;
	width: 210px;
`

export const QualityCell = ({cell}: CellI): ReactElement => {
	const qualities = get(cell, 'value', []).slice(0, 3) as QualityI[]

	return (
		<Root>
			{qualities.map((quality, index) => <QualityItem key={index} {...quality}/>)}
		</Root>
	)
}