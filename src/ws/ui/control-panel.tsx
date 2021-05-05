import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../../ui/box'
import { Tags } from '../../ui/tags'
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

			<Tags tags={['Previously Triaged', 'Benign/Likely benign', 'To follow up']} />
		</Root>
	)
}