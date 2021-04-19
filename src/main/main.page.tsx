import { ReactElement, useEffect } from 'react'
import styled from 'styled-components'
import { HeaderPage } from './ui/header.page'
import dirinfoStore from '../store/dirinfo'
import { Datasets } from './ui/datasets'


const Root = styled('div')`
	padding: 32px;
`

export const MainPage = (): ReactElement => {
	useEffect(() => {
		dirinfoStore.fetchDirInfo()
	}, [])
	
	return (
		<Root>
			<HeaderPage />

			<Datasets />
		</Root>
	)
}

