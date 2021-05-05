import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../../ui/box'
import { Filters } from './filters'
import { Preset } from './preset'

const Root = styled(Box)`
	display: flex;
	margin-top: 22px;
	margin-bottom: 60px;
`

export const ControlPanel = (): ReactElement => {
	return (
		<Root>
			<Preset />

			<Filters />
		</Root>
	)
}