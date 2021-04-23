import { get } from 'lodash'
import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../../ui/box'
import { Tag } from './tag'
import { CellI } from './variant-cell'

const Root = styled(Box)`
    padding-right: 56px;
`

export const TagsCell = ({cell}: CellI): ReactElement => {
	const value = get(cell, 'value', '')

	return (
		<Root>
			<Tag text={value}></Tag>
		</Root>
	)
}