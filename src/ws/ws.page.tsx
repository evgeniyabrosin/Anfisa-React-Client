import { ReactElement } from 'react'
import { Box } from '../ui/box'
import dirinfoStore from '../store/dirinfo'

export const WSPage = (): ReactElement => {
	return (
		<Box>
			{dirinfoStore.selectedDirinfoName}gdg
		</Box>
	)
}