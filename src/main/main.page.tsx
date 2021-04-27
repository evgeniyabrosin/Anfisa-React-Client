import { ReactElement, useEffect } from 'react'
import styled from 'styled-components'
import { HeaderPage } from './ui/header.page'
import dirinfoStore from '../store/dirinfo'
import { Datasets } from './ui/datasets'
import { SelectedDataset } from './ui/selected-dataset'
import { Box } from '../ui/box'
import { IframeInfo } from './ui/ifame-info'

const Root = styled(Box)`
	padding: 32px;
`

const Container = styled(Box)`
	display: flex;
`

export const MainPage = (): ReactElement => {
	useEffect(() => {
		dirinfoStore.fetchDirInfo()
	}, [])
	
	return (
		<Root>
			<HeaderPage />

			<Container>
				<Datasets />

				<SelectedDataset />

				<IframeInfo />
			</Container>
		</Root>
	)
}

