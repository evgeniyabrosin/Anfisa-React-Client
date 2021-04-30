import { ReactElement } from 'react'
import styled from 'styled-components'
import { Box } from '../../ui/box'
import { Preset } from './preset'

const Root = styled(Box)`
  
`

export const ControlPanel = (): ReactElement => {
	return (
		<Root>
			<Preset />
		</Root>
	)
}